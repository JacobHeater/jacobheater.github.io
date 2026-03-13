'use client';

import { Suspense, useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HtmlTitle } from '@/app/components/html-title';
import { resume } from './data/resume/resume';
import { IExperienceEntry, IExperienceKeyPoint, IResumeVariant } from './models/resume';
import { Public, Email, LinkedIn, GitHub } from '@mui/icons-material';
import { Button } from '@/app/components/button';
import { Tooltip } from 'react-tooltip';
import day from 'dayjs';
import LinksAboutMe from './components/links/links-about-me';

const DEFAULT_VARIANT = IResumeVariant.PrincipalIC;

const VARIANT_KEYS: Record<string, IResumeVariant> = {
  senior: IResumeVariant.SeniorIC,
  staff: IResumeVariant.StaffIC,
  principal: IResumeVariant.PrincipalIC,
  manager: IResumeVariant.SeniorManager,
  linkedin: IResumeVariant.LinkedIn,
};

function parseVariant(param: string | null): IResumeVariant {
  if (!param) return DEFAULT_VARIANT;
  return VARIANT_KEYS[param.toLowerCase()] ?? DEFAULT_VARIANT;
}

function resolveTitle(variant: IResumeVariant): string {
  return resume.title.find(t => t.variant === variant)!.text;
}

function resolveSummary(variant: IResumeVariant): string {
  return resume.professionalSummary.find(s => s.variant === variant)!.text;
}

function filterKeyPoints(points: IExperienceKeyPoint[], variant: IResumeVariant): IExperienceKeyPoint[] {
  if (variant === IResumeVariant.LinkedIn) return points;
  return points.filter(
    p => p.variants.includes(variant) || p.variants.includes(IResumeVariant.Universal)
  );
}

function aggregateSkills(): { heading: string; items: string[] }[] {
  const skillMap = new Map<string, Set<string>>();
  function collect(entries: IExperienceEntry[]) {
    for (const entry of entries) {
      for (const skill of entry.technicalSkills) {
        if (!skillMap.has(skill.heading)) skillMap.set(skill.heading, new Set());
        skill.items.forEach(item => skillMap.get(skill.heading)!.add(item));
      }
      if (entry.promotedFrom) collect(entry.promotedFrom);
    }
  }
  collect(resume.experience);
  return Array.from(skillMap.entries()).map(([heading, items]) => ({
    heading,
    items: Array.from(items),
  }));
}

const allSkills = aggregateSkills();

function formatLinkedInSummaryText(text: string) {
  return text.split('\\n\\n').map(p => p.trim()).join('\n\n');
}

function formatLinkedInExperienceText(entry: IExperienceEntry, variant: IResumeVariant) {
  const points = filterKeyPoints(entry.keyPoints ?? [], variant);
  // Return key point texts with bullets, one per line — preserves list formatting on paste
  return points.map(p => `• ${p.text.trim()}`).join('\n');
}

// JSON-LD structured data for SEO (uses default variant for crawlers)
const defaultTitle = resolveTitle(DEFAULT_VARIANT);
const defaultSummary = resolveSummary(DEFAULT_VARIANT);
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: resume.fullName,
  jobTitle: defaultTitle,
  description: defaultSummary,
  url: resume.website,
  sameAs: [resume.linkedIn, resume.github, resume.website],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Washington DC Metro Area',
    addressCountry: 'US',
  },
  knowsAbout: [
    // Languages & Frameworks
    'C#',
    '.NET Core',
    '.NET Framework',
    'Node.js',
    'Python',
    'JavaScript',
    'TypeScript',
    'SQL',
    'NoSQL',
    // Frontend
    'React',
    'Angular',
    'jQuery',
    // Backend & API
    'Express',
    'Nest.js',
    'REST',
    'SOAP',
    'WCF',
    'SignalR',
    'Socket.io',
    'Kafka',
    'RabbitMQ',
    'pub/sub',
    // Architecture
    'Software Architecture',
    'Microservices',
    'Event-Driven Architecture',
    'Domain-Driven Design',
    'Data Modeling',
    'API Design',
    'System Design',
    // DevOps
    'Docker',
    'Kubernetes',
    'Terraform',
    'CI/CD',
    'AWS',
    'Azure',
    // Tools & Methodologies
    'Jira',
    'Agile',
    'Scrum',
    'Git',
    // Domain
    'Cybersecurity',
  ],
};

export default function ResumePage() {
  return (
    <Suspense>
      <ResumePageContent />
    </Suspense>
  );
}

