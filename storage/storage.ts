import {storage} from "#imports";

export type Theme = 'dark' | 'light';

export const ThemeStorage = storage.defineItem<Theme>('local:preferred-theme')
export const URLStorage = storage.defineItem<string[]>('local:processing-urls')
