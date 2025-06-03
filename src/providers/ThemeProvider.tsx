import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme as useAppThemeHook } from '@/hooks/useTheme'; // Aliased to avoid naming collision

interface ThemeProviderContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeManager = useAppThemeHook(); // This hook handles side effects (applying class, localStorage)

  return (
    <ThemeProviderContext.Provider value={themeManager}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

// This is the hook components will use to access theme context
export const useTheme = (): ThemeProviderContextType => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
