import {
  IResume,
  IExperienceEntry,
  IExperienceKeyPoint,
  IResumeVariant,
} from './models/resume';

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

function extractKeywords(jobDescription: string): string[] {
  const stopWords = new Set([
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
  ]);

  const text = jobDescription.toLowerCase();

  // Extract multi-word technical terms first
  const multiWordPatterns = [
    /\b(?:ci\s*\/?\s*cd)\b/gi,
    /\b(?:machine\s+learning)\b/gi,
    /\b(?:deep\s+learning)\b/gi,
    /\b(?:data\s+engineering)\b/gi,
    /\b(?:event[- ]driven)\b/gi,
    /\b(?:micro\s*services?)\b/gi,
    /\b(?:full[- ]stack)\b/gi,
    /\b(?:front[- ]end)\b/gi,
    /\b(?:back[- ]end)\b/gi,
    /\b(?:real[- ]time)\b/gi,
    /\b(?:node\.?js)\b/gi,
    /\b(?:next\.?js)\b/gi,
    /\b(?:nest\.?js)\b/gi,
    /\b(?:vue\.?js)\b/gi,
    /\b(?:react\.?js)\b/gi,
    /\b(?:\.net(?:\s+core)?)\b/gi,
    /\b(?:c\s*#)\b/gi,
    /\b(?:apps?\s+script)\b/gi,
    /\b(?:rest(?:ful)?\s+api)/gi,
    /\b(?:api\s+design)\b/gi,
    /\b(?:system\s+design)\b/gi,
    /\b(?:software\s+engineer(?:ing)?)\b/gi,
    /\b(?:engineering\s+manager)\b/gi,
    /\b(?:technical\s+lead)\b/gi,
    /\b(?:tech\s+lead)\b/gi,
    /\b(?:code\s+review)/gi,
    /\b(?:unit\s+test(?:ing|s)?)\b/gi,
    /\b(?:e2e\s+test(?:ing|s)?)\b/gi,
    /\b(?:domain[- ]driven)/gi,
  ];

  const multiWordKeywords: string[] = [];
  for (const pattern of multiWordPatterns) {
    const matches = text.match(pattern);
    if (matches) {
      multiWordKeywords.push(...matches.map(m => m.trim().toLowerCase()));
    }
  }

  // Extract single-word keywords
  const words = text
    .replace(/[^a-z0-9#+./\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !stopWords.has(w));

  // Count frequency
  const freq = new Map<string, number>();
  for (const w of words) {
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }

  // Combine and deduplicate
  const allKeywords = [...new Set([...multiWordKeywords, ...words])];

  // Sort by frequency (multi-word terms get a boost)
  allKeywords.sort((a, b) => {
    const aScore = (freq.get(a) ?? 0) + (a.includes(' ') ? 3 : 0);
    const bScore = (freq.get(b) ?? 0) + (b.includes(' ') ? 3 : 0);
    return bScore - aScore;
  });

  return allKeywords;
}

function scoreText(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw)) {
      score += kw.includes(' ') ? 3 : 1;
    }
  }
  return score;
}

function flattenEntry(entry: IExperienceEntry): IExperienceEntry[] {
  const promoted = (entry.promotedFrom ?? []).flatMap(flattenEntry);
  return [entry, ...promoted];
}

function pickBestSummary(data: IResume, keywords: string[]): string {
  let best = '';
  let bestScore = -1;

  for (const s of data.professionalSummary) {
    const score = scoreText(s.text, keywords);
    if (score > bestScore) {
      bestScore = score;
      best = s.text;
    }
  }

  return best || data.professionalSummary[0]?.text || '';
}

function pickBestTitle(data: IResume, keywords: string[]): string {
  let best = '';
  let bestScore = -1;

  for (const t of data.title) {
    if (t.variant === IResumeVariant.LinkedIn) continue;
    const score = scoreText(t.text, keywords);
    if (score > bestScore) {
      bestScore = score;
      best = t.text;
    }
  }

  return best || data.title[0]?.text || 'Software Engineer';
}

function tailorKeyPoints(
  points: IExperienceKeyPoint[],
  keywords: string[],
): string[] {
  const scored = points.map(p => ({
    text: p.text,
    score: scoreText(p.text, keywords),
  }));

  // Sort by relevance, keep all points but prioritize relevant ones
  scored.sort((a, b) => b.score - a.score);

  return scored.map(s => s.text);
}

function tailorSkills(
  entries: IExperienceEntry[],
  keywords: string[],
): { heading: string; items: string[] }[] {
  const skillMap = new Map<string, Set<string>>();

  function collect(list: IExperienceEntry[]) {
    for (const entry of list) {
      for (const skill of entry.technicalSkills) {
        if (!skillMap.has(skill.heading)) {
          skillMap.set(skill.heading, new Set());
        }
        skill.items.forEach(item => skillMap.get(skill.heading)?.add(item));
      }
      if (entry.promotedFrom) collect(entry.promotedFrom);
    }
  }

  collect(entries);

  const skills = Array.from(skillMap.entries()).map(([heading, items]) => {
    const itemList = Array.from(items);
    // Sort items by keyword relevance
    itemList.sort((a, b) => scoreText(b, keywords) - scoreText(a, keywords));
    return { heading, items: itemList, score: scoreText(heading + ' ' + itemList.join(' '), keywords) };
  });

  // Sort skill categories by relevance
  skills.sort((a, b) => b.score - a.score);

  return skills.map(({ heading, items }) => ({ heading, items }));
}

export function generateTailoredResume(
  data: IResume,
  jobDescription: string,
): ITailoredResume {
  const keywords = extractKeywords(jobDescription);

  const allEntries = data.experience.flatMap(flattenEntry);

  // Score and sort experience by relevance
  const scoredExperience = allEntries.map(entry => {
    const allText = [
      entry.title,
      entry.company,
      ...entry.keyPoints.map(p => p.text),
      ...entry.technicalSkills.flatMap(s => [s.heading, ...s.items]),
    ].join(' ');

    return {
      entry,
      score: scoreText(allText, keywords),
    };
  });

  // Keep chronological order but boost relevance via key point ordering
  const tailoredExperience: ITailoredExperience[] = data.experience.flatMap(entry => {
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
      keyPoints: tailorKeyPoints(role.keyPoints, keywords),
      technologies: Array.from(new Set(role.technicalSkills.flatMap(s => s.items))),
    }));
  });

  return {
    fullName: data.fullName,
    title: pickBestTitle(data, keywords),
    location: data.location,
    publicEmailAddress: data.publicEmailAddress,
    linkedIn: data.linkedIn,
    website: data.website,
    github: data.github,
    summary: pickBestSummary(data, keywords),
    skills: tailorSkills(data.experience, keywords),
    experience: tailoredExperience,
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
