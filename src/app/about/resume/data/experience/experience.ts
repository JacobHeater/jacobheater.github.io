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
        timeInRole: '08/2022 - 06/2025',
        description: `
### **Responsibilities**

* Lead two distributed remote teams:
  * A 6-person team supporting the SOC.
  * A 3-person matrixed team focused on tech debt, developer experience, and platform security.
* Define and optimize agile workflows to boost velocity, delivery consistency, and morale.
* Use metrics to build quarterly plans aligned to team capacity.
* Architect scalable solutions anticipating customer growth and evolving SOC needs.
* Partner directly with the SOC to deliver industry-leading security operations.
* Coordinate with three PMs to ensure alignment across product domains.

### **Noteworthy Accomplishments**

* Created an urgent-ticket workflow—*Ludicrous Speed*—giving analysts direct access to engineers—helping maintain SLOs despite a 200% increase in alert volume.
* Rebuilt stakeholder trust by delivering roadmap items on time and prioritizing SOC needs.
* SOC partnership led to a 40% improvement in MTTR.
* Built an Angular-based metrics dashboard integrated with Jira; adopted across 9 teams to improve forecasting.
* Designed new intake paths for urgent and long-term SOC work, with key result of retaining two high-value customers.
* Introduced a quarterly tech-debt rotation program; resulted in meeting vuln SLAs, improving security posture, and reducing build flakiness by 70%.
* Implemented process and training to transform specialized engineers into full-stack team, ensuring consistent staffing and delivery times.
`.trim(),
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
