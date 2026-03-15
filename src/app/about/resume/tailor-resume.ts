import {
  IResume,
  IExperienceEntry,
  IExperienceKeyPoint,
  IResumeVariant,
} from './models/resume';

/* ================================================================
   Public types
   ================================================================ */

export interface ITailoredResume {
  fullName: string;
  title: string;
  location: string;
  publicEmailAddress: string;
  linkedIn: string;
  website: string;
  github: string;
  summary: string;
  skills: { heading: string; items: string[] }[];
  experience: ITailoredExperience[];
  education: { school: string; degree: string; startDate: Date; endDate: Date; honors?: string }[];
}

export interface ITailoredExperience {
  company: string;
  title: string;
  contract?: boolean;
  startDate: Date;
  endDate: Date | 'Present';
  location: string;
  keyPoints: string[];
  technologies: string[];
}

/* ================================================================
   JD Analysis — parse a job description into structured signals
   ================================================================ */

type RoleType = 'ic' | 'manager';
type SeniorityLevel = 'junior' | 'mid' | 'senior' | 'staff' | 'principal' | 'director';

const THEMES = [
  'architecture',
  'testing',
  'devops',
  'frontend',
  'backend',
  'leadership',
  'mentoring',
  'data',
  'security',
  'cloud',
  'mobile',
  'performance',
  'api-design',
  'infrastructure',
  'agile',
  'full-stack',
] as const;

type Theme = typeof THEMES[number];

interface JDAnalysis {
  roleType: RoleType;
  seniority: SeniorityLevel;
  technologies: Map<string, number>;
  themes: Map<Theme, number>;
  domains: Set<string>;
  actionVerbs: Set<string>;
  rawKeywords: Set<string>;
}

/* ---------- Technology synonym map ---------- */

// Maps canonical name → set of aliases (all lowercase).
// Matching works bidirectionally: if the JD says "ReactJS" we match "React" in the resume.
const TECH_ALIASES: Record<string, string[]> = {
  'react': ['reactjs', 'react.js'],
  'angular': ['angularjs', 'angular.js'],
  'node.js': ['nodejs', 'node'],
  'next.js': ['nextjs', 'next'],
  'nest.js': ['nestjs', 'nest'],
  'vue.js': ['vuejs', 'vue'],
  'typescript': ['ts'],
  'javascript': ['js', 'ecmascript', 'es6', 'es2015'],
  'c#': ['csharp', 'c-sharp'],
  '.net': ['dotnet', '.net core', '.net framework', 'asp.net', 'asp.net mvc'],
  'python': ['py'],
  'docker': ['containerization', 'containers'],
  'kubernetes': ['k8s'],
  'terraform': ['iac', 'infrastructure as code'],
  'aws': ['amazon web services'],
  'azure': ['microsoft azure'],
  'gcp': ['google cloud', 'google cloud platform'],
  'ci/cd': ['cicd', 'ci cd', 'continuous integration', 'continuous deployment', 'continuous delivery'],
  'rest': ['restful', 'rest api', 'rest apis', 'restful api', 'restful apis'],
  'graphql': ['graph ql'],
  'sql': ['sql server', 'mysql', 'postgresql', 'postgres', 'mssql', 'tsql', 't-sql'],
  'nosql': ['mongodb', 'dynamodb', 'cassandra', 'couchdb', 'redis'],
  'mongodb': ['mongo'],
  'kafka': ['apache kafka'],
  'rabbitmq': ['rabbit mq', 'amqp'],
  'microservices': ['micro services', 'micro-services'],
  'agile': ['scrum', 'kanban', 'sprint'],
  'jira': ['atlassian jira'],
  'git': ['github', 'gitlab', 'bitbucket'],
  'sass': ['scss'],
  'tailwind': ['tailwind css', 'tailwindcss'],
  'entity framework': ['ef', 'ef core'],
  'signalr': ['signal r'],
  'express': ['express.js', 'expressjs'],
  'jquery': ['j query'],
  'html': ['html5'],
  'css': ['css3'],
};

