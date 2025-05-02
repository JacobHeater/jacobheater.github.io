import { TableColumn } from '../../components/table';

export const experienceColumns: TableColumn[] = [
  { displayText: 'Company', key: 'company' },
  { displayText: 'Title', key: 'title' },
  { displayText: 'Time in Role', key: 'timeInRole' },
  { displayText: 'Location', key: 'location' },
];

export const experienceData = [
  {
    company: 'Expel',
    title: 'Senior Engineering Manager - Promoted',
    timeInRole: '08/2022 - Present',
    location: 'Remote',
  },
  {
    company: 'Expel',
    title: 'Engineering Manager',
    timeInRole: '01/2022 - 08/2022',
    location: 'Remote',
  },
  {
    company: 'Swimlane',
    title: 'Engineering Manager - Promoted',
    timeInRole: '03/2021 - 01/2022',
    location: 'Remote',
  },
  {
    company: 'Swimlane',
    title: 'Senior Software Developer',
    timeInRole: '06/2019 - 03/2021',
    location: 'Remote',
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
  {
    company: 'Deltek',
    title: 'Senior Software Engineering Consultant',
    timeInRole: '05/2016 - 08/2017',
    location: 'Herndon, VA',
  },
  {
    company: 'Defense Health Agency (DHA)',
    title: 'Mid-level Software Engineering Consultant',
    timeInRole: '01/2015 - 05/2016',
    location: 'Centreville, VA',
  },
  {
    company: 'USDA',
    title: 'Software Developer',
    timeInRole: '11/2013 - 01/2015',
    location: 'Washington, DC',
  },
  {
    company: 'United Association',
    title: 'Software Developer',
    timeInRole: '01/2013 - 11/2013',
    location: 'Annapolis, MD',
  },
];
