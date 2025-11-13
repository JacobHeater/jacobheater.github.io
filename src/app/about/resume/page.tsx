'use client';

import { HtmlTitle } from '@/app/components/html-title';
import { resume } from './data/resume/resume';
import { IExperienceEntry } from './models/resume';
import { Public, Email, LinkedIn } from '@mui/icons-material';
import { Button } from '@/app/components/button';
import { Tooltip } from 'react-tooltip';
import day from 'dayjs';
import LinksAboutMe from './components/links/links-about-me';

export default function ResumePage() {
  return (
    <>
      <div className="min-h-screen pt-4">
        <HtmlTitle title="Jacob Heater - Resume" />
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-3 mb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                {resume.fullName}
              </h1>
              <div className="text-sm mt-2">{resume.location}</div>
            </div>
            <div className="flex flex-col flex-wrap gap-2">
              <ContactLink
                href={`mailto:${resume.publicEmailAddress}`}
                label={resume.publicEmailAddress}
                icon={<Email />}
                className="print:hidden"
              />
              <ContactLink
                href={`mailto:${resume.privateEmailAddress}`}
                label={resume.privateEmailAddress}
                icon={<Email />}
                className="hidden print:flex"
              />
              <ContactLink
                href={resume.linkedIn}
                label={resume.linkedIn}
                icon={<LinkedIn />}
              />
              <ContactLink
                href={resume.website}
                label={resume.website}
                icon={<Public />}
              />
              <div className="text-xs text-[var(--primary)]">
                Check out my website for more links and projects!
              </div>
            </div>
          </div>
          <section className="mb-4">
            <div className="text-2xl font-semibold mb-1 tracking-wide uppercase text-[var(--primary)]">
              Summary
            </div>
            <p className="text-sm leading-relaxed">
              {resume.professionalSummary}
            </p>
          </section>
          <section className="mb-4">
            <div className="text-2xl font-semibold mb-1 tracking-wide uppercase text-[var(--primary)]">
              Experience
            </div>
            <div className="flex flex-col gap-4">
              {resume.experience.map((exp, idx) => (
                <ExperienceEntry key={idx} entry={exp} />
              ))}
            </div>
          </section>
          <section className="mb-4">
            <div className="text-2xl font-semibold mb-1 tracking-wide uppercase text-[var(--primary)]">
              Technical Skills
            </div>
            <div className="flex flex-wrap gap-3">
              {resume.technicalSkills.map((skill, idx) => (
                <div key={idx} className="mb-1">
                  <span className="text-xs font-semibold">
                    {skill.heading}:{' '}
                  </span>
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-block text-xs px-2 py-0.5 rounded-full mr-1 mb-1 border border-[var(--primary)]">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="text-2xl font-semibold tracking-wide uppercase text-[var(--primary)]">
              Education
            </div>
            <div className="flex flex-col gap-2">
              {resume.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-3">
                  <div>
                    <span className="font-medium text-[var(--job)]">
                      {edu.degree}
                    </span>
                    <span className="text-sm block">{edu.school}</span>
                    {edu.honors && (
                      <span className="text-xs font-medium">
                        Honors: {edu.honors}
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-right">
                    {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <section className="no-print mt-4">
            <LinksAboutMe />
          </section>
        </div>
        <BuiltWithReact />
      </div>
      <div className="no-print text-center mt-5">
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
      className={`flex items-center gap-1 text-xs hover:underline hover:text-blue-900 transition ${className}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

function ExperienceEntry({ entry }: { entry: IExperienceEntry }) {
  return (
    <div className="px-3 py-2 border border-gray-300 rounded">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <span className="font-medium text-sm text-[var(--job)]">
          {entry.title}
          <span className="text-[var(--job)]">{' | '}</span>
          <span className="text-[var(--primary)]">{entry.company}</span>
        </span>
        <span className="text-xs mt-1 sm:mt-0">
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </span>
      </div>
      {entry.location && (
        <div className="text-xs font-bold">{entry.location}</div>
      )}
      {entry.keyPoints &&
        entry.keyPoints.length > 0 &&
        entry.keyPoints.some(Boolean) && (
          <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
            {entry.keyPoints
              .filter(Boolean)
              .map((point: string, idx: number) => (
                <li key={idx}>{point}</li>
              ))}
          </ul>
        )}
      {entry.promotedFrom && entry.promotedFrom.length > 0 && (
        <div className="ml-2 mt-2 border-l-2 border-[var(--accent)] pl-3">
          {entry.promotedFrom.map((promo: any, idx: number) => (
            <ExperienceEntry key={idx} entry={promo} />
          ))}
        </div>
      )}
    </div>
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
