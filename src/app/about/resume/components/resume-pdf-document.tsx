import {
  Document,
  Page,
  Text,
  View,
  Link,
  Svg,
  Path,
  StyleSheet,
} from '@react-pdf/renderer';
import { IResume, IExperienceEntry } from '../models/resume';
import dayjs from 'dayjs';

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
    paddingTop: 28,
    paddingBottom: 28,
    paddingHorizontal: 36,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: colors.foreground,
    backgroundColor: colors.background,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.job,
    marginBottom: 2,
  },
  location: {
    fontSize: 8,
    color: colors.gray700,
  },
  contactColumn: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactLink: {
    fontSize: 8,
    color: colors.gray800,
    textDecoration: 'none',
  },
  // Sections
  sectionHeading: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  section: {
    marginBottom: 12,
  },
  // Summary
  summaryText: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.gray800,
  },
  // Skills grid
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillCategory: {
    width: '31.5%',
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.gray100,
  },
  skillCategoryHeading: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: colors.primary,
    marginBottom: 4,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  skillTag: {
    fontSize: 7.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: colors.background,
    borderWidth: 0.5,
    borderColor: colors.gray300,
  },
  // Experience
  experienceEntry: {
    paddingLeft: 8,
    paddingVertical: 6,
    paddingRight: 6,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    backgroundColor: colors.gray100,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginBottom: 6,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.job,
  },
  experienceCompany: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  experienceLocation: {
    fontSize: 7,
    color: colors.gray600,
  },
  experienceDate: {
    fontSize: 7.5,
    color: colors.gray600,
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
  // Promoted from
  promotedSection: {
    marginLeft: 8,
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: colors.gray300,
  },
  promotedLabel: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray700,
    marginBottom: 4,
  },
  // Nested experience entry (promotedFrom)
  nestedExperienceEntry: {
    paddingLeft: 6,
    paddingVertical: 4,
    paddingRight: 4,
    borderLeftWidth: 2,
    borderLeftColor: colors.primary,
    backgroundColor: colors.background,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    marginBottom: 4,
  },
  // Education
  educationEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
    borderRadius: 4,
    backgroundColor: colors.gray100,
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.job,
  },
  educationSchool: {
    fontSize: 8,
    color: colors.gray700,
  },
  educationHonors: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  educationDate: {
    fontSize: 7.5,
    color: colors.gray600,
  },
  // Footer
  footer: {
    marginTop: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 8,
    color: colors.gray600,
  },
});

function formatDate(date: Date | 'Present'): string {
  if (date === 'Present') return 'Present';
  return dayjs(date).format('MMM YYYY');
}

// SVG icon components matching Material UI icons used on the web page
const iconSize = 12;

function EmailIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={iconSize} height={iconSize}>
      <Path
        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
        fill={colors.primary}
      />
    </Svg>
  );
}

function LinkedInIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={iconSize} height={iconSize}>
      <Path
        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
        fill={colors.primary}
      />
    </Svg>
  );
}

function GlobeIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={iconSize} height={iconSize}>
      <Path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
        fill={colors.primary}
      />
    </Svg>
  );
}

function GitHubIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={iconSize} height={iconSize}>
      <Path
        d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2.16 2.16 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.74.74 1.2 1.74 1.2 2.84 0 4.31-2.58 5.23-5.06 5.5.45.37.82.92.82 2.02v3.03c0 .27.18.64.73.55A11 11 0 0012 1.27"
        fill={colors.primary}
      />
    </Svg>
  );
}

function ContactItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <Link src={href} style={{ textDecoration: 'none' }}>
      <View style={styles.contactRow}>
        {icon}
        <Text style={styles.contactLink}>{label}</Text>
      </View>
    </Link>
  );
}

function ExperienceEntryView({
  entry,
  nested = false,
}: {
  entry: IExperienceEntry;
  nested?: boolean;
}) {
  const entryStyle = nested
    ? styles.nestedExperienceEntry
    : styles.experienceEntry;

  return (
    <View style={entryStyle} wrap={false}>
      <View style={styles.experienceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.experienceTitle}>{entry.title}</Text>
          <Text style={styles.experienceCompany}>{entry.company}</Text>
          {entry.location && (
            <Text style={styles.experienceLocation}>{entry.location}</Text>
          )}
        </View>
        <Text style={styles.experienceDate}>
          {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
        </Text>
      </View>

      {entry.keyPoints && entry.keyPoints.length > 0 && (
        <View style={styles.bulletList}>
          {entry.keyPoints.filter(Boolean).map((point, idx) => (
            <View style={styles.bulletItem} key={idx}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>{point}</Text>
            </View>
          ))}
        </View>
      )}

      {entry.promotedFrom && entry.promotedFrom.length > 0 && (
        <View style={styles.promotedSection}>
          <Text style={styles.promotedLabel}>Promoted From:</Text>
          {entry.promotedFrom.map((promo, idx) => (
            <ExperienceEntryView key={idx} entry={promo} nested />
          ))}
        </View>
      )}
    </View>
  );
}

export default function ResumePdfDocument({ data }: { data: IResume }) {
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
            <Text style={styles.subtitle}>Principal Software Engineer</Text>
            <Text style={styles.location}>{data.location}</Text>
          </View>
          <View style={styles.contactColumn}>
            <ContactItem
              icon={<EmailIcon />}
              label={data.privateEmailAddress}
              href={`mailto:${data.privateEmailAddress}`}
            />
            <ContactItem
              icon={<LinkedInIcon />}
              label="linkedin.com/in/jacobheater"
              href={data.linkedIn}
            />
            <ContactItem
              icon={<GlobeIcon />}
              label="jacobheater.com"
              href={data.website}
            />
            <ContactItem
              icon={<GitHubIcon />}
              label="github.com/jacobheater"
              href={data.github}
            />
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Professional Summary</Text>
          <Text style={styles.summaryText}>{data.professionalSummary}</Text>
        </View>

        {/* Core Competencies */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Core Competencies</Text>
          <View style={styles.skillsGrid}>
            {data.technicalSkills.map((skill, idx) => (
              <View style={styles.skillCategory} key={idx} wrap={false}>
                <Text style={styles.skillCategoryHeading}>
                  {skill.heading}
                </Text>
                <View style={styles.skillTags}>
                  {skill.items.map((item, i) => (
                    <Text style={styles.skillTag} key={i}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Professional Experience</Text>
          {data.experience.map((exp, idx) => (
            <ExperienceEntryView key={idx} entry={exp} />
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
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

        {/* Footer */}
        <Text style={styles.footer}>
          This resume was built with React and Next.js and styled with Tailwind.
        </Text>
      </Page>
    </Document>
  );
}
