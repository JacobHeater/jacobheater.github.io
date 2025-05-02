'use client';

import { Heading } from './components/heading';
import { TechnicalToolkitList } from './components/technical-toolkit-list';
import { dotnetSkills } from './data/technical-toolkit/dotnet';
import { javaSkills } from './data/technical-toolkit/java';
import { javascriptSkills } from './data/technical-toolkit/javascript';
import { mobileSkills } from './data/technical-toolkit/mobile';
import { pythonSkills } from './data/technical-toolkit/python';
import { sourceControlSkills } from './data/technical-toolkit/source-control';
import { w3Skills } from './data/technical-toolkit/w3';
import { generalSkills } from './data/technical-toolkit/general';
import { containerSkills } from './data/technical-toolkit/containers';
import { saasSkills } from './data/technical-toolkit/saas';
import { ideSkills } from './data/technical-toolkit/ides';
import { osSkills } from './data/technical-toolkit/operating-systems';
import { educationColumns, educationData } from './data/education/education';
import { Table } from './components/table';
import {
  experienceColumns,
  experienceData,
} from './data/experience/experience';
import { SubHeading } from './components/sub-heading';
import { Tooltip } from 'react-tooltip';

export default function Resume() {
  return (
    <div className="resume-container">
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
          />
          <button
            data-tooltip-id="print-tooltip"
            onClick={() => {
              window.print();
            }}
            className="inline-flex items-center px-6 py-3 border border-[var(--primary)] text-base font-medium rounded-md shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200"
          >
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
          className="underline text-primary hover:text-secondary"
        >
          jacob.resume.contact@proton.me
        </a>
      </div>
    </div>
  );
}

function TechnicalToolkit() {
  return (
    <>
      <Heading text="Technical Toolkit" />
      <TechnicalToolkitList title="JavaScript" skills={javascriptSkills} />
      <TechnicalToolkitList title="C# / .NET" skills={dotnetSkills} />
      <TechnicalToolkitList title="Java" skills={javaSkills} />
      <TechnicalToolkitList title="Web Standards" skills={w3Skills} />
      <TechnicalToolkitList title="Mobile" skills={mobileSkills} />
      <TechnicalToolkitList title="Python" skills={pythonSkills} />
      <TechnicalToolkitList
        title="Source Control"
        skills={sourceControlSkills}
      />
      <TechnicalToolkitList title="General Skills" skills={generalSkills} />
      <TechnicalToolkitList title="Containers" skills={containerSkills} />
      <TechnicalToolkitList title="SaaS" skills={saasSkills} />
      <TechnicalToolkitList title="IDEs" skills={ideSkills} />
      <TechnicalToolkitList title="Operating Systems" skills={osSkills} />
    </>
  );
}

function Education() {
  return (
    <>
      <Heading text="Education" />
      <div className="overflow-x-auto">
        <Table columns={educationColumns} data={educationData} />
      </div>
    </>
  );
}

function ProfessionalExperience() {
  return (
    <>
      <Heading text="Professional Experience" />
      <div className="overflow-x-auto">
        <Table columns={experienceColumns} data={experienceData} />
      </div>
    </>
  );
}

function AdditionalProjects() {
  return (
    <>
      <Heading text="Additional Projects" />
      <SubHeading text="npm Packages" />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="https://www.npmjs.com/package/system-restore"
            className="underline text-primary hover:text-secondary"
          >
            system-restore
          </a>
          <br />
          <span>
            Allows for scripting system restore points (Windows) using
            JavaScript.
          </span>
        </li>
      </ul>
      <SubHeading text="Repositories" />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="https://github.com/jacobheater/"
            className="underline text-primary hover:text-secondary"
          >
            GitHub/jacobheater
          </a>
        </li>
        <li>
          <a
            href="https://gitlab.com/JacobHeater"
            className="underline text-primary hover:text-secondary"
          >
            GitLab/jacobheater
          </a>
        </li>
      </ul>
      <SubHeading text="Other Links About Me" />
      <ul className="list-disc pl-5 space-y-4 text-foreground/90">
        <li>
          <a
            href="http://stackoverflow.com/users/2023218/jacob-heater"
            className="underline text-primary hover:text-secondary"
          >
            StackOverflow
          </a>
        </li>
        <li>
          <a
            href="https://www.hackerrank.com/jacobheater"
            className="underline text-primary hover:text-secondary"
          >
            HackerRank
          </a>
        </li>
      </ul>
    </>
  );
}
