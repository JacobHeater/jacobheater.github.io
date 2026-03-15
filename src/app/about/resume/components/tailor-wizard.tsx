'use client';

import { useState, useCallback, useMemo, type ReactNode } from 'react';
import { resume } from '../data/resume/resume';
import {
  generateTailoredResume,
  buildOriginalResume,
  ITailoredResume,
  ITailoredExperience,
} from '../tailor-resume';
import { formatDate } from '../resume-presentation';
import { Button } from '@/app/components/button';

const STEPS = [
  'Job Description',
  'Generate Preview',
  'Diff View',
  'Export',
] as const;

type Step = 1 | 2 | 3 | 4;

export function TailorWizard() {
  const [step, setStep] = useState<Step>(1);
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredResume, setTailoredResume] = useState<ITailoredResume | null>(null);
  const [generating, setGenerating] = useState(false);
  const [exporting, setExporting] = useState(false);

  const originalResume = useMemo(() => buildOriginalResume(resume), []);

  const canAdvanceFromStep1 = jobDescription.trim().length > 0;

  const generate = useCallback(async () => {
    setGenerating(true);
    // Simulate async work so the loading indicator renders
    await new Promise(r => setTimeout(r, 600));
    const result = generateTailoredResume(resume, jobDescription);
    setTailoredResume(result);
    setGenerating(false);
  }, [jobDescription]);

  const handleNext = useCallback(async () => {
    if (step === 1 && canAdvanceFromStep1) {
      setStep(2);
      setGenerating(true);
      await new Promise(r => setTimeout(r, 600));
      const result = generateTailoredResume(resume, jobDescription);
      setTailoredResume(result);
      setGenerating(false);
    } else if (step === 2 && tailoredResume) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  }, [step, canAdvanceFromStep1, jobDescription, tailoredResume]);

  const handleBack = useCallback(() => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
  }, [step]);

  const handleRegenerate = useCallback(async () => {
    setStep(2);
    await generate();
  }, [generate]);

  const handleExport = useCallback(async () => {
    if (!tailoredResume) return;
    setExporting(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: TailoredPdfDocument } = await import('./tailored-pdf-document');
      const blob = await pdf(<TailoredPdfDocument data={tailoredResume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tailoredResume.fullName.replace(/\s+/g, '_')}_Tailored_Resume.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  }, [tailoredResume]);

  return (
    <div className="min-h-screen pt-6 pb-8 max-w-5xl mx-auto px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] mb-6">
        Tailor My Resume
      </h1>

      <StepIndicator currentStep={step} />

      <div className="mt-6">
        {step === 1 && (
          <StepJobDescription
            jobDescription={jobDescription}
            onChange={setJobDescription}
            onNext={handleNext}
            canAdvance={canAdvanceFromStep1}
          />
        )}
        {step === 2 && (
          <StepPreview
            tailoredResume={tailoredResume}
            generating={generating}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {step === 3 && (
          <StepDiffView
            original={originalResume}
            tailored={tailoredResume!}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
        {step === 4 && (
          <StepExport
            onBack={handleBack}
            onRegenerate={handleRegenerate}
            onExport={handleExport}
            exporting={exporting}
          />
        )}
      </div>
    </div>
  );
}

function StepIndicator({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {STEPS.map((label, idx) => {
        const stepNum = (idx + 1) as Step;
        const isCompleted = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isFuture = stepNum > currentStep;

        return (
          <div key={idx} className="flex items-center gap-2 sm:gap-3 flex-1">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${
                  isCompleted
                    ? 'bg-[var(--primary)] border-[var(--primary)] text-white'
                    : isCurrent
                      ? 'border-[var(--primary)] text-[var(--primary)] bg-transparent'
                      : 'border-[var(--gray-300)] text-[var(--gray-500)] bg-transparent'
                }`}
                aria-label={
                  isCompleted
                    ? `Step ${stepNum}: ${label} - Complete`
                    : isCurrent
                      ? `Step ${stepNum}: ${label} - Current`
                      : `Step ${stepNum}: ${label}`
                }>
                {isCompleted ? '\u2713' : stepNum}
              </span>
              <span
                className={`text-xs sm:text-sm truncate ${
                  isCurrent
                    ? 'font-semibold text-[var(--foreground)]'
                    : isFuture
                      ? 'text-[var(--gray-500)]'
                      : 'text-[var(--gray-700)]'
                }`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 ${
                  isCompleted ? 'bg-[var(--primary)]' : 'bg-[var(--gray-300)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepJobDescription({
  jobDescription,
  onChange,
  onNext,
  canAdvance,
}: {
  jobDescription: string;
  onChange: (value: string) => void;
  onNext: () => void;
  canAdvance: boolean;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
        Step 1: Job Description
      </h2>
      <p className="text-sm text-[var(--gray-700)] mb-4">
        Paste the job description you want to tailor your resume for. The wizard
        will analyze keywords and requirements to optimize your resume content.
      </p>
      <textarea
        className="w-full h-64 p-4 border border-[var(--gray-300)] rounded-lg text-sm text-[var(--foreground)] bg-[var(--background)] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        placeholder="Paste the job description here..."
        value={jobDescription}
        onChange={e => onChange(e.target.value)}
      />
      <div className="mt-4 flex justify-end">
        <Button onClick={onNext} disabled={!canAdvance}>
          Next
        </Button>
      </div>
    </div>
  );
}

function StepPreview({
  tailoredResume,
  generating,
  onBack,
  onNext,
}: {
  tailoredResume: ITailoredResume | null;
  generating: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
        Step 2: Generate Preview
      </h2>
      {generating ? (
        <div className="flex flex-col items-center justify-center py-16 gap-4">
          <div className="w-10 h-10 border-4 border-[var(--gray-300)] border-t-[var(--primary)] rounded-full animate-spin" />
          <p className="text-sm text-[var(--gray-700)]">
            Generating tailored resume...
          </p>
        </div>
      ) : tailoredResume ? (
        <div className="border border-[var(--gray-300)] rounded-lg p-6 bg-[var(--background)]">
          <ResumePreview data={tailoredResume} />
        </div>
      ) : null}
      <div className="mt-4 flex justify-between">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext} disabled={generating || !tailoredResume}>
          Next
        </Button>
      </div>
    </div>
  );
}

function StepDiffView({
  original,
  tailored,
  onBack,
  onNext,
}: {
  original: ITailoredResume;
  tailored: ITailoredResume;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
        Step 3: Diff View
      </h2>
      <p className="text-sm text-[var(--gray-700)] mb-4">
        Compare your original resume with the tailored version. Changes are highlighted.
      </p>
      <DiffPanels original={original} tailored={tailored} />
      <div className="mt-4 flex justify-between">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

function StepExport({
  onBack,
  onRegenerate,
  onExport,
  exporting,
}: {
  onBack: () => void;
  onRegenerate: () => void;
  onExport: () => void;
  exporting: boolean;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">
        Step 4: Export
      </h2>
      <p className="text-sm text-[var(--gray-700)] mb-6">
        Export your tailored resume as a PDF, or regenerate with the same job description.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <Button onClick={onRegenerate}>Regenerate</Button>
        <Button onClick={onExport} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export'}
        </Button>
      </div>
      <div className="mt-6 flex justify-start">
        <Button onClick={onBack}>Back</Button>
      </div>
    </div>
  );
}

/* ---------- Shared resume rendering ---------- */

function ResumePreview({ data }: { data: ITailoredResume }) {
  return (
    <article className="text-[var(--foreground)]">
      <header className="mb-4 pb-3">
        <h3 className="text-2xl font-bold tracking-tight">{data.fullName}</h3>
        <p className="text-base font-semibold mt-1">{data.title}</p>
        <p className="text-sm mt-1 text-[var(--gray-700)]">{data.location}</p>
        <p className="mt-2 text-xs text-[var(--gray-800)]">
          {data.publicEmailAddress} |{' '}
          <a href={data.linkedIn} className="underline">LinkedIn</a> |{' '}
          <a href={data.website} className="underline">Website</a> |{' '}
          <a href={data.github} className="underline">GitHub</a>
        </p>
      </header>

      <PreviewSection heading="Summary">
        <div className="text-sm leading-relaxed text-[var(--gray-800)]">
          {data.summary.split('\n\n').map((p, i) => (
            <p key={i} className={i > 0 ? 'mt-2' : ''}>{p}</p>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection heading="Technical Skills">
        <div className="space-y-1 text-sm text-[var(--gray-800)]">
          {data.skills.map((skill, i) => (
            <p key={i}>
              <span className="font-semibold">{skill.heading}:</span>{' '}
              {skill.items.join(', ')}
            </p>
          ))}
        </div>
      </PreviewSection>

      <PreviewSection heading="Professional Experience">
        <div className="flex flex-col gap-4">
          {data.experience.map((exp, i) => (
            <ExperienceBlock key={i} exp={exp} />
          ))}
        </div>
      </PreviewSection>

      <PreviewSection heading="Education">
        <div className="flex flex-col gap-2 text-sm">
          {data.education.map((edu, i) => (
            <div key={i}>
              <p className="font-semibold">{edu.degree}</p>
              <p className="text-[var(--gray-700)]">{edu.school}</p>
              {edu.honors && (
                <p className="text-xs text-[var(--gray-800)]">{edu.honors}</p>
              )}
              <p className="text-xs text-[var(--gray-600)]">
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </div>
      </PreviewSection>
    </article>
  );
}

function PreviewSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-4">
      <h4 className="text-base font-bold mb-2 pb-1 border-b border-[var(--gray-300)] uppercase tracking-normal">
        {heading}
      </h4>
      {children}
    </section>
  );
}

function ExperienceBlock({ exp }: { exp: ITailoredExperience }) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div>
          <p className="font-bold text-sm">{exp.company}</p>
          <p className="font-semibold text-sm">{exp.title}</p>
          {exp.contract && <p className="text-xs">Contract</p>}
          <p className="text-xs text-[var(--gray-700)]">{exp.location}</p>
        </div>
        <span className="text-xs text-[var(--gray-700)] whitespace-nowrap">
          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
        </span>
      </div>
      {exp.keyPoints.length > 0 && (
        <ul className="list-disc ml-5 text-sm mt-1 space-y-0.5 text-[var(--gray-800)]">
          {exp.keyPoints.map((pt, i) => (
            <li key={i}>{pt}</li>
          ))}
        </ul>
      )}
      {exp.technologies.length > 0 && (
        <p className="text-xs mt-1 text-[var(--gray-700)]">
          <span className="font-semibold">Technologies:</span>{' '}
          {exp.technologies.join(', ')}
        </p>
      )}
    </div>
  );
}

/* ---------- Diff panels ---------- */

function DiffPanels({
  original,
  tailored,
}: {
  original: ITailoredResume;
  tailored: ITailoredResume;
}) {
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>, targetId: string) => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollTop = e.currentTarget.scrollTop;
      }
    },
    [],
  );

  const originalLines = useMemo(() => resumeToLines(original), [original]);
  const tailoredLines = useMemo(() => resumeToLines(tailored), [tailored]);
  const diff = useMemo(
    () => computeDiff(originalLines, tailoredLines),
    [originalLines, tailoredLines],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-[var(--gray-700)]">
          Original
        </h3>
        <div
          id="diff-panel-original"
          className="border border-[var(--gray-300)] rounded-lg p-4 max-h-[600px] overflow-y-auto text-xs leading-relaxed bg-[var(--background)]"
          onScroll={e => handleScroll(e, 'diff-panel-tailored')}>
          {diff.map((line, i) => (
            <DiffLine key={i} type={line.type} side="left">
              {line.original}
            </DiffLine>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-[var(--gray-700)]">
          Tailored
        </h3>
        <div
          id="diff-panel-tailored"
          className="border border-[var(--gray-300)] rounded-lg p-4 max-h-[600px] overflow-y-auto text-xs leading-relaxed bg-[var(--background)]"
          onScroll={e => handleScroll(e, 'diff-panel-original')}>
          {diff.map((line, i) => (
            <DiffLine key={i} type={line.type} side="right">
              {line.tailored}
            </DiffLine>
          ))}
        </div>
      </div>
    </div>
  );
}

type DiffType = 'same' | 'changed' | 'added' | 'removed';

interface DiffEntry {
  type: DiffType;
  original: string;
  tailored: string;
}

function DiffLine({
  type,
  side,
  children,
}: {
  type: DiffType;
  side: 'left' | 'right';
  children: string;
}) {
  if (!children && type !== 'same') return null;

  let className = 'py-0.5 px-1 rounded whitespace-pre-wrap';

  if (type === 'removed' && side === 'left') {
    className += ' bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200';
  } else if (type === 'added' && side === 'right') {
    className += ' bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
  } else if (type === 'changed') {
    if (side === 'left') {
      className += ' bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200';
    } else {
      className += ' bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    }
  }

  return <div className={className}>{children || '\u00A0'}</div>;
}

function resumeToLines(data: ITailoredResume): string[] {
  const lines: string[] = [];

  lines.push(data.fullName);
  lines.push(data.title);
  lines.push(data.location);
  lines.push('');
  lines.push('SUMMARY');
  for (const paragraph of data.summary.split('\n\n')) {
    lines.push(paragraph.trim());
    lines.push('');
  }

  lines.push('TECHNICAL SKILLS');
  for (const skill of data.skills) {
    lines.push(`${skill.heading}: ${skill.items.join(', ')}`);
  }
  lines.push('');

  lines.push('PROFESSIONAL EXPERIENCE');
  for (const exp of data.experience) {
    lines.push(`${exp.company} | ${exp.title}`);
    lines.push(`${exp.location} | ${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}`);
    for (const pt of exp.keyPoints) {
      lines.push(`  • ${pt}`);
    }
    if (exp.technologies.length > 0) {
      lines.push(`  Technologies: ${exp.technologies.join(', ')}`);
    }
    lines.push('');
  }

  lines.push('EDUCATION');
  for (const edu of data.education) {
    lines.push(`${edu.degree} - ${edu.school}`);
    lines.push(`${formatDate(edu.startDate)} – ${formatDate(edu.endDate)}`);
    if (edu.honors) lines.push(edu.honors);
  }

  return lines;
}

function computeDiff(original: string[], tailored: string[]): DiffEntry[] {
  const result: DiffEntry[] = [];
  const maxLen = Math.max(original.length, tailored.length);

  for (let i = 0; i < maxLen; i++) {
    const orig = original[i] ?? '';
    const tail = tailored[i] ?? '';

    if (orig === tail) {
      result.push({ type: 'same', original: orig, tailored: tail });
    } else if (!orig && tail) {
      result.push({ type: 'added', original: '', tailored: tail });
    } else if (orig && !tail) {
      result.push({ type: 'removed', original: orig, tailored: '' });
    } else {
      result.push({ type: 'changed', original: orig, tailored: tail });
    }
  }

  return result;
}
