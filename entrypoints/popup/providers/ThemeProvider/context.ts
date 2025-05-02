import { createContext } from 'react';

export interface ThemeProviderState {
  theme: 'light' | 'dark';
  toggle(): void
}

const defaultValue: ThemeProviderState = {
  theme: 'light',
  toggle() {
    return
  }
}

export const ThemeContext = createContext<ThemeProviderState>(defaultValue)