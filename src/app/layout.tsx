'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { useState, useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useRouter } from 'next/navigation';
import { Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
    document.documentElement.className = storedTheme;
  }, []);

  useEffect(() => {
    if (theme) {
      const handleBeforePrint = () => {
        document.documentElement.className = 'light';
      };

      const handleAfterPrint = () => {
        document.documentElement.className = theme;
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
      localStorage.setItem('theme', newTheme);
      document.documentElement.className = newTheme;
    }
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="no-print flex justify-end items-center p-4">
          <Tooltip
            id="toggle-theme-tooltip"
            content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          />
          <LightModeIcon />
          <Switch
            data-tooltip-id="toggle-theme-tooltip"
            size="medium"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            />
          <DarkModeIcon />
        </header>
        <main className="mt-20">{children}</main>
        <footer className="no-print mt-10 py-4 border-t border-[var(--primary)] text-center text-[var(--foreground)] bg-[var(--background)]">
          <nav className="flex justify-center space-x-4">
            <button
              onClick={() => router.push('/')}
              className="text-[var(--primary)] hover:text-[var(--secondary)]"
            >
              Home
            </button>
            <button
              onClick={() => router.push('/about/resume')}
              className="text-[var(--primary)] hover:text-[var(--secondary)]"
            >
              Resume
            </button>
          </nav>
        </footer>
      </body>
    </html>
  );
}
