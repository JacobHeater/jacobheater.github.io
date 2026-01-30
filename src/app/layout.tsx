import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './fonts.css';
import LayoutClient from './layout-client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  description:
    "Jacob Heater's personal website, resume, blog, and portfolio. Principal Software Engineer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
  keywords:
    'Jacob Heater, software engineer, engineering manager, Principal Software Engineer, resume, blog, portfolio, JavaScript, TypeScript, React, Next.js, D.C. Metro, open source, technology, leadership, theology, apologetics, rational theology, revelation, reorganization, faith, Christianity, cloud, DevOps, AWS, Azure, Docker, Kubernetes, CI/CD, Agile, Scrum, Kanban, management, servant leadership, system-restore, npm, StackOverflow, HackerRank, LinkedIn',
  authors: [{ name: 'Jacob Heater' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Jacob Heater - Principal Software Engineer',
    description:
      "Jacob Heater's personal website, resume, blog, and portfolio. Principal Software Engineer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
    type: 'website',
    url: 'https://jacobheater.com/',
    images: [
      {
        url: 'https://jacobheater.com/portrait.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jacob Heater - Principal Software Engineer',
    description:
      "Jacob Heater's personal website, resume, blog, and portfolio. Principal Software Engineer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
    images: ['https://jacobheater.com/portrait.jpg'],
  },
};

const themeInitScript = `
(function() {
  try {
    var theme = localStorage.getItem('jacobheater-theme');
    if (theme === 'light' || theme === 'dark') {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground relative flex flex-col min-h-[calc(100vh-74px)] dark print:m-0 print:p-0`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
