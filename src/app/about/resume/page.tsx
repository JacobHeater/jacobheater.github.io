'use client';

import { Heading } from './components/heading';
import { toolkit } from './data/technical-toolkit/toolkit';
import { educationData } from './data/education/education';
import { experienceData } from './data/experience/experience';
import { SubHeading } from './components/sub-heading';
import { Tooltip } from 'react-tooltip';
import { HtmlTitle } from '@/app/components/html-title';
import ReactMarkown from 'react-markdown';
import QRCode from 'react-qr-code';

export default function Resume() {
  return (
    <div className="resume-container">
      <HtmlTitle title="Jacob Heater - Resume" />
      <div className="p-8 max-w-5xl mx-auto">
        <div className="text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl text-center mb-4 text-foreground">
          Jacob Heater
        </div>
        <Contact />
        <ProfessionalExperience />
        <Education />
        <TechnicalToolkit />
        <AdditionalProjects />
        <BuiltWithReact />
      </div>
      <div className="resume-2-pdf mb-5 no-print">
        <div className="mt-5 flex justify-center">
          <Tooltip
            id="print-tooltip"
            content="Opens the print dialog. From there you can save as PDF."
            className="no-print invisible md:visible"
          />
          <button
            data-tooltip-id="print-tooltip"
            onClick={() => {
              window.print();
            }}
            className="inline-flex items-center px-6 py-3 border border-[var(--primary)] text-base font-medium rounded-md shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center text-lg mb-8 mt-15 space-y-4 sm:space-y-0 sm:items-start">
      <div className="flex flex-col items-start space-y-2 text-center sm:text-left">
        <span className="text-xl font-bold text-[var(--accent)]">
          Based in the D.C. Metro Area
        </span>
        <span>Open to Remote Opportunities</span>
        <span>Not Available for Relocation</span>
      </div>
      <div className="flex flex-col items-start space-y-2 text-center sm:items-end sm:text-right">
        <div>
          <span className="font-bold text-[var(--foreground)]">Email:</span>{' '}
          <a
            href="mailto:jacob.resume.contact@proton.me"
            className="underline text-primary hover:text-secondary">
            jacob.resume.contact@proton.me
          </a>
        </div>
        <div>
          <span className="font-bold text-[var(--foreground)]">Website:</span>{' '}
          <a
            href="https://jacobheater.com"
            className="underline text-primary hover:text-secondary">
            jacobheater.com
          </a>
        </div>
      </div>
    </div>
  );
}

function TechnicalToolkit() {
  return (
    <>
      <Heading text="Technical Leadership Toolkit" />
      <ReactMarkown
        components={{
          strong: ({ ...props }) => (
            <strong
              {...props}
              className="text-lg font-bold text-[var(--accent)]"
            />
          ),
          p: ({ ...props }) => <p {...props} className="text-md mb-4" />,
        }}>
        {toolkit}
      </ReactMarkown>
    </>
  );
}

function Education() {
  return (
    <>
      <Heading text="Education" />
      {educationData.map((item, index) => (
        <div key={index}>
          <div>
            <span className="text-xl font-bold text-[var(--accent)]">
              {item.school}
            </span>
            {' — '}
            {item.location} | {item.graduationYear}{' '}
            {item.honors && `| ${item.honors}`}
          </div>
        </div>
      ))}
    </>
  );
}

function ProfessionalExperience() {
  return (
    <>
      <Heading text="Professional Experience" />
      {experienceData.map((item, index) => (
        <div key={index} className="my-4">
          <div>
            <div className="flex flex-row items-center space-x-4">
              <span className="text-2xl mb-4 font-bold text-[var(--accent)]">
                {item.company}
              </span>
              <span>({item.location})</span>
            </div>
            <div className="relative">
              {item.roles.length > 1 && (
                <div
                  className={`absolute left-2 top-0 h-full border-l-[1px] border-[var(--accent)]`}></div>
              )}
              <div className="pl-5">
                {item.roles.map((role, index) => (
                  <div key={index} className={`${index > 0 ? 'pt-4' : ''}`}>
                    <div>
                      <span className="font-bold text-[var(--job)]">
                        {role.title}
                      </span>
                      {' — '}
                      <span>{role.timeInRole}</span>
                    </div>
                    {role.description && (
                      <div className="pl-5 pt-[10px]">
                        <ReactMarkown
                          components={{
                            h2: ({ ...props }) => (
                              <h2
                                {...props}
                                className="text-md font-bold mt-2 mb-4"
                              />
                            ),
                            p: ({ ...props }) => (
                              <p {...props} className="text-md mb-4" />
                            ),
                            ul: ({ ...props }) => (
                              <ul
                                {...props}
                                className="list-disc pl-5 space-y-2"
                              />
                            ),
                            li: ({ ...props }) => (
                              <li {...props} className="list-disc pl-2" />
                            ),
                          }}>
                          {role.description}
                        </ReactMarkown>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
        <SubHeading
          text="Earlier Roles from 2013-2017"
          className="text-[var(--accent)]"
        />
        <p>
          Software engineering roles at{' '}
          <span className="text-[var(--accent)] font-bold">Deltek</span>,{' '}
          <span className="text-[var(--accent)] font-bold">DHA</span>,{' '}
          <span className="text-[var(--accent)] font-bold">USDA</span>, and{' '}
          <span className="text-[var(--accent)] font-bold">
            United Association
          </span>{' '}
          contributing to enterprise applications in federal and nonprofit
          sectors.
        </p>
      </div>
    </>
  );
}

function AdditionalProjects() {
  return (
    <>
      <Heading text="Additional Projects" />
      <SubHeading text="npm Packages" className="text-[var(--accent)]" />
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <a
            href="https://www.npmjs.com/package/system-restore"
            className="underline text-primary hover:text-secondary">
            system-restore
          </a>
          <br />
          <span>
            Allows for scripting system restore points (Windows) using
            JavaScript.
          </span>
        </li>
      </ul>
      <SubHeading text="Repositories" className="text-[var(--accent)]" />
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <a
            href="https://github.com/jacobheater/"
            className="underline text-primary hover:text-secondary">
            GitHub/jacobheater
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/JacobHeater"
            className="underline text-primary hover:text-secondary">
            GitLab/jacobheater
          </a>
        </li>
      </ul>
      <SubHeading
        text="Other Links About Me"
        className="text-[var(--accent)]"
      />
      <ul className="list-disc pl-5 space-y-4">
        <li>
          <a
            href="http://stackoverflow.com/users/2023218/jacob-heater"
            className="underline text-primary hover:text-secondary">
            StackOverflow
          </a>
        </li>
        <li>
          <a
            href="https://www.hackerrank.com/jacobheater"
            className="underline text-primary hover:text-secondary">
            HackerRank
          </a>
        </li>
      </ul>
      <div className="absolute only-print top-0 right-8 w-[100px] flex flex-col items-center justify-center text-center">
        <QRCode
          value="https://jacobheater.com/about/resume/links"
          className="block w-full h-auto"
        />
        <p className="text-wrap text-xs mt-2 w-full">Resume Links</p>
      </div>
    </>
  );
}

function BuiltWithReact() {
  return (
    <p className="italic print:mt-6 mt-10 text-center">
      This resume was built with React and Next.js and styled with Tailwind.
    </p>
  );
}
