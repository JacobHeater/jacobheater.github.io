export interface IResume {
  fullName: string;
  title: ITitle[];
  location: string;
  publicEmailAddress: string;
  privateEmailAddress: string;
  linkedIn: string;
  github: string;
  website: string;
  professionalSummary: IProfessionalSummary[];
  experience: IExperienceEntry[];
  education: IEducationEntry[];
}

export enum IResumeVariant {
  Universal,
  SeniorIC,
  StaffIC,
  PrincipalIC,
  SeniorManager,
  LinkedIn
}

export interface IProfessionalSummary {
  text: string;
  variant: IResumeVariant;
}

export interface ITitle {
  variant: IResumeVariant;
  text: string;
}

export interface IExperienceKeyPoint {
  text: string;
  variants: IResumeVariant[];
}

export interface IExperienceEntry {
  company: string;
  title: string;
  startDate: Date;
  endDate: Date | 'Present';
  location: string;
  keyPoints: IExperienceKeyPoint[];
  promotedFrom?: IExperienceEntry[];
  technicalSkills: ITechnicalSkillEntry[];
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
