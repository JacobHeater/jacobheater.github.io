export interface ExperienceRole {
  title: string;
  timeInRole: string;
  description?: string;
}

export interface ExperienceData {
  company: string;
  location: string;
  roles: ExperienceRole[];
}

export const experienceData: ExperienceData[] = [
  {
    company: 'Expel',
    location: 'Remote',
    roles: [
      {
        title: 'Senior Engineering Manager',
        timeInRole: '08/2022 - Present',
        description: `
## Responsibilities

- Lead a distributed, remote team of 6 direct reports.
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
- Created several new processes with the SOC stakeholders that created dedicated
  pathways for critical path work and long-term work. This resulted in a rapid
  the retention of two high value customers with the SOC directly correlating this
  process to the retention of these customers.
- Created a new engineering-wide process to reduce tech debt by rotating engineers
  from each delivery team into a tech debt and improvement team on a quarterly basis.
  This process resulted in meeting vulnerability SLAs and improving the overall
  security posture of the product. In addition, this team reduced build instability
  by 70% by reducing test flakiness resulting in predictable delivery of code.`.trim(),
      },
      {
        title: 'Engineering Manager',
        timeInRole: '01/2022 - 08/2022',
      },
    ],
  },
  {
    company: 'Swimlane',
    location: 'Remote',
    roles: [
      {
        title: 'Engineering Manager',
        timeInRole: '03/2021 - 01/2022',
      },
      {
        title: 'Senior Software Developer',
        timeInRole: '06/2019 - 03/2021',
      },
    ],
  },
  {
    company: 'Cofense (formerly PhishMe)',
    roles: [
      {
        title: 'Software Engineer II',
        timeInRole: '08/2017 - 06/2019',
      },
    ],
    location: 'Remote',
  },
  {
    company: 'Harrity and Harrity',
    roles: [
      {
        title: 'Software Architect Consultant',
        timeInRole: '03/2018 - 04/2019',
      },
    ],
    location: 'Remote',
  },
];
