export interface EducationData {
  school: string;
  location: string;
  graduationYear: string;
  honors: string;
}

export const educationData: EducationData[] = [
  {
    school: 'George Mason University',
    location: 'Fairfax, VA',
    graduationYear: '2009',
    honors: 'Cum Laude',
  },
  {
    school: 'Lord Fairfax Community College',
    location: 'Middletown, VA',
    graduationYear: '2007',
    honors: '',
  },
];