function ResumePageContent() {
  const searchParams = useSearchParams();
  const variant = parseVariant(searchParams.get('variant'));
  const variantTitle = useMemo(() => resolveTitle(variant), [variant]);
  const variantSummary = useMemo(() => resolveSummary(variant), [variant]);
  const [exporting, setExporting] = useState(false);

  const exportToPdf = useCallback(async () => {
    setExporting(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: ResumePdfDocument } = await import(
        './components/resume-pdf-document'
      );
      const blob = await pdf(<ResumePdfDocument data={resume} variant={variant} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.fullName.replace(/\s+/g, '_')}_${variantTitle.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [variant, variantTitle]);

  const [summaryCopied, setSummaryCopied] = useState(false);

  const copySummaryForLinkedIn = useCallback(async () => {
    if (variant !== IResumeVariant.LinkedIn) return;
    try {
      const payload = formatLinkedInSummaryText(variantSummary);
      await navigator.clipboard.writeText(payload);
      setSummaryCopied(true);
      setTimeout(() => setSummaryCopied(false), 1500);
    } catch (e) {
      // ignore clipboard errors
    }
  }, [variant, variantSummary]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article
        className="min-h-screen pt-4 max-w-4xl mx-auto"
        itemScope
        itemType="https://schema.org/Person">
        <HtmlTitle title={`Jacob Heater | ${variantTitle} - Resume`} />
        <meta
          name="description"
          content="Principal Software Engineer with 12+ years experience in TypeScript, React, Node.js, C#/.NET, Python, Nest.js, Kafka, RabbitMQ, AWS, Azure, and Kubernetes. Expert in system design, microservices, event-driven architecture, cybersecurity platforms, and full-stack development."
        />

        {/* Header Section */}
        <header className="mb-6 print:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 pb-4">
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--primary)]"
                itemProp="name">
                {resume.fullName}
              </h1>
              <p className="text-lg font-medium text-[var(--job)] mt-1">
                {variantTitle}
              </p>
              <p
                className="text-sm mt-1 text-[var(--gray-700)]"
                itemProp="address">
                {resume.location}
              </p>
            </div>
            <nav
              className="flex flex-col gap-1.5"
              aria-label="Contact information">
              <ContactLink
                href={`mailto:${resume.publicEmailAddress}`}
                label={resume.publicEmailAddress}
                icon={<Email className="text-base" />}
                className="print:hidden"
              />
              <ContactLink
                href={`mailto:${resume.privateEmailAddress}`}
                label={resume.privateEmailAddress}
                icon={<Email className="text-base" />}
                className="hidden print:flex"
              />
              <ContactLink
                href={resume.linkedIn}
                label="linkedin.com/in/jacobheater"
                icon={<LinkedIn className="text-base" />}
              />
              <ContactLink
                href={resume.website}
                label="jacobheater.com"
                icon={<Public className="text-base" />}
              />
              <ContactLink
                href={resume.github}
                label="github.com/jacobheater"
                icon={<GitHub className="text-base" />}
              />
            </nav>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6 print:mb-4" aria-labelledby="summary-heading">
          <SectionHeading id="summary-heading">Professional Summary</SectionHeading>
          {variant === IResumeVariant.LinkedIn && (
            <div className="no-print flex justify-end -mt-2 mb-2">
              <button
                className="text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors cursor-pointer"
                onClick={copySummaryForLinkedIn}>
                {summaryCopied ? '\u2713 Copied' : 'Copy for LinkedIn'}
              </button>
            </div>
          )}
          <div
            className="text-sm leading-relaxed text-[var(--gray-800)]"
            itemProp="description">
            {variantSummary.split('\n\n').map((paragraph, i) => (
              <p key={i} className={i > 0 ? 'mt-3' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Technical Skills - Moved up for better ATS scanning */}
        <section className="mb-6 print:mb-4" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading">Core Competencies</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-3">
            {allSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[var(--gray-100)] print:p-2 break-inside-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] mb-2 print:mb-1">
                  {skill.heading}
                </h3>
                <div className="flex flex-wrap gap-1.5 print:gap-1">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs px-2 py-0.5 rounded bg-[var(--background)] border border-[var(--gray-300)] print:border-gray-400 print:px-1"
                      itemProp="knowsAbout">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section
          className="mb-6 print:mb-4"
          aria-labelledby="experience-heading">
          <SectionHeading id="experience-heading">
            Professional Experience
          </SectionHeading>
          <div className="flex flex-col gap-4 print:gap-2">
            {resume.experience.map((exp, idx) => (
              <ExperienceEntry key={idx} entry={exp} variant={variant} />
            ))}
          </div>
        </section>

        {/* Education */}
        <section aria-labelledby="education-heading">
          <SectionHeading id="education-heading">Education</SectionHeading>
          <div className="flex flex-col gap-3 print:gap-2">
            {resume.education.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start p-3 rounded-lg bg-[var(--gray-100)] print:bg-transparent print:p-1"
                itemScope
                itemType="https://schema.org/EducationalOccupationalCredential">
                <div>
                  <h3
                    className="font-semibold text-[var(--job)]"
                    itemProp="credentialCategory">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">{edu.school}</p>
                  {edu.honors && (
                    <p className="text-xs font-medium text-[var(--primary)]">
                      {edu.honors}
                    </p>
                  )}
                </div>
                <span className="text-xs text-[var(--gray-600)] sm:text-right mt-1 sm:mt-0">
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Links */}
        <section className="mt-6 no-print">
          <LinksAboutMe />
        </section>

        <BuiltWithReact />
      </article>

      {variant !== IResumeVariant.LinkedIn ? (
        <>
          {/* Export Button */}
          < div className="no-print text-center mt-6 pb-8">
            <Tooltip
              id="print-tooltip"
              className="no-print invisible md:visible"
              content="Downloads your resume as a PDF file."
            />
            <Button
              data-tooltip-id="print-tooltip"
              className="no-print"
              onClick={exportToPdf}
              disabled={exporting}>
              {exporting ? 'Generating PDF...' : 'Export to PDF'}
            </Button>
          </div >
        </>
      ) : null
      }
    </>
  );
}

function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h2
      id={id}
      className="text-xl font-bold mb-3 pb-1 border-b border-[var(--primary)] text-[var(--primary)] uppercase tracking-wider print:text-lg print:mb-2">
      {children}
    </h2>
  );
}

function ContactLink({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`flex items-center gap-2 text-xs hover:text-[var(--primary)] transition-colors ${className}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function ExperienceEntry({ entry, variant }: { entry: IExperienceEntry; variant: IResumeVariant }) {
  const filteredPoints = filterKeyPoints(entry.keyPoints ?? [], variant);
  const [copied, setCopied] = useState(false);

  const copyExperienceForLinkedIn = useCallback(async () => {
    if (variant !== IResumeVariant.LinkedIn) return;
    try {
      const payload = formatLinkedInExperienceText(entry, variant);
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // ignore
    }
  }, [entry, variant]);

  return (
    <article
      className="p-4 border-l-4 border-[var(--primary)] bg-[var(--gray-100)] rounded-r-lg print:p-2 print:bg-transparent print:border-l-2"
      itemScope
      itemType="https://schema.org/OrganizationRole">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
        <div>
          <h3
            className="font-bold text-base text-[var(--job)]"
            itemProp="roleName">
            {entry.title}
          </h3>
          <p
            className="font-semibold text-sm text-[var(--primary)]"
            itemProp="memberOf">
            {entry.company}
          </p>
          {entry.location && (
            <p className="text-xs text-[var(--gray-600)]">{entry.location}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <time className="text-xs text-[var(--gray-600)] whitespace-nowrap">
            {formatDate(entry.startDate)} &ndash; {formatDate(entry.endDate)}
          </time>
          {variant === IResumeVariant.LinkedIn && (
            <button
              className="no-print text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors whitespace-nowrap cursor-pointer"
              onClick={copyExperienceForLinkedIn}>
              {copied ? '\u2713' : 'Copy'}
            </button>
          )}
        </div>
      </header>
      {filteredPoints.length > 0 && (
        <ul className="list-disc ml-4 text-xs mt-2 space-y-1 text-[var(--gray-800)] print:mt-1 print:space-y-0.5">
          {filteredPoints.map((point, idx) => (
            <li key={idx}>{point.text}</li>
          ))}
        </ul>
      )}
      {entry.technicalSkills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 print:mt-1">
          {entry.technicalSkills.flatMap(s => s.items).map((item, i) => (
            <span
              key={i}
              className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--background)] border border-[var(--gray-300)] text-[var(--gray-700)] print:border-gray-400">
              {item}
            </span>
          ))}
        </div>
      )}
      {entry.promotedFrom && entry.promotedFrom.length > 0 && (
        <div className="ml-4 mt-3 pt-2 border-t border-[var(--gray-300)] print:mt-1 print:pt-1">
          <p className="text-xs font-medium text-[var(--gray-700)] mb-2 print:mb-1">
            Promoted From:
          </p>
          {entry.promotedFrom.map((promo: IExperienceEntry, idx: number) => (
            <ExperienceEntry key={idx} entry={promo} variant={variant} />
          ))}
        </div>
      )}
    </article>
  );
}

function formatDate(date: Date | 'Present'): string {
  if (date === 'Present') {
    return date;
  }

  return day(date).format('MMM YYYY');
}

function BuiltWithReact() {
  return (
    <p className="italic print:mt-6 mt-10 text-center">
      This resume was built with React and Next.js and styled with Tailwind.
    </p>
  );
}