// Build reverse lookup: alias → canonical
const ALIAS_TO_CANONICAL = new Map<string, string>();
for (const [canonical, aliases] of Object.entries(TECH_ALIASES)) {
  ALIAS_TO_CANONICAL.set(canonical.toLowerCase(), canonical.toLowerCase());
  for (const alias of aliases) {
    ALIAS_TO_CANONICAL.set(alias.toLowerCase(), canonical.toLowerCase());
  }
}

function canonicalizeTech(term: string): string {
  return ALIAS_TO_CANONICAL.get(term.toLowerCase()) ?? term.toLowerCase();
}

/* ---------- Theme detection patterns ---------- */

const THEME_PATTERNS: Record<Theme, RegExp[]> = {
  architecture: [
    /\b(?:architect(?:ure|ing)?|system\s+design|design\s+pattern|scalab|distributed\s+system|domain[- ]driven|ddd|micro\s*service)/i,
  ],
  testing: [
    /\b(?:test(?:ing|s|ability)?|tdd|bdd|coverage|qa|quality\s+assurance|e2e|end[- ]to[- ]end|integration\s+test|unit\s+test|regression|nightwatch|cypress|jest|selenium|playwright|artillery)/i,
  ],
  devops: [
    /\b(?:devops|ci\s*\/?\s*cd|pipeline|deploy(?:ment)?|docker|container|kubernetes|k8s|terraform|helm|argo|jenkins|github\s+actions?|gitlab\s+ci|infrastructure)/i,
  ],
  frontend: [
    /\b(?:front[- ]?end|ui|ux|user\s+interface|react|angular|vue|svelte|css|sass|tailwind|responsive|accessibility|a11y|component|design\s+system)/i,
  ],
  backend: [
    /\b(?:back[- ]?end|server[- ]side|api|endpoint|database|schema|sql|nosql|orm|entity\s+framework|express|nest\.?js|node\.?js|microservice|rest(?:ful)?|graphql|grpc)/i,
  ],
  leadership: [
    /\b(?:lead(?:ership|ing)?|manage(?:r|ment|d)?|direct\s+report|team\s+build|head\s+of|director|vp|principal|staff|senior|cross[- ]functional|stakeholder)/i,
  ],
  mentoring: [
    /\b(?:mentor(?:ing|ship)?|coach(?:ing)?|develop(?:ing)?\s+engineer|career\s+(?:growth|development)|1[- ]on[- ]1|one[- ]on[- ]one|brown\s+bag|knowledge\s+shar)/i,
  ],
  data: [
    /\b(?:data(?:base|\s+model|\s+engineer|\s+pipeline|\s+warehouse)?|etl|analytics|big\s+data|spark|hadoop|databricks|data\s+lake|schema\s+design)/i,
  ],
  security: [
    /\b(?:secur(?:ity|e)|cyber|soar|siem|soc|phishing|threat|vulnerability|penetration|incident\s+response|compliance|infosec|cybersecurity)/i,
  ],
  cloud: [
    /\b(?:cloud|aws|azure|gcp|google\s+cloud|amazon|saas|iaas|paas|serverless|lambda|ec2|s3|cloudformation|cdn)/i,
  ],
  mobile: [
    /\b(?:mobile|ios|android|react\s+native|flutter|swift|kotlin|responsive\s+design)/i,
  ],
  performance: [
    /\b(?:performance|optim(?:iz|is)|latency|throughput|cach(?:e|ing)|load\s+test|benchmark|profil(?:e|ing)|scalab)/i,
  ],
  'api-design': [
    /\b(?:api\s+design|api\s+gateway|swagger|openapi|rest\s+design|graphql\s+schema|web\s+service|webhook|endpoint\s+design)/i,
  ],
  infrastructure: [
    /\b(?:infrastructure|sre|site\s+reliability|monitoring|observability|logging|alerting|grafana|prometheus|datadog|splunk|new\s+relic)/i,
  ],
  agile: [
    /\b(?:agile|scrum|kanban|sprint|standup|retrospective|backlog|grooming|refinement|velocity|story\s+point|jira|dora\s+metric)/i,
  ],
  'full-stack': [
    /\b(?:full[- ]?stack|end[- ]to[- ]end|front.*back|across\s+the\s+stack)/i,
  ],
};

/* ---------- Role/seniority detection ---------- */

