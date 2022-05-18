import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

// Since I need especially the value of theme in multiple files,
// I set up a context for this to get easy access and avoid prop-drilling
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('VERTICAL');

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;
