export interface ExperienceBase {
  title: string;
  timeInRole: string;
}

export interface ExperienceData {
  company: string;
  title: string;
  timeInRole: string;
  location: string;
  description?: string;
  promotedFrom?: ExperienceBase[];
}

export const experienceData: ExperienceData[] = [
  {
    company: 'Expel',
    title: 'Senior Engineering Manager',
    timeInRole: '08/2022 - Present',
    location: 'Remote',
    promotedFrom: [
      {
        title: 'Engineering Manager',
        timeInRole: '01/2022 - 08/2022',
      },
    ],
    description: `
## Responsibilities

- Lead a team of 6 direct reports.
- Define and optimize agile workflows to improve team velocity, delivery consistency, and engineering morale.
- Utilize metrics to construct quarterly plans according to team capacity.
- Architect scalable solutions that anticipate customer growth and evolving SOC demands.
- Work directly with Expel's SOC to provide customers with industry-leading
  security operations.
- Collaborate with three different PM partners to ensure alignment across various product domains.

## Noteworthy Accomplishments

- Despite increasing customer base and alert volume, analyst headcount
  remained the same, and MTTX remained within SLOs.
- Rebuilt stakeholder trust by consistently delivering roadmap items on time and within budget. 
- Built an Angular-based engineering metrics dashboard integrated with Jira; adopted org-wide across 
  9 teams to improve delivery visibility and forecasting.
    `.trim(),
  },
  {
    company: 'Swimlane',
    title: 'Engineering Manager',
    timeInRole: '03/2021 - 01/2022',
    location: 'Remote',
    promotedFrom: [
      {
        title: 'Senior Software Developer',
        timeInRole: '06/2019 - 03/2021',
      },
    ],
  },
  {
    company: 'Cofense (formerly PhishMe)',
    title: 'Software Engineer II',
    timeInRole: '08/2017 - 06/2019',
    location: 'Remote',
  },
  {
    company: 'Harrity and Harrity',
    title: 'Software Architect Consultant',
    timeInRole: '03/2018 - 04/2019',
    location: 'Remote',
  },
];
