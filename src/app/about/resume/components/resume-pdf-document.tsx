import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';
import { IResume, IExperienceEntry } from '../models/resume';
import React from 'react';
import {
  decodePhoneNumber,
  formatDate,
  RESUME_LABELS,
} from '../resume-presentation';

const colors = {
  gray800: '#1e293b',
  gray700: '#374151',
  gray600: '#4b5563',
  gray300: '#d1d5db',
  background: '#ffffff',
  foreground: '#000000',
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: colors.foreground,
    backgroundColor: colors.background,
  },
  header: {
    marginBottom: 14,
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
    marginBottom: 2,
  },
  location: {
    fontSize: 8,
    color: colors.gray700,
    marginBottom: 6,
  },
  contactLine: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    gap: 2,
  },
  contactText: {
    fontSize: 8,
    color: colors.gray800,
    lineHeight: 1.35,
  },
  contactLink: {
    fontSize: 8,
    color: colors.gray800,
    textDecoration: 'none',
    lineHeight: 1.35,
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray300,
  },
  section: {
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.gray800,
  },
  skillLine: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: colors.gray800,
    marginBottom: 3,
  },
  skillHeading: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray800,
  },
  roleSection: {
    marginBottom: 9,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray300,
  },
  roleSectionLast: {
    marginBottom: 9,
    paddingBottom: 5,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  roleTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
  },
  roleCompany: {
    fontSize: 8.5,
    color: colors.gray700,
    marginTop: 1,
  },
  roleDate: {
    fontSize: 8,
    color: colors.gray700,
  },
  bulletList: {
    marginTop: 2,
    paddingLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 1.5,
  },
  bullet: {
    width: 8,
    fontSize: 8,
    color: colors.gray800,
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.4,
    color: colors.gray800,
  },
  // Condensed one-liner styles
  condensedEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  condensedTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
  },
  condensedCompany: {
    fontSize: 9,
    color: colors.gray700,
  },
  condensedDate: {
    fontSize: 8,
    color: colors.gray700,
  },
  // Education
  educationEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 4,
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
  },
  educationSchool: {
    fontSize: 8,
    color: colors.gray700,
  },
  educationHonors: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray800,
  },
  educationDate: {
    fontSize: 8,
    color: colors.gray600,
  },
});

function ContactItem({ label, href }: { label: string; href: string }) {
  return (
    <Link src={href} style={styles.contactLink}>{label}</Link>
  );
}

function ContactLine({ data, includePhone }: { data: IResume; includePhone: boolean }) {
  const phoneNumber = decodePhoneNumber(data.phoneNumber);

  return (
    <View style={styles.contactLine}>
      <Text style={styles.contactText}>{RESUME_LABELS.email}: </Text>
      <ContactItem label={data.privateEmailAddress} href={`mailto:${data.privateEmailAddress}`} />
      {includePhone && (
        <>
          <Text style={styles.contactText}> | {RESUME_LABELS.phone}: </Text>
          <ContactItem label={phoneNumber} href={`tel:${phoneNumber}`} />
        </>
      )}
      <Text style={styles.contactText}> | {RESUME_LABELS.linkedIn}: </Text>
      <ContactItem label="linkedin.com/in/jacobheater" href={data.linkedIn} />
      <Text style={styles.contactText}> | {RESUME_LABELS.website}: </Text>
      <ContactItem label="jacobheater.com" href={data.website} />
      <Text style={styles.contactText}> | {RESUME_LABELS.github}: </Text>
      <ContactItem label="github.com/jacobheater" href={data.github} />
    </View>
  );
}

function FullRoleEntry({ entry, isLast }: { entry: IExperienceEntry; isLast: boolean }) {
  return (
    <View style={isLast ? styles.roleSectionLast : styles.roleSection}>
      <View style={styles.roleHeader} wrap={false}>
        <View style={{ flex: 1 }}>
          <Text style={styles.roleTitle}>{entry.title}</Text>
          <Text style={styles.roleCompany}>
            {entry.company}{entry.contract ? ` — ${RESUME_LABELS.contract}` : ''}
          </Text>
        </View>
        <Text style={styles.roleDate}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </Text>
      </View>

      {entry.keyPoints.length > 0 && (
        <View style={styles.bulletList}>
          {entry.keyPoints.map((point, idx) => (
            <View style={styles.bulletItem} key={idx}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function CondensedRoleEntry({ entry }: { entry: IExperienceEntry }) {
  return (
    <View style={styles.condensedEntry} wrap={false}>
      <Text>
        <Text style={styles.condensedTitle}>{entry.title}</Text>
        <Text style={styles.condensedCompany}> — {entry.company}</Text>
      </Text>
      <Text style={styles.condensedDate}>
        {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
      </Text>
    </View>
  );
}

export default function ResumePdfDocument({
  data,
  includePhone = false,
}: {
  data: IResume;
  includePhone?: boolean;
}) {
  const featuredRoles = data.experience.filter(e => !e.condensed);
  const condensedRoles = data.experience.filter(e => e.condensed);

  return (
    <Document
      title={`${data.fullName} - Resume`}
      author={data.fullName}
      subject="Professional Resume"
      keywords="staff software engineer, TypeScript, React, Node.js, C#, Python, AWS, Docker, Kubernetes, SOAR, cybersecurity">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          <Text style={styles.subtitle}>{data.title}</Text>
          <Text style={styles.location}>{data.location}</Text>
          <ContactLine data={data} includePhone={includePhone} />
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.summary}</Text>
          <Text style={styles.summaryText}>{data.professionalSummary}</Text>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.technicalSkills}</Text>
          <View>
            {data.skills.map((skill, idx) => (
              <Text style={styles.skillLine} key={idx}>
                <Text style={styles.skillHeading}>{skill.heading}: </Text>
                {skill.items.join(', ')}
              </Text>
            ))}
          </View>
        </View>

        {/* Professional Experience — Featured Roles */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.professionalExperience}</Text>
          {featuredRoles.map((entry, idx) => (
            <FullRoleEntry key={idx} entry={entry} isLast={idx === featuredRoles.length - 1} />
          ))}
        </View>

        {/* Earlier Experience — Condensed */}
        {condensedRoles.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>{RESUME_LABELS.earlierExperience}</Text>
            {condensedRoles.map((entry, idx) => (
              <CondensedRoleEntry key={idx} entry={entry} />
            ))}
          </View>
        )}

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.education}</Text>
          {data.education.map((edu, idx) => (
            <View style={styles.educationEntry} key={idx} wrap={false}>
              <View>
                <Text style={styles.educationDegree}>{edu.degree}</Text>
                <Text style={styles.educationSchool}>{edu.school}</Text>
                {edu.honors && (
                  <Text style={styles.educationHonors}>{edu.honors}</Text>
                )}
              </View>
              <Text style={styles.educationDate}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
