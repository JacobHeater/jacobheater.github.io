import { createContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  setTheme(theme: string) {},
});

export default ThemeContext;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