const MANAGER_SIGNALS = [
  /\b(?:engineering\s+)?manager\b/i,
  /\bmanagement\b/i,
  /\bdirect\s+report/i,
  /\bpeople\s+lead/i,
  /\bteam\s+lead(?:er)?/i,
  /\bhead\s+of\s+engineering/i,
  /\bdirector\s+of\s+engineering/i,
  /\bvp\s+of\s+engineering/i,
];

const SENIORITY_SIGNALS: { level: SeniorityLevel; patterns: RegExp[] }[] = [
  { level: 'director', patterns: [/\bdirector\b/i, /\bvp\b/i, /\bvice\s+president/i, /\bhead\s+of/i] },
  { level: 'principal', patterns: [/\bprincipal\b/i, /\bstaff\+/i, /\bdistinguished/i] },
  { level: 'staff', patterns: [/\bstaff\b/i] },
  { level: 'senior', patterns: [/\bsenior\b/i, /\bsr\.?\b/i, /\blead\b/i] },
  { level: 'mid', patterns: [/\bmid[- ]?level\b/i, /\bintermediate\b/i, /\b(?:ii|iii)\b/i] },
  { level: 'junior', patterns: [/\bjunior\b/i, /\bjr\.?\b/i, /\bentry[- ]level\b/i, /\bassociate\b/i] },
];

/* ---------- Domain detection ---------- */

const DOMAIN_PATTERNS: Record<string, RegExp> = {
  cybersecurity: /\b(?:cyber|security|soar|siem|soc|phishing|threat|incident|infosec|vulnerability|malware)/i,
  healthcare: /\b(?:health(?:care)?|medical|clinical|ehr|emr|hipaa|dicom|hl7|fhir|patient|pharma)/i,
  government: /\b(?:government|federal|dod|dha|usda|military|clearance|fedramp|fisma|public\s+sector)/i,
  fintech: /\b(?:fintech|financial|banking|payment|trading|blockchain|crypto|insurance)/i,
  ecommerce: /\b(?:e[- ]?commerce|retail|shopping|marketplace|inventory|fulfillment)/i,
  saas: /\b(?:saas|platform|multi[- ]?tenant|subscription|b2b|enterprise\s+software)/i,
  'patent-law': /\b(?:patent|intellectual\s+property|ip\s+law|litigation|legal\s+tech)/i,
};

/* ---------- Action verb extraction ---------- */

const RESUME_ACTION_VERBS = new Set([
  'architected', 'built', 'created', 'designed', 'developed', 'delivered',
  'drove', 'engineered', 'established', 'implemented', 'introduced', 'launched',
  'led', 'managed', 'mentored', 'modernized', 'optimized', 'owned',
  'pioneered', 'reduced', 'rewrote', 'scaled', 'shipped', 'spearheaded',
  'standardized', 'stood', 'streamlined', 'transformed', 'unified',
]);

/* ---------- Comprehensive keyword extraction ---------- */

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'need', 'must',
  'that', 'this', 'these', 'those', 'it', 'its', 'we', 'our', 'you',
  'your', 'they', 'their', 'he', 'she', 'him', 'her', 'who', 'which',
  'what', 'when', 'where', 'how', 'why', 'as', 'if', 'not', 'no', 'so',
  'up', 'out', 'about', 'into', 'over', 'after', 'before', 'between',
  'under', 'above', 'such', 'each', 'every', 'all', 'any', 'both',
  'few', 'more', 'most', 'other', 'some', 'than', 'too', 'very', 'just',
  'also', 'well', 'back', 'even', 'still', 'new', 'now', 'way', 'able',
  'work', 'working', 'role', 'position', 'team', 'teams', 'strong',
  'experience', 'years', 'including', 'etc', 'using', 'used', 'use',
  'like', 'make', 'know', 'take', 'come', 'get', 'go', 'see', 'look',
  'ideal', 'candidate', 'required', 'preferred', 'qualifications',
  'responsibilities', 'requirements', 'description', 'job', 'apply',
  'company', 'organization', 'opportunity', 'join', 'looking',
]);

