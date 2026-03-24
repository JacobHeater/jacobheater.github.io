import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { IResume, IExperienceEntry } from '../models/resume';
import { decodePhoneNumber, formatDate, RESUME_LABELS } from '../resume-presentation';

const palette = {
  // Muted accent for a more professional appearance
  accent: '#475569',
  dark: '#0f172a',
  mid: '#334155',
  muted: '#6b7280',
  light: '#f8fafc',
  paper: '#ffffff',
};

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontFamily: 'Helvetica',
    fontSize: 10,
    backgroundColor: palette.paper,
    color: palette.dark,
  },
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  sidebar: {
    width: '34%',
    backgroundColor: palette.light,
    padding: 10,
    borderRadius: 6,
  },
  main: {
    width: '66%',
    paddingLeft: 6,
  },
  name: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: palette.dark,
    marginBottom: 4,
  },
  title: {
    fontSize: 10.5,
    color: palette.mid,
    marginBottom: 8,
  },
  location: {
    fontSize: 8,
    color: palette.muted,
    marginBottom: 8,
  },
  contactLink: {
    fontSize: 8,
    color: palette.dark,
    textDecoration: 'none',
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: palette.dark,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  summary: {
    fontSize: 9,
    color: palette.mid,
    lineHeight: 1.4,
  },
  skillChip: {
    fontSize: 8,
    color: palette.dark,
    backgroundColor: 'transparent',
    padding: 4,
    borderRadius: 3,
    marginBottom: 4,
  },
  skillGroup: {
    marginBottom: 6,
  },
  role: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6eef0',
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  roleTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: palette.dark,
  },
  promotedBadge: {
    backgroundColor: palette.accent,
    color: '#ffffff',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  roleCompany: {
    fontSize: 9,
    color: palette.muted,
    marginTop: 2,
  },
  roleDate: {
    fontSize: 8,
    color: palette.muted,
  },
  bullet: {
    fontSize: 9,
    color: palette.mid,
    marginBottom: 3,
  },
  educationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 8,
    color: palette.muted,
    bottom: 12,
    right: 28,
    textAlign: 'right',
  },
});

function ContactLine({ data, includePhone }: { data: IResume; includePhone: boolean }) {
  const phoneNumber = decodePhoneNumber(data.phoneNumber);

  return (
    <View>
      <Text style={{ fontSize: 8, color: palette.muted }}>Contact</Text>
      <Text style={styles.contactLink}>{data.privateEmailAddress}</Text>
      {includePhone && <Text style={styles.contactLink}> | {phoneNumber}</Text>}
      <Text style={styles.contactLink}> | linkedin.com/in/jacobheater</Text>
      <Text style={styles.contactLink}> | github.com/jacobheater</Text>
      <Text style={styles.contactLink}> | jacobheater.com</Text>
    </View>
  );
}

function FullRoleEntry({ entry, isLast }: { entry: IExperienceEntry; isLast: boolean }) {
  return (
    <View style={isLast ? {} : styles.role} wrap={false}>
      <View style={styles.roleHeader} wrap={false}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.roleTitle}>{entry.title}</Text>
            {entry.promoted && (
              <View style={styles.promotedBadge}>
                <Text style={{ color: '#ffffff', fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{RESUME_LABELS.promoted}</Text>
              </View>
            )}
          </View>
          <Text style={styles.roleCompany}>{entry.company}</Text>
        </View>
        <Text style={styles.roleDate}>{formatDate(entry.startDate)} – {formatDate(entry.endDate)}</Text>
      </View>
      {entry.keyPoints.slice(0, 4).map((p, i) => (
        <Text style={styles.bullet} key={i}>• {p}</Text>
      ))}
    </View>
  );
}

export default function ResumeBeautifiedPdf({ data, includePhone = false }: { data: IResume; includePhone?: boolean }) {
  const featuredRoles = data.experience.filter(e => !e.condensed);
  const condensedRoles = data.experience.filter(e => e.condensed);

  return (
    <Document title={`${data.fullName} - Resume (Beautified)`} author={data.fullName}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.sidebar}>
            <Text style={styles.name}>{data.fullName}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.location}>{data.location}</Text>
            <ContactLine data={data} includePhone={includePhone} />

            <View style={{ marginTop: 10 }}>
              <Text style={styles.sectionHeading}>{RESUME_LABELS.technicalSkills}</Text>
              {data.skills.map((s, idx) => (
                <View style={styles.skillGroup} key={idx}>
                  <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: palette.dark }}>{s.heading}</Text>
                  <Text style={styles.skillChip}>{s.items.join(', ')}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.main}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.sectionHeading}>{RESUME_LABELS.summary}</Text>
              {data.professionalSummaryBullets && data.professionalSummaryBullets.length > 0 ? (
                <View>
                  {data.professionalSummaryBullets.map((b, i) => (
                    <Text key={i} style={styles.bullet}>• {b}</Text>
                  ))}
                </View>
              ) : (
                <Text style={styles.summary}>{data.professionalSummary}</Text>
              )}
            </View>

            <View style={{ marginBottom: 6 }}>
              <Text style={styles.sectionHeading}>{RESUME_LABELS.professionalExperience}</Text>
              {featuredRoles.map((r, i) => (
                <FullRoleEntry key={i} entry={r} isLast={i === featuredRoles.length - 1} />
              ))}
            </View>

            {condensedRoles.length > 0 && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.sectionHeading}>{RESUME_LABELS.earlierExperience}</Text>
                {condensedRoles.map((r, i) => (
                  <View key={i} style={{ marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold' }}>{r.title}</Text>
                      {r.promoted && (
                        <View style={styles.promotedBadge}>
                          <Text style={{ color: '#ffffff', fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{RESUME_LABELS.promoted}</Text>
                        </View>
                      )}
                      <Text style={{ fontSize: 9, color: palette.muted, marginLeft: 6 }}>— {r.company}</Text>
                    </View>
                    <Text style={{ fontSize: 8, color: palette.muted }}>{formatDate(r.startDate)} – {formatDate(r.endDate)}</Text>
                  </View>
                ))}
              </View>
            )}

            <View>
              <Text style={styles.sectionHeading}>{RESUME_LABELS.education}</Text>
              {data.education.map((edu, i) => (
                <View style={styles.educationRow} key={i} wrap={false}>
                  <View>
                    <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold' }}>{edu.degree}</Text>
                    <Text style={{ fontSize: 8, color: palette.muted }}>{edu.school}</Text>
                    {edu.honors && <Text style={{ fontSize: 8, color: palette.mid }}>{edu.honors}</Text>}
                  </View>
                  <Text style={{ fontSize: 8, color: palette.muted }}>{formatDate(edu.startDate)} – {formatDate(edu.endDate)}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} fixed />
      </Page>
    </Document>
  );
}
