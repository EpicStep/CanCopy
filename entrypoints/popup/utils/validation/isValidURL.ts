import { urlRegexp } from '@/entrypoints/popup/constants';

export const isValidURL = (url: string) => urlRegexp.test(url)