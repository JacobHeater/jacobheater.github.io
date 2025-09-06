import { IResume } from "../../models/resume";

export const resume: IResume = {
  fullName: 'Jacob Heater',
  location: 'Washington DC Metro Area',
  publicEmailAddress: 'jacob.resume.contact@proton.me',
  privateEmailAddress: 'jacobheater@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/jacobheater',
  website: 'https://jacobheater.com',
  professionalSummary: `Leveraging over a decade of experience, I am a Full-Stack Engineer specializing in the architecture and scaling of sophisticated software solutions spanning multiple industries. My deep technical proficiency covers modern web frameworks, resilient backend systems, cloud infrastructure, and efficient CI/CD pipelines, promoting seamless product delivery. I am adept at leading initiatives from concept through production, consistently achieving a balance of velocity, quality, and maintainability to meet defined business requirements. My contributions extend beyond coding; I apply learned leadership principles to mentor engineers, optimize team workflows, and ensure technical roadmaps integrate tightly with overarching business strategies, driving impactful results in any organizational context.`,
  experience: [
    {
      company: 'CVS Health',
      title: 'Software Engineering Consultant (Contract)',
      startDate: new Date(2025, 7),
      endDate: 'Present',
      location: 'Remote',
      keyPoints: [
        'Building software development processes for SOC Triage engineering team.',
        'Designing SOAR components to automate SOC workflows.',
        'Designing internal alert enrichment tools and creating architecture diagrams.',
      ],
    },
    {
      company: 'Expel',
      title: 'Senior Engineering Manager',
      startDate: new Date(2022, 7),
      endDate: new Date(2025, 5),
      location: 'Remote',
      keyPoints: [
        'Led two remote teams supporting the SOC and platform infrastructure.',
        "Created 'Ludicrous Speed' workflow, improving SLAs during 200% alert volume spike.",
        'Built Angular metrics dashboard adopted by nine teams.',
        'Improved MTTR by 40% through SOC collaboration.',
        'Launched tech-debt rotation reducing build instability by 70%.',
      ],
      promotedFrom: [
        {
          company: 'Expel',
          title: 'Engineering Manager',
          startDate: new Date(2022, 0),
          endDate: new Date(2022, 7),
          location: 'Remote',
          keyPoints: [
            'Led two remote teams focused on SOC support and developer experience.',
            'Implemented quarterly capacity-based planning with cross-domain alignment.',
            'Rebuilt stakeholder trust via consistent roadmap delivery.',
          ],
        },
      ],
    },
    {
      company: 'Swimlane',
      title: 'Engineering Manager',
      startDate: new Date(2021, 2),
      endDate: new Date(2022, 0),
      location: 'Remote',
      keyPoints: [
        'Established relationship-based management and agile delivery processes.',
        'Conducted all ceremonies per Scrum methodology.',
      ],
      promotedFrom: [
        {
          company: 'Swimlane',
          title: 'Senior Software Developer',
          startDate: new Date(2019, 5),
          endDate: new Date(2021, 2),
          location: 'Remote',
          keyPoints: [
            'Led backend development using C#, Node.js, MongoDB, Python.',
            'Handled escalations and contributed to on-call support rotations.',
          ],
        },
      ],
    },
    {
      company: 'COFENSE',
      title: 'Software Engineer II',
      startDate: new Date(2017, 7),
      endDate: new Date(2019, 5),
      location: 'Remote',
      keyPoints: [
        'Built phishing report plugins for Gmail and Office365.',
        'Introduced CI pipelines across button product line.',
        'Converted JS to TypeScript, enhancing maintainability.',
      ],
    },
    {
      company: 'Harrity & Harrity, LLP',
      title: 'Software Architect (Freelance)',
      startDate: new Date(2018, 2),
      endDate: new Date(2019, 3),
      location: 'Remote',
      keyPoints: [
        'Designed REST APIs with Node.js and Express.',
        'Enabled NLP-driven document generation in MS Office plugins.',
        'Created extensible plugin frameworks for legal templates.',
      ],
    },
    {
      company: 'Deltek',
      title: 'Senior Software Engineer (Contract)',
      startDate: new Date(2016, 4),
      endDate: new Date(2017, 7),
      location: 'Herndon, Virginia, United States',
      keyPoints: [
        'Contributed to JS design system using CanJS.',
        'Built E2E testing framework using Selenium and ChromeDriver.',
        'Maintained backend C#/VB.NET APIs.',
      ],
    },
    {
      company: 'Defense Health Agency',
      title: 'Mid-Level Software Engineer (Contract)',
      startDate: new Date(2015, 0),
      endDate: new Date(2016, 4),
      location: 'Centreville, Virginia, United States',
      keyPoints: [
        'Developed full-stack apps with C#.NET, jQuery, T-SQL.',
        'Designed WCF duplex services and implemented SignalR.',
        'Standardized military web APIs and contracts.',
      ],
    },
    {
      company: 'USDA',
      title: 'Software Developer (Contract)',
      startDate: new Date(2013, 10),
      endDate: new Date(2015, 0),
      location: 'Washington DC',
      keyPoints: [
        'Designed normalized databases, REST/SOAP APIs for new features.',
        'Created jQuery plugins for frontend reuse.',
      ],
    },
    {
      company: 'United Association',
      title: 'Software Developer (Contract)',
      startDate: new Date(2013, 0),
      endDate: new Date(2013, 10),
      location: 'Annapolis, Maryland, United States',
      keyPoints: [
        'Developed REST APIs with WCF, frontend with jQuery.',
        'Built internal apps for registration, staffing, and more.',
      ],
    },
  ],
  technicalSkills: [
    {
      heading: 'Languages & Frameworks',
      items: [
        'C#',
        '.NET Core',
        '.NET Framework',
        'Node.js',
        'Python',
        'JavaScript',
        'TypeScript',
        'SQL',
        'NoSQL',
      ],
    },
    {
      heading: 'Frontend Technologies',
      items: ['React', 'Angular', 'jQuery'],
    },
    {
      heading: 'Backend & API',
      items: ['Express', 'REST', 'SOAP', 'WCF', 'SignalR'],
    },
    {
      heading: 'DevOps & Infrastructure',
      items: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS', 'Azure'],
    },
    {
      heading: 'Tools & Methodologies',
      items: ['Jira', 'Agile', 'Scrum', 'TFS', 'Git'],
    },
  ],
  education: [
    {
      school: 'George Mason University',
      degree: "Bachelor's degree, Global Affairs",
      startDate: new Date(2007, 7),
      endDate: new Date(2009, 4),
      honors: 'Cum Laude',
    },
    {
      school: 'Laurel Ridge Community College',
      degree: 'Associate of Arts and Sciences - AAS, General Studies',
      startDate: new Date(2005, 7),
      endDate: new Date(2007, 4),
    },
  ],
};
