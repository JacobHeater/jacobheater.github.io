'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { SwipeableDrawer, Switch } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { sitetree } from '@/app/models/sitetree/sitetree';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeContext from './theme-context';

const THEME_STORAGE_KEY = 'jacobheater-theme';

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<string>('dark');
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme || 'dark');
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  useEffect(() => {
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

    window.localStorage.setItem(THEME_STORAGE_KEY, theme);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}>
        <header className="no-print fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-[var(--background)] z-10 border-b border-[var(--primary)]">
          <div
            className={`text-[var(--primary)] text-2xl md:text-4xl cursive cursor-pointer select-none hover:text-[var(--secondary)] transition-colors duration-300`}
            onClick={() => router.push('/')}>
            Jacob Heater
          </div>
          <nav className="absolute hidden md:block left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-4">
              {sitetree.map((entry) => (
                <Link
                  key={entry.url}
                  href={entry.url}
                  className="text-[var(--primary)] hover:text-[var(--secondary)] hover:underline transition-colors duration-300">
                  {entry.displayText}
                </Link>
              ))}
            </div>
          </nav>
          <div className="flex md:hidden">
            <MenuIcon
              className="text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
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
            {mounted ? (
              <Switch
                data-tooltip-id="toggle-theme-tooltip"
                size="medium"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
            ) : (
              <span
                className="inline-flex items-center justify-center"
                style={{ width: 58, height: 38 }}>
                <span
                  className="relative rounded-full opacity-40"
                  style={{
                    width: 34,
                    height: 14,
                    backgroundColor: 'currentColor',
                  }}>
                  <span
                    className="theme-skeleton-thumb absolute rounded-full shadow-md"
                    style={{
                      width: 20,
                      height: 20,
                      top: -3,
                      backgroundColor: 'var(--foreground)',
                      opacity: 0.6,
                    }}
                  />
                </span>
              </span>
            )}
            <DarkModeIcon />
          </div>
        </header>
        <main className="flex-grow flex-shrink-0 py-10 pt-[72px] print:pt-0 print:py-0 w-[90vw] md:w-[70vw] print:w-[95vw] mx-auto">
          {children}
        </main>
        <SwipeableDrawer
          open={drawerOpen}
          onOpen={() => setDrawerOpen(true)}
          onClose={() => setDrawerOpen(false)}
          className="no-print md:hidden"
          slotProps={{
            backdrop: {
              className: 'backdrop-blur-sm',
            },
          }}
          PaperProps={{
            className: `w-4/5 !bg-[var(--background)] !text-[var(--foreground)] print:m-0 print:p-0 shadow-xl`,
          }}>
          <div className="flex justify-between items-center p-5 border-b-2 border-[var(--primary)]">
            <span className="text-xl font-semibold text-[var(--primary)] tracking-wider uppercase">
              Menu
            </span>
            <CloseIcon
              className="text-[var(--primary)] hover:text-[var(--secondary)] cursor-pointer transition-colors duration-200"
              onClick={() => setDrawerOpen(false)}
            />
          </div>
          <nav className="p-3 mt-2">
            {sitetree.map((entry) => (
              <Link
                key={entry.url}
                href={entry.url}
                className="flex items-center p-4 mb-2 rounded-md border-l-4 border-transparent hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:bg-opacity-10 transition-all duration-200 group"
                onClick={() => setDrawerOpen(false)}>
                <entry.icon className="text-2xl mr-4 text-[var(--secondary)] group-hover:text-[var(--primary)] transition-colors duration-200"></entry.icon>
                <span className="text-lg text-[var(--foreground)] group-hover:text-[var(--primary)] font-medium transition-colors duration-200">
                  {entry.displayText}
                </span>
              </Link>
            ))}
          </nav>
        </SwipeableDrawer>
      </ThemeContext.Provider>
    </>
  );
}
