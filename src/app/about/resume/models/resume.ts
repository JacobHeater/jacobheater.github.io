export interface IResume {
  fullName: string;
  title: string;
  phoneNumber: string;
  location: string;
  publicEmailAddress: string;
  privateEmailAddress: string;
  linkedIn: string;
  github: string;
  website: string;
  professionalSummary: string;
  skills: ITechnicalSkillEntry[];
  experience: IExperienceEntry[];
  education: IEducationEntry[];
}

export interface IExperienceEntry {
  company: string;
  title: string;
  contract?: boolean;
  startDate: Date;
  endDate: Date | 'Present';
  location: string;
  keyPoints: string[];
  technicalSkills: ITechnicalSkillEntry[];
  /** When true, render as a single-line entry (title, company, dates) with no bullets or tech. Data is preserved. */
  condensed?: boolean;
}

export interface ITechnicalSkillEntry {
  heading: string;
  items: string[];
}

export interface IEducationEntry {
  school: string;
  degree: string;
  fieldOfStudy?: string;
  startDate: Date;
  endDate: Date;
  honors?: string;
}
