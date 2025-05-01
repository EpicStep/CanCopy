import { FC, PropsWithChildren, useMemo } from 'react';
import { ThemeContext, ThemeProviderState } from './context.ts';

export type ThemeProviderProps = ThemeProviderState

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  theme,
  toggle,
  children,
}) => {
  const value = useMemo(() => ({
    theme,
    toggle
  }), [theme, toggle])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}