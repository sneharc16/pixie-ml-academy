
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type CharacterTheme = 'barbie' | 'mickey' | 'spiderman';

interface ThemeContextType {
  theme: Theme;
  currentTheme: CharacterTheme;
  toggleTheme: () => void;
  setCharacterTheme: (theme: CharacterTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'light';
  });

  const [currentTheme, setCurrentTheme] = useState<CharacterTheme>(() => {
    const saved = localStorage.getItem('characterTheme');
    return (saved as CharacterTheme) || 'barbie';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.removeAttribute('data-theme');
    if (currentTheme !== 'barbie') {
      root.setAttribute('data-theme', currentTheme);
    }
    localStorage.setItem('characterTheme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setCharacterTheme = (newTheme: CharacterTheme) => {
    setCurrentTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme, setCharacterTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