function analyzeJobDescription(jd: string): JDAnalysis {
  const lower = jd.toLowerCase();

  // Detect role type
  const managerScore = MANAGER_SIGNALS.reduce((s, p) => s + (p.test(jd) ? 1 : 0), 0);
  const icSignals = [/\bengineer\b/i, /\bdeveloper\b/i, /\bprogrammer\b/i, /\barchitect\b/i, /\bcontribut/i];
  const icScore = icSignals.reduce((s, p) => s + (p.test(jd) ? 1 : 0), 0);
  const roleType: RoleType = managerScore > icScore ? 'manager' : 'ic';

  // Detect seniority
  let seniority: SeniorityLevel = 'senior'; // default
  for (const { level, patterns } of SENIORITY_SIGNALS) {
    if (patterns.some(p => p.test(jd))) {
      seniority = level;
      break;
    }
  }

  // Extract technologies with frequency
  const technologies = new Map<string, number>();
  // Known tech terms to scan for (includes all aliases)
  const allTechTerms = new Set<string>();
  for (const [canonical, aliases] of Object.entries(TECH_ALIASES)) {
    allTechTerms.add(canonical);
    for (const a of aliases) allTechTerms.add(a);
  }
  // Also add standalone tech terms
  const standaloneTech = [
    'python', 'java', 'go', 'golang', 'rust', 'ruby', 'php', 'scala', 'swift',
    'kotlin', 'dart', 'elixir', 'clojure', 'haskell', 'perl', 'lua', 'r',
    'redis', 'elasticsearch', 'kafka', 'rabbitmq', 'nginx', 'apache',
    'webpack', 'vite', 'esbuild', 'rollup', 'babel', 'gulp', 'grunt',
    'jest', 'mocha', 'chai', 'cypress', 'playwright', 'selenium',
    'storybook', 'figma', 'sketch',
    'linux', 'unix', 'bash', 'powershell',
    'oauth', 'jwt', 'saml', 'openid',
    'grpc', 'protobuf', 'thrift',
    'prometheus', 'grafana', 'datadog', 'splunk',
    'databricks', 'snowflake', 'spark', 'airflow',
  ];
  for (const t of standaloneTech) allTechTerms.add(t);

  for (const term of allTechTerms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const matches = lower.match(regex);
    if (matches) {
      const canonical = canonicalizeTech(term);
      technologies.set(canonical, (technologies.get(canonical) ?? 0) + matches.length);
    }
  }

  // Detect themes
  const themes = new Map<Theme, number>();
  for (const theme of THEMES) {
    const patterns = THEME_PATTERNS[theme];
    let count = 0;
    for (const p of patterns) {
      const matches = jd.match(new RegExp(p.source, 'gi'));
      if (matches) count += matches.length;
    }
    if (count > 0) themes.set(theme, count);
  }

  // Detect domains
  const domains = new Set<string>();
  for (const [domain, pattern] of Object.entries(DOMAIN_PATTERNS)) {
    if (pattern.test(jd)) domains.add(domain);
  }

  // Extract action verbs from JD
  const actionVerbs = new Set<string>();
  const words = lower.split(/\s+/);
  for (const w of words) {
    const clean = w.replace(/[^a-z]/g, '');
    if (RESUME_ACTION_VERBS.has(clean)) actionVerbs.add(clean);
  }

  // Extract raw keywords (non-stop-word terms with frequency > 1 or technical significance)
  const rawKeywords = new Set<string>();
  const wordFreq = new Map<string, number>();
  const cleanWords = lower.replace(/[^a-z0-9#+./\s-]/g, ' ').split(/\s+/).filter(w => w.length > 2);
  for (const w of cleanWords) {
    if (!STOP_WORDS.has(w)) {
      wordFreq.set(w, (wordFreq.get(w) ?? 0) + 1);
    }
  }
  for (const [word, freq] of wordFreq) {
    if (freq >= 2 || technologies.has(canonicalizeTech(word))) {
      rawKeywords.add(word);
    }
  }

  return { roleType, seniority, technologies, themes, domains, actionVerbs, rawKeywords };
}

/* ================================================================
   Variant Selection — pick the best resume variant for this JD
   ================================================================ */

function selectVariant(analysis: JDAnalysis): IResumeVariant {
  if (analysis.roleType === 'manager') {
    return IResumeVariant.SeniorManager;
  }

  switch (analysis.seniority) {
    case 'principal':
    case 'director':
      return IResumeVariant.PrincipalIC;
    case 'staff':
      return IResumeVariant.StaffIC;
    case 'senior':
    case 'mid':
    case 'junior':
    default:
      return IResumeVariant.SeniorIC;
  }
}

/* ================================================================
   Summary Recomposition — build a new summary from best sentences
   across all variants, scored against the JD
   ================================================================ */

function scoreSentence(sentence: string, analysis: JDAnalysis): number {
  const lower = sentence.toLowerCase();
  let score = 0;

  // Technology matches (high value)
  for (const [tech, freq] of analysis.technologies) {
    const aliases = TECH_ALIASES[tech] ?? [];
    const allForms = [tech, ...aliases];
    for (const form of allForms) {
      if (lower.includes(form)) {
        score += 5 * freq;
        break;
      }
    }
  }

  // Theme matches
  for (const [theme, weight] of analysis.themes) {
    const patterns = THEME_PATTERNS[theme];
    for (const p of patterns) {
      if (p.test(sentence)) {
        score += 3 * weight;
        break;
      }
    }
  }

  // Domain matches
  for (const domain of analysis.domains) {
    const pattern = DOMAIN_PATTERNS[domain];
    if (pattern && pattern.test(sentence)) {
      score += 4;
    }
  }

  // Raw keyword matches
  for (const kw of analysis.rawKeywords) {
    if (lower.includes(kw)) score += 1;
  }

  // Penalize very short sentences
  if (sentence.split(/\s+/).length < 5) score -= 2;

  return score;
}

function recomposeSummary(data: IResume, analysis: JDAnalysis, selectedVariant: IResumeVariant): string {
  // Split all summaries (excluding LinkedIn which is multi-paragraph/conversational) into sentences
  const sentencePool: { text: string; score: number; variant: IResumeVariant }[] = [];

  for (const summary of data.professionalSummary) {
    if (summary.variant === IResumeVariant.LinkedIn) continue;

    // Split on sentence boundaries — period followed by space+capital or end
    const sentences = summary.text
      .split(/(?<=\.)\s+(?=[A-Z])/)
      .map(s => s.trim())
      .filter(s => s.length > 10);

    for (const sentence of sentences) {
      sentencePool.push({
        text: sentence,
        score: scoreSentence(sentence, analysis),
        variant: summary.variant,
      });
    }
  }

  // Boost sentences from the selected variant
  for (const s of sentencePool) {
    if (s.variant === selectedVariant) s.score += 3;
  }

  // Sort by score descending
  sentencePool.sort((a, b) => b.score - a.score);

  // Deduplicate semantically similar sentences:
  // Two sentences are "similar" if they share >60% of significant words.
  const selected: typeof sentencePool = [];
  const usedSignatures = new Set<string>();

  for (const candidate of sentencePool) {
    const sig = extractSignature(candidate.text);
    let isDuplicate = false;

    for (const existing of usedSignatures) {
      if (signatureOverlap(sig, existing) > 0.6) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      selected.push(candidate);
      usedSignatures.add(sig);
    }

    // Target 3-5 sentences for a tight summary
    if (selected.length >= 5) break;
  }

  // Ensure we have a strong opening: the first sentence should contain the title/role + years
  const openingIdx = selected.findIndex(s =>
    /\d+\+?\s+years?/i.test(s.text) && /engineer|architect|manager|leader/i.test(s.text),
  );
  if (openingIdx > 0) {
    const [opening] = selected.splice(openingIdx, 1);
    selected.unshift(opening);
  }

  return selected.map(s => s.text).join(' ');
}

function extractSignature(sentence: string): string {
  return sentence
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !STOP_WORDS.has(w))
    .sort()
    .join(' ');
}

function signatureOverlap(a: string, b: string): number {
  const wordsA = new Set(a.split(' '));
  const wordsB = new Set(b.split(' '));
  if (wordsA.size === 0 && wordsB.size === 0) return 1;
  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }
  return intersection / Math.min(wordsA.size, wordsB.size);
}

