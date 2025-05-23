'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './fonts.css';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { SwipeableDrawer, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import { sitetree } from '@/app/models/sitetree/sitetree';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeContext from './theme-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  return {
    description:
      "Jacob Heater's personal website, resume, blog, and portfolio. Senior Engineering Manager and Full-Stack Developer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
    keywords:
      'Jacob Heater, software engineer, engineering manager, full-stack developer, resume, blog, portfolio, JavaScript, TypeScript, React, Next.js, D.C. Metro, open source, technology, leadership, theology, apologetics, rational theology, revelation, reorganization, faith, Christianity, cloud, DevOps, AWS, Azure, Docker, Kubernetes, CI/CD, Agile, Scrum, Kanban, management, servant leadership, system-restore, npm, StackOverflow, HackerRank, LinkedIn',
    authors: [{ name: 'Jacob Heater' }],
    robots: 'index, follow',
    openGraph: {
      title: 'Jacob Heater - Full-Stack Developer',
      description:
        "Jacob Heater's personal website, resume, blog, and portfolio. Senior Engineering Manager and Full-Stack Developer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
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
      title: 'Jacob Heater - Full-Stack Developer',
      description:
        "Jacob Heater's personal website, resume, blog, and portfolio. Senior Engineering Manager and Full-Stack Developer based in the D.C. Metro Area. Explore blog entries on technology, theology, apologetics, rational faith, and more.",
      images: ['https://jacobheater.com/portrait.jpg'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>('dark');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (theme) {
      const handleBeforePrint = () => {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add('light');
      };

      const handleAfterPrint = () => {
        document.body.classList.remove('dark', 'light');
        document.body.classList.add(theme);
      };

      window.addEventListener('beforeprint', handleBeforePrint);
      window.addEventListener('afterprint', handleAfterPrint);

      return () => {
        window.removeEventListener('beforeprint', handleBeforePrint);
        window.removeEventListener('afterprint', handleAfterPrint);
      };
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme) {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(newTheme);
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground relative flex flex-col min-h-[calc(100vh-74px)] dark print:m-0 print:p-0`}>
        <header className="no-print fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-[var(--background)] z-10 border-b border-[var(--primary)]">
          <div
            className={`text-[var(--primary)] text-2xl md:text-4xl cursive cursor-pointer select-none`}
            onClick={() => router.push('/')}>
            Jacob Heater
          </div>
          <nav className="absolute hidden md:block left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-4">
              {sitetree.map((entry) => (
                <Link
                  key={entry.url}
                  href={entry.url}
                  className="text-[var(--primary)] hover:text-[var(--secondary)]">
                  {entry.displayText}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex md:hidden">
            <MenuIcon
              className="text-[var(--primary)] cursor-pointer"
              onClick={() => setDrawerOpen(true)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Tooltip
              id="toggle-theme-tooltip"
              content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="no-print invisible md:visible"
            />
            <LightModeIcon />
            <Switch
              data-tooltip-id="toggle-theme-tooltip"
              size="medium"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <DarkModeIcon />
          </div>
        </header>
        <main className="flex-grow flex-shrink-0 py-10 pt-[72px] print:pt-0 print:py-0 print:m-0 w-[90vw] md:w-[70vw] mx-auto">
          <ThemeContext.Provider
            value={{
              theme,
              setTheme,
            }}>
            {children}
          </ThemeContext.Provider>
        </main>
        <SwipeableDrawer
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          className="no-print md:hidden"
          PaperProps={{
            className: `w-3/4 !bg-[var(--background)] !text-[var(--foreground)] print:m-0 print:p-0`,
          }}>
          <nav className="p-4 space-y-2">
            {sitetree.map((entry) => (
              <div key={entry.url} className="flex items-center space-x-2 mb-8">
                <entry.icon className="text-xl mr-4"></entry.icon>
                <Link
                  key={entry.url}
                  href={entry.url}
                  className="block text-lg text-[var(--primary)] hover:text-[var(--secondary)]"
                  onClick={() => setDrawerOpen(false)}>
                  {entry.displayText}
                </Link>
              </div>
            ))}
          </nav>
        </SwipeableDrawer>
      </body>
    </html>
  );
}
