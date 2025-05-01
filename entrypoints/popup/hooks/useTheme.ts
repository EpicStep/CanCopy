import { ThemeContext } from '@/entrypoints/popup/providers/ThemeProvider/context.ts';

export const useTheme = () => {
  return useContext(ThemeContext)
}