/* ================================================================
   Title Selection
   ================================================================ */

function selectTitle(data: IResume, analysis: JDAnalysis, variant: IResumeVariant): string {
  // First try exact variant match
  const variantTitle = data.title.find(t => t.variant === variant);
  if (variantTitle) return variantTitle.text;

  // Fallback: score all non-LinkedIn titles
  let best = data.title[0]?.text ?? 'Software Engineer';
  let bestScore = -1;
  for (const t of data.title) {
    if (t.variant === IResumeVariant.LinkedIn) continue;
    const score = scoreSentence(t.text, analysis);
    if (score > bestScore) {
      bestScore = score;
      best = t.text;
    }
  }
  return best;
}

/* ================================================================
   Experience Tailoring — filter, eliminate, contextualize
   ================================================================ */

function scoreKeyPoint(point: IExperienceKeyPoint, analysis: JDAnalysis): number {
  return scoreSentence(point.text, analysis);
}

function isKeyPointRelevantToVariant(point: IExperienceKeyPoint, variant: IResumeVariant): boolean {
  // Universal points are always relevant
  if (point.variants.includes(IResumeVariant.Universal)) return true;
  // Check if the point matches the selected variant
  if (point.variants.includes(variant)) return true;
  // For IC variants, accept points tagged with any IC variant
  const icVariants = [IResumeVariant.SeniorIC, IResumeVariant.StaffIC, IResumeVariant.PrincipalIC];
  if (icVariants.includes(variant) && point.variants.some(v => icVariants.includes(v))) return true;
  return false;
}

