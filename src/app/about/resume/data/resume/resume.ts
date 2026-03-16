import { IResume, IResumeVariant } from "../../models/resume";

const V = IResumeVariant;
const ALL_IC = [V.SeniorIC, V.StaffIC, V.PrincipalIC];

export const resume: IResume = {
  fullName: 'Jacob Heater',
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? '',
  title: [
    { variant: V.SeniorIC, text: 'Senior Software Engineer' },
    { variant: V.StaffIC, text: 'Staff Software Engineer' },
    { variant: V.PrincipalIC, text: 'Principal Software Engineer' },
    { variant: V.SeniorManager, text: 'Senior Engineering Manager' },
    { variant: V.LinkedIn, text: 'Software Engineer & Engineering Leader' },
  ],
  location: 'Washington DC Metro Area',
  publicEmailAddress: 'jacob.resume.contact@proton.me',
  privateEmailAddress: 'jacobheater@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/jacobheater',
  website: 'https://jacobheater.com',
  github: 'https://github.com/jacobheater',
  professionalSummary: [
    {
      variant: V.SeniorIC,
      text: 'Senior Software Engineer with 13+ years of experience delivering production software across the full stack. Proficient in TypeScript, JavaScript, C#, Python, React, Next.js, Angular, Node.js, and cloud platforms including AWS, Azure, and GCP. Proven track record of building scalable web applications, designing database schemas, architecting shared SDKs and reusable frameworks, and containerizing applications with Docker, Kubernetes, and Terraform. Repeatedly established CI/CD pipelines and testing infrastructure from scratch, including achieving 0% to 80% code coverage at Cofense and introducing first-ever E2E test suites at Deltek. Domain experience spans cybersecurity (SOAR, phishing analysis), healthcare (HAIMS, PHIS, DICOM, HL7), government systems (DHA, USDA), and enterprise SaaS platforms. Known for taking ownership of products end-to-end, building greenfield systems, and shipping high-quality code under pressure.',
    },
    {
      variant: V.StaffIC,
      text: 'Staff Software Engineer with 13+ years of experience combining deep hands-on engineering with technical leadership across distributed teams. Expert in TypeScript, JavaScript, C#, Python, React, Next.js, Angular, Node.js, and cloud infrastructure on AWS, Azure, and GCP. Proven ability to architect systems, design shared SDKs and reusable frameworks that standardize development across teams, build CI/CD pipelines and testing infrastructure from the ground up, and containerize applications with Docker, Kubernetes, and Terraform. Drove cross-team technical initiatives while remaining an active contributor to production codebases. Brings unique perspective from prior engineering management experience, enabling effective translation between technical execution and business strategy. Track record of delivering platform features from concept to production across cybersecurity, healthcare, government systems, and enterprise SaaS domains.',
    },
    {
      variant: V.PrincipalIC,
      text: 'Principal Software Engineer with 13+ years of experience spanning hands-on software development, system architecture, and engineering leadership. Expert in TypeScript, JavaScript, C#, Python, React, Next.js, Angular, Node.js, and cloud platforms including AWS, Azure, and GCP. Made a deliberate return to individual contribution after serving as Senior Engineering Manager, combining production-level coding ability with executive perspective on team building, roadmap planning, and delivery strategy. Proven ability to design organization-wide technical solutions — from database schemas and plugin architectures to shared SDKs, testing frameworks, and SDLC process standardization — and to build greenfield systems from scratch. Track record of standing up engineering teams and processes, driving architectural decisions that shape product direction, and establishing CI/CD and testing infrastructure where none existed. Domain expertise in cybersecurity, healthcare, government systems, and enterprise SaaS.',
    },
    {
      variant: V.SeniorManager,
      text: 'Senior Engineering Manager with 13+ years of experience in software engineering and engineering leadership, including building and scaling distributed remote teams of up to 7 direct reports while collaborating extensively with international teams. Proven ability to align engineering execution with business strategy, establish SDLC processes and engineering excellence standards across organizations, and deliver measurable outcomes through DORA and Agile metrics tracking. Experience leading multi-agency design sessions with government stakeholders across all branches of the military and collaborating closely with SOC leadership and cross-functional stakeholders. Hands-on technical background in TypeScript, JavaScript, C#, Python, React, Angular, Node.js, and cloud platforms including GCP provides credibility with engineering teams and enables effective technical decision-making. Track record of developing and promoting engineers, building stakeholder trust, and standing up new teams from scratch across cybersecurity, healthcare, government, and enterprise SaaS organizations.',
    },
    {
      variant: V.LinkedIn,
      text: `Software engineer with 13+ years of experience building production systems across cybersecurity, healthcare, government, and enterprise SaaS. My technical foundation spans TypeScript, JavaScript, C#, Python, React, Next.js, Angular, and Node.js, with cloud experience on AWS, Azure, and GCP. I've designed SOAR components and shared SDKs, built CI/CD pipelines and testing infrastructure from scratch, and delivered org-wide tooling that scaled from personal tools to Kubernetes-deployed production infrastructure. After serving as Senior Engineering Manager at Expel — managing 7 direct reports while staying hands-on enough to personally ship React components — I returned to individual contribution because I love building things. I bring production-level coding ability and executive perspective on delivery strategy in equal measure.`
    }
  ],
  experience: [
    {
      company: 'CVS Health',
      title: 'Software Engineering Consultant',
      contract: true,
      startDate: new Date(2025, 7),
      endDate: 'Present',
      location: 'Remote',
      keyPoints: [
        {
          text: 'Stood up a scrum team from scratch out of a diverse group of SOC hybrid developers, establishing development processes that brought structure and predictable delivery to a previously ad hoc workflow.',
          variants: [V.Universal],
        },
        {
          text: 'Proposed and led organizational restructuring aligned with Team Topologies, improving team clarity and cross-functional collaboration.',
          variants: [V.SeniorManager, V.PrincipalIC],
        },
        {
          text: 'Designed and built SOAR components, alert enrichment tools, and analyst automations in JavaScript and Python that reduced manual SOC triage effort.',
          variants: ALL_IC,
        },
        {
          text: 'Created a custom phishing analysis rules engine in Next.js with Tailwind CSS styling, and built a synchronization pipeline that converted the React application into a single deployable Swimlane widget file with Tailwind styles transformed to global CSS rules.',
          variants: ALL_IC,
        },
        {
          text: 'Engineered a dual-language rules engine with a TypeScript implementation converted to a Python Swimlane action script, with parity guaranteed by a custom test system that ran a unified set of test cases against both language implementations.',
          variants: ALL_IC,
        },
        {
          text: 'Built a local Swimlane widget previewer and an end-to-end testing framework, enabling rapid iteration and quality assurance without dependency on the production environment.',
          variants: ALL_IC,
        },
        {
          text: 'Spearheaded the design of a shared Python SDK consumed across Python projects and Databricks, built on abstract base classes with standardized request/response models and CRUD interfaces — delivering predictable APIs that encourage code reuse across Python solutions and enabling extensibility through simple ABC extension.',
          variants: ALL_IC,
        },
        {
          text: 'Mentored SOC developers on agile practices and CI pipeline design, improving automated testing adoption across multiple repositories.',
          variants: [V.Universal],
        },
        {
          text: 'Spearheaded an Engineering Excellence initiative across CyberDefense, establishing end-to-end SDLC processes including quarterly planning mapped to Jira epics and stories — standardizing methodology across engineering teams and enabling uniform metrics tracking at both the team and program level.',
          variants: [V.SeniorManager, V.PrincipalIC],
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['JavaScript', 'Python', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS'] },
        { heading: 'DevOps & Infrastructure', items: ['CI/CD', 'Git', 'Swimlane', 'Databricks'] },
      ],
    },
    {
      company: 'Expel',
      title: 'Senior Engineering Manager',
      startDate: new Date(2022, 7),
      endDate: new Date(2025, 5),
      location: 'Remote',
      keyPoints: [
        {
          text: 'Led remote team supporting the SOC and platform infrastructure.',
          variants: [V.SeniorManager],
        },
        {
          text: 'Created custom operational workflows to maintain SLA compliance during significant alert volume increases.',
          variants: [V.SeniorManager, V.PrincipalIC],
        },
        {
          text: 'Built an Angular metrics dashboard initially as a local tool to automate personal weekly metrics reports; due to high demand, containerized it with Docker Compose, deployed it to Kubernetes using Terraform and Argo CD, and made it available organization-wide as an Okta card — earning personal recognition from the CEO.',
          variants: [V.Universal],
        },
        {
          text: 'Designed and built a dashboard designer that let users query Jira via JQL filters, transform results using AlaSQL queries, and render dynamic charts with the Google Charts API — saved as drag-and-drop widget components composable into custom dashboards.',
          variants: ALL_IC,
        },
        {
          text: 'Personally delivered a new JSON viewer React component by integrating Monaco Editor, providing search, collapsing, and syntax highlighting that directly reduced MTTX by eliminating a key friction point in analyst investigation workflows.',
          variants: ALL_IC,
        },
        {
          text: 'Conceived and prototyped an alert view template designer that replaced hard-coded views with a configurable layout system, then helped implement it — enabling rapid prototyping and significantly reducing time to ship template changes to production.',
          variants: ALL_IC,
        },
        {
          text: 'Improved MTTR through direct collaboration with SOC analysts to identify and eliminate workflow bottlenecks.',
          variants: [V.SeniorManager, V.PrincipalIC, V.StaffIC],
        },
        {
          text: 'Launched a tech-debt rotation program that reduced build instability, freeing engineers to focus on feature delivery.',
          variants: [V.SeniorManager, V.StaffIC, V.PrincipalIC],
        },
        {
          text: 'Promoted 4 engineers by building structured career development plans aligned with company promotion frameworks.',
          variants: [V.SeniorManager],
        },
      ],
      promotedFrom: [
        {
          company: 'Expel',
          title: 'Engineering Manager',
          startDate: new Date(2022, 0),
          endDate: new Date(2022, 7),
          location: 'Remote',
          keyPoints: [
            {
              text: 'Led remote team focused on SOC support and developer experience.',
              variants: [V.SeniorManager],
            },
            {
              text: 'Partnered with SOC leadership to surface metrics that proved a direct correlation between team output and analyst efficiency, securing continued investment in the team.',
              variants: [V.SeniorManager, V.PrincipalIC],
            },
            {
              text: 'Applied training from Manager Tools to deliver effective feedback to direct reports and foster team growth.',
              variants: [V.SeniorManager],
            },
            {
              text: 'Partnered with Director of Engineering to hire new team members for the Analyst Experience (AX) team. Grew the team by 4 members.',
              variants: [V.SeniorManager]
            },
            {
              text: 'Assisted the Director of Engineering with reporting project status, team metrics, and planning goals before I wrote my metrics app.',
              variants: [V.SeniorManager]
            },
          ],
          technicalSkills: [
            { heading: 'Languages & Frameworks', items: ['TypeScript', 'JavaScript'] },
            { heading: 'Tools & Methodologies', items: ['Jira', 'Agile', 'Scrum'] },
          ],
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['TypeScript', 'JavaScript', 'Angular'] },
        { heading: 'Libraries & APIs', items: ['Chart.js', 'AlaSQL', 'Google Charts API'] },
        { heading: 'DevOps & Infrastructure', items: ['GCP', 'Docker', 'Kubernetes', 'Terraform', 'Argo CD', 'CI/CD', 'Git'] },
        { heading: 'Tools & Methodologies', items: ['Jira', 'JQL', 'Agile', 'Scrum', 'DORA Metrics', 'Okta'] },
      ],
    },
    {
      company: 'Swimlane',
      title: 'Engineering Manager',
      startDate: new Date(2021, 2),
      endDate: new Date(2022, 0),
      location: 'Remote',
      keyPoints: [
        {
          text: 'Managed 7 direct reports while collaborating extensively with an international team based in Costa Rica.',
          variants: [V.SeniorManager],
        },
        {
          text: 'Drove alignment between product leadership and engineering by co-owning backlog grooming and ensuring engineers had clear, prioritized work at all times.',
          variants: [V.SeniorManager, V.PrincipalIC],
        },
        {
          text: 'Assisted team with iterating and improving on CI/CD pipelines to ensure optimal performance.',
          variants: [V.Universal],
        },
        {
          text: 'Mentored individual contributors through regular 1-on-1s to track progress on personal development goals.',
          variants: [V.SeniorManager],
        },
      ],
      promotedFrom: [
        {
          company: 'Swimlane',
          title: 'Senior Backend Engineer',
          startDate: new Date(2019, 5),
          endDate: new Date(2021, 2),
          location: 'Remote',
          keyPoints: [
            {
              text: 'Worked closely with product management to translate designs into technical acceptance criteria and designed data models for front end consumption.',
              variants: ALL_IC,
            },
            {
              text: 'Designed condition builder APIs and an analysis algorithm that powered a major new platform feature from concept to production.',
              variants: ALL_IC,
            },
            {
              text: 'Built a load and performance testing framework with Artillery and reusable YAML templates, enabling automated performance testing.',
              variants: ALL_IC,
            },
            {
              text: 'Added to the unit, integration, and end-to-end test suites for all new and existing features.',
              variants: ALL_IC,
            },
            {
              text: 'Built a complete mock of a high-value customer integration point for the end-to-end test suite, enabling regression detection across integration paths and directly contributing to customer retention.',
              variants: ALL_IC,
            },
          ],
          technicalSkills: [
            { heading: 'Languages & Frameworks', items: ['C#', 'Node.js', 'Python', 'TypeScript'] },
            { heading: 'Backend & Data', items: ['MongoDB', 'REST APIs'] },
            { heading: 'DevOps & Infrastructure', items: ['Artillery', 'CI/CD', 'Docker'] },
          ],
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['TypeScript', 'JavaScript', 'C#', 'Python', 'Node.js'] },
        { heading: 'Backend & Data', items: ['MongoDB', 'REST APIs'] },
        { heading: 'DevOps & Infrastructure', items: ['Docker', 'Kubernetes', 'CI/CD', 'Git'] },
      ],
    },
    {
      company: 'COFENSE',
      title: 'Software Engineer II',
      startDate: new Date(2017, 7),
      endDate: new Date(2019, 5),
      location: 'Remote',
      keyPoints: [
        {
          text: 'Developed new features for and maintained the Cofense Reporter product end-to-end, shipping integrations across Outlook, Outlook for Web, and mobile platforms.',
          variants: [V.Universal],
        },
        {
          text: 'Developed COM add-ins for Microsoft Office, Chrome extensions, Office 365 (O365) add-ins, and Google Apps Script automations to extend Reporter across client platforms.',
          variants: ALL_IC,
        },
        {
          text: 'Rewrote the Outlook for Web integration from an unmaintainable codebase into a modular, optimized architecture.',
          variants: ALL_IC,
        },
        {
          text: 'Reduced phishing reporting times by 25% by modernizing the .NET backend with asynchronous patterns.',
          variants: ALL_IC,
        },
        {
          text: 'Saved a major client contract by diagnosing and resolving a critical bug in the Java implementation.',
          variants: [V.Universal],
        },
        {
          text: 'Created a shared .NET library that eliminated redundant code across implementations and achieved full feature parity, significantly accelerating development velocity.',
          variants: ALL_IC,
        },
        {
          text: 'Built GitLab CI/CD pipelines from scratch using GitLab Runners in the company GitLab environment; established automated test suites and increased code coverage from 0% to 80%.',
          variants: [V.Universal],
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', '.NET', '.NET Framework', 'TypeScript', 'JavaScript', 'Java'] },
        { heading: 'DevOps & Infrastructure', items: ['CI/CD', 'Git', 'GitLab CI', 'GitLab Runners'] },
        { heading: 'Integrations', items: ['COM add-ins', 'Chrome extensions', 'Office 365 add-ins', 'Google Apps Script'] },
      ],
    },
    {
      company: 'Harrity & Harrity, LLP',
      title: 'Software Architect (Freelance)',
      startDate: new Date(2018, 2),
      endDate: new Date(2019, 3),
      location: 'Remote',
      keyPoints: [
        {
          text: 'Built Express microservices from scratch in Node.js that served as API interfaces for NLP systems, automating patent litigation processing from within Microsoft Word and replacing manual document workflows.',
          variants: ALL_IC,
        },
        {
          text: 'Architected a dependency-injection-style plugin framework from the ground up that made MS Word add-in integrations extensible and reusable across the firm.',
          variants: ALL_IC,
        },
        {
          text: 'Created a shared .NET class library from scratch, reusable across all plugins in the system, promoting code reuse and consistency across the plugin architecture.',
          variants: ALL_IC,
        },
        {
          text: 'Assisted with implementation of text parsing and processing of patent literature, accelerating patent documentation workflows.',
          variants: ALL_IC,
        },
        {
          text: 'Developed COM add-ins for Microsoft Office, Office 365 (O365) add-ins to integrate with document workflows.',
          variants: ALL_IC,
        },
        {
          text: 'Introduced and built CI/CD pipelines from the ground up across the firm\'s repositories, establishing automated build and deployment processes where none existed.',
          variants: [V.Universal],
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', '.NET', 'JavaScript', 'TypeScript', 'Node.js'] },
        { heading: 'Backend & Data', items: ['Express', 'Microservices', 'REST APIs'] },
        { heading: 'DevOps & Infrastructure', items: ['CI/CD', 'Git'] },
        { heading: 'Integrations', items: ['COM add-ins', 'Office 365 add-ins'] },
      ],
    },
    {
      company: 'Deltek',
      title: 'Senior Software Engineer',
      contract: true,
      startDate: new Date(2016, 4),
      endDate: new Date(2017, 7),
      location: 'Herndon, Virginia, United States',
      keyPoints: [
        {
          text: 'Joined the architecture team helping build a modern web application to integrate Deltek products into a single web interface.',
          variants: ALL_IC,
        },
        {
          text: 'Led the Dashboard Designer initiative from kickoff through on-schedule delivery, coordinating a team of developers.',
          variants: [V.Universal],
        },
        {
          text: 'Implemented multifactor authentication with QR code generation.',
          variants: ALL_IC,
        },
        {
          text: 'Built reusable UI components as part of a shared design system used across the product surface, improving consistency and developer productivity.',
          variants: ALL_IC,
        },
        {
          text: 'Designed and implemented a custom licensing analysis engine in C# that evaluated user license strings using a query-style syntax to determine feature access.',
          variants: ALL_IC,
        },
        {
          text: 'Authored the project\'s first end-to-end test suite using Nightwatch.js, providing automated UI regression coverage for critical flows.',
          variants: ALL_IC,
        },
        {
          text: 'Introduced Gulp and Node.js build automation for linting, Sass compilation, and documentation, streamlining the developer workflow.',
          variants: ALL_IC,
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', 'JavaScript', 'TypeScript', 'Angular', 'CanJS', 'Node.js'] },
        { heading: 'Frontend', items: ['HTML', 'CSS', 'Sass'] },
        { heading: 'Backend & Data', items: ['.NET Web API', 'REST APIs', 'Entity Framework', 'SQL Server'] },
        { heading: 'DevOps & Infrastructure', items: ['Nightwatch.js', 'Gulp', 'CI/CD'] },
      ],
    },
    {
      company: 'Defense Health Agency',
      title: 'Mid-Level Software Engineer',
      contract: true,
      startDate: new Date(2015, 0),
      endDate: new Date(2016, 4),
      location: 'Centreville, Virginia, United States',
      keyPoints: [
        {
          text: 'Developed full-stack features for HAIMS, the largest healthcare artifact repository in the United States, serving active-duty military and veterans.',
          variants: ALL_IC,
        },
        {
          text: 'Promoted from Junior to Mid-Level Software Engineer and stepped into Team Lead when the position became vacant, successfully leading the team through an API delivery for external healthcare providers.',
          variants: [V.Universal],
        },
        {
          text: 'Engineered a custom MVC framework in jQuery to bring structured UI patterns to the application after AngularJS was ruled out due to organizational and infrastructure constraints in the government environment.',
          variants: ALL_IC,
        },
        {
          text: 'Wrote SQL queries, stored procedures, and indexes to support application features, interfacing with the database layer in C# via Entity Framework and LINQ.',
          variants: ALL_IC,
        },
        {
          text: 'Introduced SignalR for real-time messaging, giving users system alerts and notifications they previously had no way to receive.',
          variants: ALL_IC,
        },
        {
          text: "Led the design and delivery of a new API for external healthcare providers to submit artifacts to HAIMS, expanding the system's interoperability.",
          variants: ALL_IC,
        },
        {
          text: 'Launched a weekly brown bag series focused on jQuery plugin development and JavaScript best practices, mentoring engineers across the team.',
          variants: [V.Universal],
        },
        {
          text: 'Participated in multi-agency design sessions with government stakeholders from all branches of the military to define new web service requirements and system integrations.',
          variants: [V.Universal],
        },
        {
          text: 'Gained domain expertise in healthcare interoperability standards including DICOM (Digital Imaging and Communications in Medicine) and HL7 (Health Level Seven).',
          variants: ALL_IC,
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', '.NET', 'JavaScript', 'jQuery', 'SQL'] },
        { heading: 'Backend & Data', items: ['Entity Framework', 'LINQ', 'SQL Server', 'Stored Procedures', 'SignalR', 'REST APIs'] },
        { heading: 'Frontend', items: ['HTML', 'CSS'] },
        { heading: 'Standards & Protocols', items: ['DICOM', 'HL7', 'Section 508'] },
      ],
    },
    {
      company: 'USDA',
      title: 'Software Developer',
      contract: true,
      startDate: new Date(2013, 10),
      endDate: new Date(2015, 0),
      location: 'Washington DC',
      keyPoints: [
        {
          text: 'Developed full-stack features for PHIS (Public Health Information System) used by food safety inspectors nationwide.',
          variants: [V.Universal],
        },
        {
          text: 'Designed the Export module database schema, using normalized table structures with reference tables and enum-like values to support fully dynamic data requirements without schema changes, enabling extensibility as new export types were introduced.',
          variants: ALL_IC,
        },
        {
          text: 'Standardized frontend development by creating reusable jQuery plugins and a common AJAX API, reducing duplicated code across the application.',
          variants: ALL_IC,
        },
        {
          text: 'Co-led the migration from a legacy .NET Framework and ORM to Entity Framework, modernizing the data access layer.',
          variants: ALL_IC,
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', '.NET Framework', 'JavaScript', 'jQuery', 'SQL'] },
        { heading: 'Backend & Data', items: ['Entity Framework', 'WCF', 'REST APIs'] },
      ],
    },
    {
      company: 'United Association',
      title: 'Software Developer',
      contract: true,
      startDate: new Date(2013, 0),
      endDate: new Date(2013, 10),
      location: 'Annapolis, Maryland, United States',
      keyPoints: [
        {
          text: 'Built a staffing prediction system for forecasting welder staffing needs on upcoming projects.',
          variants: [V.Universal],
        },
        {
          text: 'Developed a seminar registration system that streamlined workforce training enrollment.',
          variants: ALL_IC,
        },
        {
          text: 'Converted legacy projects to ASP.NET MVC, improving code structure and long-term maintainability.',
          variants: ALL_IC,
        },
      ],
      technicalSkills: [
        { heading: 'Languages & Frameworks', items: ['C#', 'ASP.NET MVC', 'JavaScript', 'SQL'] },
        { heading: 'Backend & Data', items: ['Entity Framework', 'LINQ', 'WCF', 'REST APIs'] },
      ],
    },
  ],
  education: [
    {
      school: 'George Mason University',
      degree: "Bachelor's degree",
      startDate: new Date(2007, 7),
      endDate: new Date(2009, 4),
      honors: 'Cum Laude',
    },
    {
      school: 'Laurel Ridge Community College',
      degree: 'Associate of Arts and Sciences (AAS)',
      startDate: new Date(2005, 7),
      endDate: new Date(2007, 4),
    },
  ],
};
