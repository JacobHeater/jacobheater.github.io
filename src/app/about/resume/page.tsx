'use client';

import { HtmlTitle } from '@/app/components/html-title';
import { resume } from './data/resume/resume';
import { IExperienceEntry } from './models/resume';
import { Public, Email, LinkedIn, GitHub } from '@mui/icons-material';
import { Button } from '@/app/components/button';
import { Tooltip } from 'react-tooltip';
import day from 'dayjs';
import LinksAboutMe from './components/links/links-about-me';

// JSON-LD structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: resume.fullName,
  jobTitle: 'Principal Software Engineer',
  description: resume.professionalSummary,
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article
        className="min-h-screen pt-4 max-w-4xl mx-auto"
        itemScope
        itemType="https://schema.org/Person">
        <HtmlTitle title="Jacob Heater | Principal Software Engineer - Resume" />
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
                Principal Software Engineer
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
          <SectionHeading id="summary-heading">
            Professional Summary
          </SectionHeading>
          <p
            className="text-sm leading-relaxed text-[var(--gray-800)]"
            itemProp="description">
            {resume.professionalSummary}
          </p>
        </section>

        {/* Technical Skills - Moved up for better ATS scanning */}
        <section className="mb-6 print:mb-4" aria-labelledby="skills-heading">
          <SectionHeading id="skills-heading">Core Competencies</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-3">
            {resume.technicalSkills.map((skill, idx) => (
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
              <ExperienceEntry key={idx} entry={exp} />
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

      {/* Export Button */}
      <div className="no-print text-center mt-6 pb-8">
        <Tooltip
          id="print-tooltip"
          className="no-print invisible md:visible"
          content="Opens a print dialog where you can save as PDF."
        />
        <Button
          data-tooltip-id="print-tooltip"
          className="no-print"
          onClick={() => window.print()}>
          Export to PDF
        </Button>
      </div>
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

function ExperienceEntry({ entry }: { entry: IExperienceEntry }) {
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
        <time className="text-xs text-[var(--gray-600)] whitespace-nowrap">
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </time>
      </header>
      {entry.keyPoints &&
        entry.keyPoints.length > 0 &&
        entry.keyPoints.some(Boolean) && (
          <ul className="list-disc ml-4 text-xs mt-2 space-y-1 text-[var(--gray-800)] print:mt-1 print:space-y-0.5">
            {entry.keyPoints
              .filter(Boolean)
              .map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
          </ul>
        )}
      {entry.promotedFrom && entry.promotedFrom.length > 0 && (
        <div className="ml-4 mt-3 pt-2 border-t border-[var(--gray-300)] print:mt-1 print:pt-1">
          <p className="text-xs font-medium text-[var(--gray-700)] mb-2 print:mb-1">
            Promoted From:
          </p>
          {entry.promotedFrom.map((promo: IExperienceEntry, idx: number) => (
            <ExperienceEntry key={idx} entry={promo} />
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