function scoreExperienceEntry(entry: IExperienceEntry, analysis: JDAnalysis): number {
  const allText = [
    entry.title,
    entry.company,
    ...entry.keyPoints.map(p => p.text),
    ...entry.technicalSkills.flatMap(s => [s.heading, ...s.items]),
  ].join(' ');
  return scoreSentence(allText, analysis);
}

function contextualizeKeyPoint(text: string, analysis: JDAnalysis): string {
  let result = text;

  // Synonym swap: replace resume terms with JD-preferred terms where applicable
  const swaps: [RegExp, string, () => boolean][] = [
    [/\bCI\/CD\b/g, 'CI/CD', () => analysis.technologies.has('ci/cd')],
    [/\bK8s\b/gi, 'Kubernetes', () => analysis.technologies.has('kubernetes') && !/kubernetes/i.test(text)],
    [/\bKubernetes\b/g, 'K8s', () => !analysis.technologies.has('kubernetes') && analysis.rawKeywords.has('k8s')],
    [/\bJS\b/g, 'JavaScript', () => analysis.technologies.has('javascript') && !/javascript/i.test(text)],
    [/\bTS\b/g, 'TypeScript', () => analysis.technologies.has('typescript') && !/typescript/i.test(text)],
  ];

  for (const [pattern, replacement, shouldSwap] of swaps) {
    if (shouldSwap()) {
      result = result.replace(pattern, replacement);
    }
  }

  return result;
}

/** Determine which technologies from an entry's skills actually matter for this JD */
function filterTechnologies(entry: IExperienceEntry, analysis: JDAnalysis): string[] {
  const allTech = new Set(entry.technicalSkills.flatMap(s => s.items));
  const relevant: string[] = [];
  const supplementary: string[] = [];

  for (const tech of allTech) {
    const canonical = canonicalizeTech(tech);
    if (analysis.technologies.has(canonical)) {
      relevant.push(tech);
    } else {
      // Check if any alias matches
      const aliases = TECH_ALIASES[canonical] ?? [];
      const allForms = [canonical, ...aliases];
      const found = allForms.some(f => analysis.technologies.has(f) || analysis.rawKeywords.has(f));
      if (found) {
        relevant.push(tech);
      } else {
        supplementary.push(tech);
      }
    }
  }

  // Always show JD-relevant technologies; add supplementary only if the list is short
  if (relevant.length === 0) {
    // No direct matches — keep top technologies that are at least broadly relevant
    return supplementary.slice(0, 5);
  }

  // Add a few supplementary to fill out the picture, but cap total
  const maxTotal = 10;
  const additionalSlots = Math.max(0, maxTotal - relevant.length);
  return [...relevant, ...supplementary.slice(0, additionalSlots)];
}

