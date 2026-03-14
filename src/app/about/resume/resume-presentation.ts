import dayjs from 'dayjs';
import { IExperienceEntry, IExperienceKeyPoint, IResume, IResumeVariant } from './models/resume';

export const LINKEDIN_VARIANT = IResumeVariant.LinkedIn;

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

export function resolveLinkedInTitle(data: IResume): string {
  return data.title.find(t => t.variant === LINKEDIN_VARIANT)?.text ?? 'Software Engineer';
}

export function resolveLinkedInSummary(data: IResume): string {
  return data.professionalSummary.find(s => s.variant === LINKEDIN_VARIANT)?.text ?? '';
}

export function resolveKeyPoints(points: IExperienceKeyPoint[]): IExperienceKeyPoint[] {
  return points;
}

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

export function aggregateSkills(entries: IExperienceEntry[]): { heading: string; items: string[] }[] {
  const skillMap = new Map<string, Set<string>>();

  function collect(list: IExperienceEntry[]) {
    for (const entry of list) {
      for (const skill of entry.technicalSkills) {
        if (!skillMap.has(skill.heading)) {
          skillMap.set(skill.heading, new Set());
        }

        skill.items.forEach(item => skillMap.get(skill.heading)?.add(item));
      }

      if (entry.promotedFrom) {
        collect(entry.promotedFrom);
      }
    }
  }

  collect(entries);

  return Array.from(skillMap.entries())
    .map(([heading, items]) => ({
      heading,
      items: Array.from(items).sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.heading.localeCompare(b.heading));
}

export function formatSummaryText(text: string): string {
  return text.split('\n\n').map(paragraph => paragraph.trim()).join('\n\n');
}

export function formatExperienceText(entry: IExperienceEntry): string {
  const points = resolveKeyPoints(entry.keyPoints ?? []);
  return points.map(point => `• ${point.text.trim()}`).join('\n');
}

export function collectUniqueTechnologies(entry: IExperienceEntry): string[] {
  return Array.from(new Set(entry.technicalSkills.flatMap(skill => skill.items)));
}

export function decodePhoneNumber(rawPhoneNumber: string): string {
  const value = rawPhoneNumber.trim();

  // If it already looks like a normal phone value, use it as-is.
  if (/^[\d+()\-\s.]+$/.test(value)) {
    return value;
  }

  // Attempt base64 decode only when the payload shape is plausible.
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

    // Guard against decoding arbitrary text that is not a phone number.
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