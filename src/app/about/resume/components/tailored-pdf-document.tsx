import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';
import { ITailoredResume, ITailoredExperience } from '../tailor-resume';
import React from 'react';
import { formatDate, RESUME_LABELS } from '../resume-presentation';

const colors = {
  primary: '#007acc',
  secondary: '#005f99',
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
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
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

function ExperienceView({
  exp,
  isLast,
}: {
  exp: ITailoredExperience;
  isLast: boolean;
}) {
  return (
    <View
      style={isLast ? styles.companySectionLast : styles.companySection}
      wrap={false}>
      <View style={styles.experienceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.companyName}>{exp.company}</Text>
          <Text style={styles.experienceTitle}>{exp.title}</Text>
          {exp.contract ? (
            <Text style={styles.contractLabel}>{RESUME_LABELS.contract}</Text>
          ) : null}
          <Text style={styles.companyMeta}>{exp.location}</Text>
        </View>
        <Text style={styles.experienceDate}>
          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
        </Text>
      </View>

      {exp.keyPoints.length > 0 && (
        <View style={styles.bulletList}>
          {exp.keyPoints.map((point, idx) => (
            <View style={styles.bulletItem} key={idx}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      )}

      {exp.technologies.length > 0 && (
        <Text style={[styles.companyMeta, { marginTop: 4 }]}>
          {RESUME_LABELS.technologies}: {exp.technologies.join(', ')}
        </Text>
      )}
    </View>
  );
}

export default function TailoredPdfDocument({
  data,
}: {
  data: ITailoredResume;
}) {
  return (
    <Document
      title={`${data.fullName} - Tailored Resume`}
      author={data.fullName}
      subject="Tailored Professional Resume"
      keywords="software engineer, resume, tailored">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          <Text style={styles.subtitle}>{data.title}</Text>
          <Text style={styles.location}>{data.location}</Text>
          <View style={styles.contactLine}>
            <Text style={styles.contactText}>Email: </Text>
            <Link
              src={`mailto:${data.publicEmailAddress}`}
              style={styles.contactLink}>
              {data.publicEmailAddress}
            </Link>
            <Text style={styles.contactText}> | LinkedIn: </Text>
            <Link src={data.linkedIn} style={styles.contactLink}>
              linkedin.com/in/jacobheater
            </Link>
            <Text style={styles.contactText}> | Website: </Text>
            <Link src={data.website} style={styles.contactLink}>
              jacobheater.com
            </Link>
            <Text style={styles.contactText}> | GitHub: </Text>
            <Link src={data.github} style={styles.contactLink}>
              github.com/jacobheater
            </Link>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>{RESUME_LABELS.summary}</Text>
          {data.summary.split('\n\n').map((paragraph, idx) => (
            <Text key={idx} style={styles.summaryText}>
              {paragraph}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeading}>
            {RESUME_LABELS.technicalSkills}
          </Text>
          {data.skills.map((skill, idx) => (
            <Text style={styles.skillLine} key={idx}>
              <Text style={styles.skillHeading}>{skill.heading}: </Text>
              {skill.items.join(', ')}
            </Text>
          ))}
        </View>

        <View style={styles.section} break>
          <Text style={styles.sectionHeading}>
            {RESUME_LABELS.professionalExperience}
          </Text>
          {data.experience.map((exp, idx) => (
            <ExperienceView
              key={idx}
              exp={exp}
              isLast={idx === data.experience.length - 1}
            />
          ))}
        </View>

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
