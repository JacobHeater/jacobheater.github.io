'use client';

import { Suspense, useCallback, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { HtmlTitle } from '@/app/components/html-title';
import { resume } from './data/resume/resume';
import { IExperienceEntry } from './models/resume';
import { Button } from '@/app/components/button';
import {
  aggregateSkills,
  collectUniqueTechnologies,
  CompanyExperienceGroup,
  formatDate,
  formatExperienceText,
  formatSummaryText,
  groupExperienceByCompany,
  resolveKeyPoints,
  resolveLinkedInSummary,
  resolveLinkedInTitle,
  RESUME_LABELS,
} from './resume-presentation';
import { TailorWizard } from './components/tailor-wizard';

const allSkills = aggregateSkills(resume.experience);
const experienceGroups = groupExperienceByCompany(resume.experience);
const linkedInTitle = resolveLinkedInTitle(resume);
const linkedInSummary = resolveLinkedInSummary(resume);

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: resume.fullName,
  jobTitle: linkedInTitle,
  description: linkedInSummary,
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
  const copyMode = searchParams.get('copy')?.toLowerCase() === 'true';
  const includePhoneInPdf = searchParams.get('phone')?.toLowerCase() === 'true';
  const tailorMode = searchParams.get('tailor')?.toLowerCase() === 'true';
  const [exporting, setExporting] = useState(false);

  const exportToPdf = useCallback(async () => {
    setExporting(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: ResumePdfDocument } = await import(
        './components/resume-pdf-document'
      );
      const blob = await pdf(<ResumePdfDocument data={resume} includePhone={includePhoneInPdf} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume.fullName.replace(/\s+/g, '_')}_ATS_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [includePhoneInPdf]);

  const [summaryCopied, setSummaryCopied] = useState(false);

  const copySummaryForLinkedIn = useCallback(async () => {
    if (!copyMode) return;
    try {
      const payload = formatSummaryText(linkedInSummary);
      await navigator.clipboard.writeText(payload);
      setSummaryCopied(true);
      setTimeout(() => setSummaryCopied(false), 1500);
    } catch {
      // ignore clipboard errors
    }
  }, [copyMode]);

  if (tailorMode) {
    return <TailorWizard />;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article
        className="min-h-screen pt-6 pb-8 max-w-4xl mx-auto px-4 sm:px-6 text-[var(--foreground)]"
        itemScope
        itemType="https://schema.org/Person">
        <HtmlTitle title={`Jacob Heater | ${linkedInTitle} - Resume`} />
        <meta
          name="description"
          content="Principal Software Engineer with 12+ years experience in TypeScript, React, Node.js, C#/.NET, Python, Nest.js, Kafka, RabbitMQ, AWS, Azure, and Kubernetes. Expert in system design, microservices, event-driven architecture, cybersecurity platforms, and full-stack development."
        />

        <header className="mb-6 print:mb-4 pb-4">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]"
            itemProp="name">
            {resume.fullName}
          </h1>
          <p className="text-lg font-semibold mt-1 text-[var(--foreground)]">
            {linkedInTitle}
          </p>
          <p
            className="text-sm mt-1 text-[var(--gray-700)]"
            itemProp="address">
            {resume.location}
          </p>
          <nav className="mt-3 text-sm text-[var(--gray-800)] leading-relaxed" aria-label="Contact information">
            <p>
              {RESUME_LABELS.email}: <a href={`mailto:${resume.publicEmailAddress}`} className="underline">{resume.publicEmailAddress}</a> | {RESUME_LABELS.linkedIn}:{' '}
              <a href={resume.linkedIn} className="underline">linkedin.com/in/jacobheater</a> | {RESUME_LABELS.website}:{' '}
              <a href={resume.website} className="underline">jacobheater.com</a> | {RESUME_LABELS.github}:{' '}
              <a href={resume.github} className="underline">github.com/jacobheater</a>
            </p>
          </nav>
        </header>

        <section className="mb-6 print:mb-4" aria-labelledby="summary-heading">
          <SectionHeading id="summary-heading">{RESUME_LABELS.summary}</SectionHeading>
          {copyMode && (
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
            {linkedInSummary.split('\n\n').map((paragraph, i) => (
              <p key={i} className={i > 0 ? 'mt-3' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-6 print:mb-4" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading">{RESUME_LABELS.technicalSkills}</SectionHeading>
          <div className="space-y-2 text-sm text-[var(--gray-800)]">
            {allSkills.map((skill, idx) => (
              <p key={idx}>
                <span className="font-semibold" itemProp="knowsAbout">
                  {skill.heading}:
                </span>{' '}
                {skill.items.join(', ')}
              </p>
            ))}
          </div>
        </section>

        <section
          className="mb-6 print:mb-4"
          aria-labelledby="experience-heading">
          <SectionHeading id="experience-heading">{RESUME_LABELS.professionalExperience}</SectionHeading>
          <div className="flex flex-col gap-4 print:gap-3">
            {experienceGroups.map((group, idx) => (
              <CompanyExperienceSection
                key={idx}
                group={group}
                copyMode={copyMode}
                isLast={idx === experienceGroups.length - 1}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="education-heading">
          <SectionHeading id="education-heading">{RESUME_LABELS.education}</SectionHeading>
          <div className="flex flex-col gap-3 print:gap-2 text-sm">
            {resume.education.map((edu, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-start pb-2"
                itemScope
                itemType="https://schema.org/EducationalOccupationalCredential">
                <div>
                  <h3
                    className="font-semibold text-[var(--foreground)]"
                    itemProp="credentialCategory">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-[var(--gray-700)]">{edu.school}</p>
                  {edu.honors && (
                    <p className="text-xs font-medium text-[var(--gray-800)]">
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
      </article>

      <div className="no-print text-center mt-6 pb-8">
        <Button
          className="no-print"
          onClick={exportToPdf}
          disabled={exporting}>
          {exporting ? 'Generating PDF...' : 'Export ATS PDF'}
        </Button>
      </div>
    </>
  );
}

function SectionHeading({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  return (
    <h2
      id={id}
      className="text-lg sm:text-xl font-bold mb-3 pb-1 border-b border-[var(--gray-300)] text-[var(--foreground)] uppercase tracking-normal print:mb-2">
      {children}
    </h2>
  );
}

function CompanyExperienceSection({
  group,
  copyMode,
  isLast,
}: {
  group: CompanyExperienceGroup;
  copyMode: boolean;
  isLast: boolean;
}) {
  const totalStartDate = group.roles.reduce(
    (earliest, role) => (role.startDate < earliest ? role.startDate : earliest),
    group.roles[0].startDate,
  );
  const currentRole = group.roles[0];

  return (
    <section className={isLast ? 'pb-3' : 'pb-3 border-b border-[var(--gray-300)]'} itemScope itemType="https://schema.org/Organization">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h3 className="font-bold text-lg text-[var(--foreground)]" itemProp="name">
            {group.company}
          </h3>
          <p className="text-sm text-[var(--gray-700)]">
            {group.location || currentRole.location}
          </p>
        </div>
        <time className="text-xs text-[var(--gray-700)] whitespace-nowrap">
          {formatDate(totalStartDate)} &ndash; {formatDate(currentRole.endDate)}
        </time>
      </header>

      <div className="mt-3 space-y-4 print:space-y-3">
        {group.roles.map((role, idx) => (
          <RoleEntry key={idx} entry={role} copyMode={copyMode} />
        ))}
      </div>
    </section>
  );
}

function RoleEntry({
  entry,
  copyMode,
}: {
  entry: IExperienceEntry;
  copyMode: boolean;
}) {
  const filteredPoints = resolveKeyPoints(entry.keyPoints ?? []);
  const [copied, setCopied] = useState(false);

  const copyExperienceForLinkedIn = useCallback(async () => {
    if (!copyMode) return;
    try {
      const payload = formatExperienceText(entry);
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }, [copyMode, entry]);

  return (
    <article
      className=""
      itemScope
      itemType="https://schema.org/OrganizationRole">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <h3
            className="font-semibold text-sm text-[var(--foreground)]"
            itemProp="roleName">
            {entry.title}
          </h3>
          {entry.contract ? <h4 className='pt-2 text-xs text-[var(--foreground)]'>{RESUME_LABELS.contract}</h4> : null}
        </div>
        <div className="flex items-center gap-2">
          <time className="text-xs text-[var(--gray-700)] whitespace-nowrap">
            {formatDate(entry.startDate)} &ndash; {formatDate(entry.endDate)}
          </time>
          {copyMode && (
            <button
              className="no-print text-xs text-[var(--primary)] hover:text-[var(--secondary)] transition-colors whitespace-nowrap cursor-pointer"
              onClick={copyExperienceForLinkedIn}>
              {copied ? '\u2713' : 'Copy'}
            </button>
          )}
        </div>
      </header>
      {filteredPoints.length > 0 && (
        <ul className="list-disc ml-5 text-sm mt-2 space-y-1 text-[var(--gray-800)] print:mt-1 print:space-y-0.5">
          {filteredPoints.map((point, idx) => (
            <li key={idx}>{point.text}</li>
          ))}
        </ul>
      )}
      {entry.technicalSkills.length > 0 && (
        <p className="text-xs mt-2 text-[var(--gray-700)]">
          <span className="font-semibold">{RESUME_LABELS.technologies}:</span>{' '}
          {collectUniqueTechnologies(entry).join(', ')}
        </p>
      )}
    </article>
  );
}

