import { useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { Theme, ThemeStorage } from '@/storage';

export const useAppTheme = () => {
    const [theme, setTheme] = useState<Theme>(window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light')
    const initialized = useRef(false)

    useLayoutEffect(() => {
        ThemeStorage.getValue().then((value) => {
            initialized.current = true;
            if (!value) return
            setTheme(value)
        })
    }, [])

    const toggle = useCallback(() => {
        setTheme((state) => state == 'dark' ? 'light' : 'dark')
    }, [])

    useEffect(() => {
        if (theme && initialized.current) ThemeStorage.setValue(theme)
    }, [theme]);

    return [theme, toggle] as const
}