function flattenEntry(entry: IExperienceEntry): IExperienceEntry[] {
  const promoted = (entry.promotedFrom ?? []).flatMap(flattenEntry);
  return [entry, ...promoted];
}

interface ScoredRole {
  entry: IExperienceEntry;
  score: number;
  keyPoints: { text: string; score: number }[];
}

function tailorExperience(
  data: IResume,
  analysis: JDAnalysis,
  variant: IResumeVariant,
): ITailoredExperience[] {
  const result: ITailoredExperience[] = [];

  // Age penalty: roles older than 8 years get a penalty on their score
  const now = Date.now();
  const eightYearsMs = 8 * 365.25 * 24 * 60 * 60 * 1000;

  for (const topEntry of data.experience) {
    const roles = flattenEntry(topEntry).sort((a, b) => {
      const aEnd = a.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : a.endDate.getTime();
      const bEnd = b.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : b.endDate.getTime();
      if (aEnd !== bEnd) return bEnd - aEnd;
      return b.startDate.getTime() - a.startDate.getTime();
    });

    for (const role of roles) {
      const roleScore = scoreExperienceEntry(role, analysis);
      const endTime = role.endDate === 'Present' ? now : role.endDate.getTime();
      const age = now - endTime;
      const agePenalty = age > eightYearsMs ? Math.floor((age - eightYearsMs) / (365.25 * 24 * 60 * 60 * 1000)) * 2 : 0;
      const adjustedScore = roleScore - agePenalty;

      // Filter key points: only variant-relevant, then score and cut
      const variantPoints = role.keyPoints.filter(p => isKeyPointRelevantToVariant(p, variant));
      const scoredPoints = variantPoints
        .map(p => ({ text: p.text, score: scoreKeyPoint(p, analysis) }))
        .sort((a, b) => b.score - a.score);

      // Eliminate low-scoring points: keep points with score > 0, minimum 2, maximum 5
      const minPoints = 2;
      const maxPoints = 5;
      let keptPoints = scoredPoints.filter(p => p.score > 0);
      if (keptPoints.length < minPoints) {
        // Keep top N even if low-scoring
        keptPoints = scoredPoints.slice(0, minPoints);
      }
      if (keptPoints.length > maxPoints) {
        keptPoints = keptPoints.slice(0, maxPoints);
      }

      // If the role itself scored very low AND it's old, consider dropping it entirely
      if (adjustedScore <= 0 && keptPoints.every(p => p.score === 0) && age > eightYearsMs) {
        continue; // Drop this role — it's old and irrelevant
      }

      // Contextualize each kept key point
      const contextualizedPoints = keptPoints.map(p => contextualizeKeyPoint(p.text, analysis));

      // Filter technologies to JD-relevant
      const technologies = filterTechnologies(role, analysis);

      result.push({
        company: role.company,
        title: role.title,
        contract: role.contract,
        startDate: role.startDate,
        endDate: role.endDate,
        location: role.location,
        keyPoints: contextualizedPoints,
        technologies,
      });
    }
  }

  return result;
}

/* ================================================================
   Skills Tailoring — filter to JD-relevant, reorder
   ================================================================ */

