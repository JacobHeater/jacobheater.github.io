export interface IResume {
  fullName: string;
  location: string;
  emailAddress: string;
  linkedIn: string;
  website: string;
  professionalSummary: string;
  experience: IExperienceEntry[];
  technicalSkills: ITechnicalSkillEntry[];
  education: IEducationEntry[];
}

export interface IExperienceEntry {
  company: string;
  title: string;
  startDate: Date;
  endDate: Date | 'Present';
  location: string;
  keyPoints: string[];
  promotedFrom?: IExperienceEntry[];
}

export interface ITechnicalSkillEntry {
  heading: string;
  items: string[];
}

export interface IEducationEntry {
  school: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  honors?: string;
}