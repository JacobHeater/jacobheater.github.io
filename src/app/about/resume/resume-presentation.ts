import dayjs from 'dayjs';

export const RESUME_LABELS = {
  summary: 'Summary',
  technicalSkills: 'Technical Skills',
  professionalExperience: 'Professional Experience',
  education: 'Education',
  earlierExperience: 'Earlier Experience',
  technologies: 'Technologies',
  contract: 'Contract',
  email: 'Email',
  phone: 'Phone',
  linkedIn: 'LinkedIn',
  website: 'Website',
  github: 'GitHub',
} as const;

export function collectUniqueTechnologies(entry: { technicalSkills: { items: string[] }[] }): string[] {
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
