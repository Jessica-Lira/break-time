import { createContext, ReactNode, useEffect, useState } from 'react';

interface ThemeProviderContextData {
  toggleTheme: () => void;
  currentTheme: string;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeModeContext = createContext({} as ThemeProviderContextData);

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState('theme-light');

  //pegar as preferencias do usuário
  function setTheme(themeName) { 
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    setCurrentTheme(themeName);
  }

  function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark'){
      setTheme('theme-light');
    } else {
      setTheme('theme-dark');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-dark');
    } else {
      setTheme('theme-light');
    }
  }, []);
  return (
    <ThemeModeContext.Provider value= {{
      toggleTheme,
      currentTheme,
    }}>
      {children}
    </ThemeModeContext.Provider>
  );
}