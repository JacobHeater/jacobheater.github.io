import dayjs from 'dayjs';
import { IExperienceEntry, IResume } from './models/resume';

export const RESUME_LABELS = {
  summary: 'Summary',
  technicalSkills: 'Technical Skills',
  professionalExperience: 'Professional Experience',
  education: 'Education',
  technologies: 'Technologies',
  contract: 'Contract',
  email: 'Email',
  phone: 'Phone',
  linkedIn: 'LinkedIn',
  website: 'Website',
  github: 'GitHub',
} as const;

export type CompanyExperienceGroup = {
  company: string;
  location: string;
  roles: IExperienceEntry[];
};

export function flattenExperienceRoles(entry: IExperienceEntry): IExperienceEntry[] {
  const promotedRoles = (entry.promotedFrom ?? []).flatMap(flattenExperienceRoles);
  return [entry, ...promotedRoles];
}

export function groupExperienceByCompany(entries: IExperienceEntry[]): CompanyExperienceGroup[] {
  return entries.map(entry => {
    const roles = flattenExperienceRoles(entry).sort((left, right) => {
      const leftDate = left.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : left.endDate.getTime();
      const rightDate = right.endDate === 'Present' ? Number.MAX_SAFE_INTEGER : right.endDate.getTime();

      if (leftDate !== rightDate) {
        return rightDate - leftDate;
      }

      return right.startDate.getTime() - left.startDate.getTime();
    });

    return {
      company: entry.company,
      location: entry.location,
      roles,
    };
  });
}

export function collectUniqueTechnologies(entry: IExperienceEntry): string[] {
  return Array.from(new Set(entry.technicalSkills.flatMap(skill => skill.items)));
}

export function decodePhoneNumber(rawPhoneNumber: string): string {
  const value = rawPhoneNumber.trim();

  if (/^[\d+()\-\s.]+$/.test(value)) {
    return value;
  }

  if (!/^[A-Za-z0-9+/=]+$/.test(value)) {
    return value;
  }

  try {
    const atobFn = typeof globalThis !== 'undefined' && typeof globalThis.atob === 'function'
      ? globalThis.atob.bind(globalThis)
      : null;

    if (!atobFn) {
      return value;
    }

    const decoded = atobFn(value).trim();

    if (/^[\d+()\-\s.]+$/.test(decoded)) {
      return decoded;
    }

    return value;
  } catch {
    return value;
  }
}

export function formatDate(date: Date | 'Present'): string {
  if (date === 'Present') {
    return date;
  }

  return dayjs(date).format('MMM YYYY');
}
