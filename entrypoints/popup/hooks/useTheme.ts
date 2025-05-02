import { ThemeContext } from '@/entrypoints/popup/providers/ThemeProvider/context.ts';
import { useContext } from 'react';

export const useTheme = () => {
  return useContext(ThemeContext)
}