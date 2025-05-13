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
        <div className="text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl text-center mb-8 text-foreground">
          Jacob Heater
        </div>
        <Contact />
        <TechnicalToolkit />
        <Education />
        <ProfessionalExperience />
        <AdditionalProjects />
      </div>
      <div className="resume-2-pdf mb-10 no-print">
        <div className="mt-10 flex justify-center">
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
    <div className="flex flex-col sm:flex-row justify-between items-center text-lg mb-8 mt-20 text-foreground/90 space-y-4 sm:space-y-0">
      <div className="text-center sm:text-left">
        D.C. Metro Area Based
        <br />
        Seeking Remote Opportunities
        <br />
        No Relocation
      </div>
      <div className="text-center sm:text-right">
        Preferred Contact Methods:
        <br />
        <a
          href="mailto:jacob.resume.contact@proton.me"
          className="underline text-primary hover:text-secondary">
          jacob.resume.contact@proton.me
        </a>
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
        <div key={index} className="mb-4">
          <div>
            <div className="flex flex-row items-center space-x-2">
              <span className="text-2xl font-bold text-[var(--accent)]">
                {item.company}
              </span>
              <span>({item.location})</span>
            </div>
            <div className="pt-2">
              <span className="text-l font-bold text-[var(--job)]">
                {item.title}
              </span>
              {' — '}
              <span>{item.timeInRole}</span>
            </div>
            {(() => {
              if (item.promotedFrom) {
                return (
                  <div className="pl-5 pt-2">
                    {item.promotedFrom.map((item, index) => (
                      <div key={index}>
                        <div>
                          <span className="font-bold text-[var(--job)]">
                            {item.title}
                          </span>
                          {' — '}
                          <span>{item.timeInRole}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return null;
            })()}
          </div>
          {(() => {
            if (item.description) {
              return (
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
                        <ul {...props} className="list-disc pl-5 space-y-2" />
                      ),
                      li: ({ ...props }) => (
                        <li {...props} className="list-disc pl-2" />
                      ),
                    }}>
                    {item.description}
                  </ReactMarkown>
                </div>
              );
            }
            return null;
          })()}
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
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
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
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
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
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
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
      <div className="only-print hidden">
        <p className="pt-8 mb-4">
          Scan the QR code below to view my GitHub, projects, and developer
          profiles in one place.
        </p>
        <QRCode value="https://jacobheater.com/about/resume/links" size={128} />
      </div>
    </>
  );
}
