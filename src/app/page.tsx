import { Metadata } from 'next';
import { HtmlTitle } from './components/html-title';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Jacob Heater - Principal Software Engineer',
  description:
    'Principal Software Engineer with 12+ years experience in full-stack development, system architecture, and team leadership. Expert in React, Node.js, C#/.NET, Python, AWS, Azure, and Kubernetes.',
  keywords: [
    'Jacob Heater',
    'Principal Software Engineer',
    'Full Stack Developer',
    'Software Architecture',
    'Team Leadership',
    'React',
    'Node.js',
    'TypeScript',
    'C#',
    '.NET',
    'Python',
    'AWS',
    'Azure',
    'Kubernetes',
    'Docker',
    'System Design',
    'Washington DC',
    'Remote Work',
  ],
  openGraph: {
    title: 'Jacob Heater - Principal Software Engineer',
    description:
      'Principal Software Engineer with 12+ years experience in full-stack development, system architecture, and team leadership.',
    type: 'website',
    url: 'https://jacobheater.com/',
    images: [
      {
        url: 'https://jacobheater.com/portrait.jpg',
        width: 1200,
        height: 630,
        alt: 'Jacob Heater - Principal Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacob Heater - Principal Software Engineer',
    description:
      'Principal Software Engineer with 12+ years experience in full-stack development, system architecture, and team leadership.',
    images: ['https://jacobheater.com/portrait.jpg'],
  },
  alternates: {
    canonical: 'https://jacobheater.com/',
  },
};

export default function Home() {
  return (
    <section className="pt-5 pb-12 sm:px-6 lg:px-8 text-[var(--foreground)]">
      <HtmlTitle title="Jacob Heater - Principal Software Engineer" />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl">
          Jacob Heater
        </h1>
        <p className="mt-3 italic max-w-xl mx-auto text-xl sm:mt-4">
          Passionate, Driven, Results-Oriented Principal Software Engineer
        </p>
      </div>

      <div className="flex justify-center items-center mb-12">
        <Image
          src="/portrait.jpg"
          alt="Jacob Heater - Principal Software Engineer"
          width={300}
          height={300}
          className="rounded-full w-75 h-auto object-cover shadow-lg"
          priority
        />
      </div>

      <div className="prose prose-lg prose-invert mx-auto">
        <p className="lead">
          I&apos;m a highly skilled, full stack software engineering leader with
          extensive experience in systems design, software architecture, and
          team leadership. With over a decade of industry experience across
          cybersecurity, legal tech, and government sectors, I bring technical
          expertise and leadership skills to every project.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Technical Expertise</h2>
        <p>
          My technical foundation spans multiple domains with particular
          strength in
          <strong className="text-[var(--cyan-400)] text-[var(--foreground)]">
            {' '}
            JavaScript ecosystems
          </strong>{' '}
          (React, Angular, Node.js),
          <strong className="text-[var(--cyan-400)] text-[var(--foreground)]">
            {' '}
            .NET development
          </strong>{' '}
          (C#, ASP.NET), and
          <strong> modern web technologies</strong>. I&apos;m passionate about
          both object-oriented and functional programming paradigms, with
          experience in containerization, cloud platforms, and Python
          development.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Professional Journey</h2>
        <p>
          My career path has taken me from software development to software
          development consulting; freelance development to senior engineering
          and management positions at companies like Expel, Swimlane, and
          Cofense. Throughout this journey, I&apos;ve maintained a commitment to
          clean code, effective team leadership, and continuous learning.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">
          Open Source & Community
        </h2>
        <p>
          I maintain several open-source projects including npm packages like{' '}
          <a
            href="https://www.npmjs.com/package/system-restore"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--cyan-400)] hover:text-[var(--cyan-300)]">
            system-restore
          </a>
          , and actively contribute to the developer community. You can find my
          work on{' '}
          <a
            href="https://github.com/jacobheater/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--cyan-400)] hover:text-[var(--cyan-300)]">
            GitHub
          </a>{' '}
          and{' '}
          <a
            href="https://gitlab.com/JacobHeater"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:text-[var(--secondary)]">
            GitLab
          </a>
          , or connect with me on platforms like{' '}
          <a
            href="http://stackoverflow.com/users/2023218/jacob-heater"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:text-[var(--secondary)]">
            StackOverflow
          </a>{' '}
          and{' '}
          <a
            href="https://www.hackerrank.com/jacobheater"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] hover:text-[var(--secondary)]">
            HackerRank
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Education & Work Style</h2>
        <p>
          I hold a degree from George Mason University where I graduated Cum
          Laude. I currently work remotely and am based in the Washington DC
          Metro Area.
        </p>

        <p className="italic mt-8">
          Looking to collaborate? Feel free to reach out through any of my
          linked profiles in my resume.
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="/about/resume"
            className="inline-flex items-center px-6 py-3 border border-[var(--primary)] text-base font-medium rounded-md shadow-sm text-[var(--foreground)] bg-transparent hover:bg-[var(--secondary)] transition-colors duration-200">
            View Full Resume
          </a>
        </div>
      </div>
    </section>
  );
}