function tailorSkills(
  data: IResume,
  analysis: JDAnalysis,
): { heading: string; items: string[] }[] {
  // Collect all skills
  const skillMap = new Map<string, Set<string>>();
  function collect(entries: IExperienceEntry[]) {
    for (const entry of entries) {
      for (const skill of entry.technicalSkills) {
        if (!skillMap.has(skill.heading)) skillMap.set(skill.heading, new Set());
        skill.items.forEach(item => skillMap.get(skill.heading)?.add(item));
      }
      if (entry.promotedFrom) collect(entry.promotedFrom);
    }
  }
  collect(data.experience);

  const result: { heading: string; items: string[]; score: number }[] = [];

  for (const [heading, itemSet] of skillMap) {
    const items = Array.from(itemSet);

    // Score each individual skill item against JD
    const scoredItems = items.map(item => {
      const canonical = canonicalizeTech(item);
      let score = 0;
      if (analysis.technologies.has(canonical)) {
        score = analysis.technologies.get(canonical)! * 3;
      } else {
        // Check aliases
        const aliases = TECH_ALIASES[canonical] ?? [];
        for (const alias of [canonical, ...aliases]) {
          if (analysis.technologies.has(alias) || analysis.rawKeywords.has(alias)) {
            score = 2;
            break;
          }
        }
      }
      return { item, score };
    });

    // Keep only items with score > 0 (JD-relevant), but if none match, keep a few top ones
    const relevant = scoredItems.filter(s => s.score > 0);
    let keptItems: string[];

    if (relevant.length > 0) {
      // Sort by score, keep all relevant
      relevant.sort((a, b) => b.score - a.score);
      keptItems = relevant.map(s => s.item);
    } else {
      // No direct matches — drop this entire category
      continue;
    }

    const categoryScore = relevant.reduce((sum, s) => sum + s.score, 0);
    result.push({ heading, items: keptItems, score: categoryScore });
  }

  // Sort categories by relevance
  result.sort((a, b) => b.score - a.score);

  return result.map(({ heading, items }) => ({ heading, items }));
}

/* ================================================================
   Main API
   ================================================================ */

export function generateTailoredResume(
  data: IResume,
  jobDescription: string,
): ITailoredResume {
  const analysis = analyzeJobDescription(jobDescription);
  const variant = selectVariant(analysis);

  return {
    fullName: data.fullName,
    title: selectTitle(data, analysis, variant),
    location: data.location,
    publicEmailAddress: data.publicEmailAddress,
    linkedIn: data.linkedIn,
    website: data.website,
    github: data.github,
    summary: recomposeSummary(data, analysis, variant),
    skills: tailorSkills(data, analysis),
    experience: tailorExperience(data, analysis, variant),
    education: data.education.map(e => ({
      school: e.school,
      degree: e.degree,
      startDate: e.startDate,
      endDate: e.endDate,
      honors: e.honors,
    })),
  };
}

export function buildOriginalResume(data: IResume): ITailoredResume {
  const linkedInSummary =
    data.professionalSummary.find(s => s.variant === IResumeVariant.LinkedIn)?.text ?? '';
  const linkedInTitle =
    data.title.find(t => t.variant === IResumeVariant.LinkedIn)?.text ?? 'Software Engineer';

  const skillMap = new Map<string, Set<string>>();
  function collectSkills(entries: IExperienceEntry[]) {
    for (const entry of entries) {
      for (const skill of entry.technicalSkills) {
        if (!skillMap.has(skill.heading)) skillMap.set(skill.heading, new Set());
        skill.items.forEach(item => skillMap.get(skill.heading)?.add(item));
      }
      if (entry.promotedFrom) collectSkills(entry.promotedFrom);
    }
  }
  collectSkills(data.experience);

  const experience: ITailoredExperience[] = data.experience.flatMap(entry => {
    const roles = flattenEntry(entry).sort((a, b) => {
      const aEnd = a.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : a.endDate.getTime();
      const bEnd = b.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : b.endDate.getTime();
      if (aEnd !== bEnd) return bEnd - aEnd;
      return b.startDate.getTime() - a.startDate.getTime();
    });
    return roles.map(role => ({
      company: role.company,
      title: role.title,
      contract: role.contract,
      startDate: role.startDate,
      endDate: role.endDate,
      location: role.location,
      keyPoints: role.keyPoints.map(p => p.text),
      technologies: Array.from(new Set(role.technicalSkills.flatMap(s => s.items))),
    }));
  });

  return {
    fullName: data.fullName,
    title: linkedInTitle,
    location: data.location,
    publicEmailAddress: data.publicEmailAddress,
    linkedIn: data.linkedIn,
    website: data.website,
    github: data.github,
    summary: linkedInSummary,
    skills: Array.from(skillMap.entries())
      .map(([heading, items]) => ({ heading, items: Array.from(items).sort((a, b) => a.localeCompare(b)) }))
      .sort((a, b) => a.heading.localeCompare(b.heading)),
    experience,
    education: data.education.map(e => ({
      school: e.school,
      degree: e.degree,
      startDate: e.startDate,
      endDate: e.endDate,
      honors: e.honors,
    })),
  };
}
