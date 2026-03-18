'use client';

import { Suspense, useCallback, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { HtmlTitle } from '@/app/components/html-title';
import { resume } from './data/resume/resume';
import { IExperienceEntry } from './models/resume';
import { Button } from '@/app/components/button';
import {
  collectUniqueTechnologies,
  CompanyExperienceGroup,
  formatDate,
  groupExperienceByCompany,
  RESUME_LABELS,
} from './resume-presentation';

const experienceGroups = groupExperienceByCompany(resume.experience);

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: resume.fullName,
  jobTitle: resume.title,
  description: resume.professionalSummary,
  url: resume.website,
  sameAs: [resume.linkedIn, resume.github, resume.website],
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Washington DC Metro Area',
    addressCountry: 'US',
  },
  knowsAbout: [
    'TypeScript', 'JavaScript', 'C#', '.NET', 'Python', 'Java', 'SQL',
    'React', 'Next.js', 'Angular', 'Node.js', 'Express',
    'REST APIs', 'Microservices', 'SignalR',
    'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS', 'Azure', 'GCP',
    'MongoDB', 'SQL Server', 'Entity Framework', 'Databricks',
    'SOAR', 'SOC Automation', 'Swimlane', 'Phishing Analysis',
    'Agile', 'Scrum', 'Jira', 'Git',
    'Unit Testing', 'Integration Testing', 'End-to-End Testing',
    'Software Architecture', 'System Design',
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
  const includePhoneInPdf = searchParams.get('phone')?.toLowerCase() === 'true';
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
      a.download = `${resume.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [includePhoneInPdf]);

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
        <HtmlTitle title={`Jacob Heater | ${resume.title} - Resume`} />
        <meta
          name="description"
          content="Senior Software Engineer with 13+ years experience in TypeScript, React, Node.js, C#/.NET, Python, AWS, Azure, GCP, Docker, Kubernetes, and Terraform. Expert in full-stack development, microservices, CI/CD, cybersecurity platforms, and SOAR."
        />

        <header className="mb-6 print:mb-4 pb-4">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]"
            itemProp="name">
            {resume.fullName}
          </h1>
          <p className="text-lg font-semibold mt-1 text-[var(--foreground)]">
            {resume.title}
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
          <p
            className="text-sm leading-relaxed text-[var(--gray-800)]"
            itemProp="description">
            {resume.professionalSummary}
          </p>
        </section>

        <section className="mb-6 print:mb-4" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading">{RESUME_LABELS.technicalSkills}</SectionHeading>
          <div className="space-y-2 text-sm text-[var(--gray-800)]">
            {resume.skills.map((skill, idx) => (
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
                    {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}
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
  isLast,
}: {
  group: CompanyExperienceGroup;
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
          <RoleEntry key={idx} entry={role} />
        ))}
      </div>
    </section>
  );
}

function RoleEntry({
  entry,
}: {
  entry: IExperienceEntry;
}) {
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
        <time className="text-xs text-[var(--gray-700)] whitespace-nowrap">
          {formatDate(entry.startDate)} &ndash; {formatDate(entry.endDate)}
        </time>
      </header>
      {entry.keyPoints.length > 0 && (
        <ul className="list-disc ml-5 text-sm mt-2 space-y-1 text-[var(--gray-800)] print:mt-1 print:space-y-0.5">
          {entry.keyPoints.map((point, idx) => (
            <li key={idx}>{point}</li>
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
