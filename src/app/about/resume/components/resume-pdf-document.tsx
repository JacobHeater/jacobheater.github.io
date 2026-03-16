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
  aggregateSkills,
  collectUniqueTechnologies,
  CompanyExperienceGroup,
  decodePhoneNumber,
  formatDate,
  groupExperienceByCompany,
  RESUME_LABELS,
  resolveKeyPoints,
  resolveLinkedInSummary,
  resolveLinkedInTitle,
} from '../resume-presentation';

// Light-mode colors from globals.css
const colors = {
  primary: '#007acc',
  secondary: '#005f99',
  job: '#263365',
  gray800: '#1e293b',
  gray700: '#374151',
  gray600: '#4b5563',
  gray300: '#d1d5db',
  gray100: '#f3f4f6',
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
    marginBottom: 16,
    paddingBottom: 10,
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
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.gray800,
    marginBottom: 6,
  },
  skillLine: {
    fontSize: 8.5,
    lineHeight: 1.4,
    color: colors.gray800,
    marginBottom: 4,
  },
  skillHeading: {
    fontSize: 8.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray800,
  },
  companySection: {
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray300,
  },
  companySectionLast: {
    marginBottom: 10,
    paddingBottom: 6,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  companyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
  },
  companyMeta: {
    fontSize: 8,
    color: colors.gray700,
  },
  roleEntry: {
    marginBottom: 6,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.foreground,
  },
  contractLabel: {
    marginTop: 4,
    fontSize: 8,
    color: colors.foreground,
  },
  experienceDate: {
    fontSize: 8,
    color: colors.gray700,
  },
  bulletList: {
    marginTop: 3,
    paddingLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 2,
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
  educationEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 6,
    marginBottom: 6,
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

function SummaryParagraphs({ text }: { text: string }) {
  return (
    <>
      {text.split('\n\n').map((paragraph, index) => (
        <Text key={index} style={styles.summaryText}>{paragraph}</Text>
      ))}
    </>
  );
}

function RoleEntryView({ entry }: { entry: IExperienceEntry }) {
  return (
    <View style={styles.roleEntry} wrap={false}>
      <View style={styles.experienceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.experienceTitle}>{entry.title}</Text>
          {entry.contract ? <Text style={styles.contractLabel}>{RESUME_LABELS.contract}</Text> : null}
        </View>
        <Text style={styles.experienceDate}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </Text>
      </View>

      {entry.keyPoints && entry.keyPoints.length > 0 && (() => {
        const filtered = resolveKeyPoints(entry.keyPoints);
        return filtered.length > 0 ? (
          <View style={styles.bulletList}>
            {filtered.map((point, idx) => (
              <View style={styles.bulletItem} key={idx}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{point.text}</Text>
              </View>
            ))}
          </View>
        ) : null;
      })()}

      {entry.technicalSkills.length > 0 && (
        <Text style={[styles.companyMeta, { marginTop: 4 }]}>{RESUME_LABELS.technologies}: {collectUniqueTechnologies(entry).join(', ')}</Text>
      )}
    </View>
  );
}

function CompanyExperienceView({ group, isLast }: { group: CompanyExperienceGroup; isLast: boolean }) {
  const totalStartDate = group.roles.reduce(
    (earliest, role) => (role.startDate < earliest ? role.startDate : earliest),
    group.roles[0].startDate,
  );
  const currentRole = group.roles[0];

  return (
    <View style={isLast ? styles.companySectionLast : styles.companySection} wrap={false}>
      <View style={styles.companyHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.companyName}>{group.company}</Text>
          <Text style={styles.companyMeta}>{group.location || currentRole.location}</Text>
        </View>
        <Text style={styles.experienceDate}>
          {formatDate(totalStartDate)} – {formatDate(currentRole.endDate)}
        </Text>
      </View>

      {group.roles.map((role, idx) => (
        <RoleEntryView key={idx} entry={role} />
      ))}
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
  const variantTitle = resolveLinkedInTitle(data);
  const variantSummary = resolveLinkedInSummary(data);
  const allSkills = aggregateSkills(data.experience);
  const experienceGroups = groupExperienceByCompany(data.experience);

  return (
    <Document
      title={`${data.fullName} - Resume`}
      author={data.fullName}
      subject="Professional Resume"
      keywords="software engineer, resume, principal engineer">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.subtitle}>{variantTitle}</Text>
            <Text style={styles.location}>{data.location}</Text>
            <ContactLine data={data} includePhone={includePhone} />
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.summary}</Text>
          <SummaryParagraphs text={variantSummary} />
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.technicalSkills}</Text>
          <View>
            {allSkills.map((skill, idx) => (
              <Text style={styles.skillLine} key={idx}>
                <Text style={styles.skillHeading}>{skill.heading}: </Text>
                {skill.items.join(', ')}
              </Text>
            ))}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.professionalExperience}</Text>
          {experienceGroups.map((group, idx) => (
            <CompanyExperienceView key={idx} group={group} isLast={idx === experienceGroups.length - 1} />
          ))}
        </View>

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
