import { storage } from "#imports";
import { useLayoutEffect, useEffect, useState, useCallback } from "react";

type Theme = 'dark' | 'light';

export const useAppTheme = () => {
    const [theme, setTheme] = useState<Theme>(window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light')

    const storageKey = 'local:preferred-theme'

    useLayoutEffect(() => {
        storage.getItem<Theme>(storageKey).then((value) => {
            if (!value) return
            setTheme(value)
        })
    }, [])

    const toggle = useCallback(() => {
        setTheme((state) => state == 'dark' ? 'light' : 'dark')
    }, [])

    useEffect(() => {
        if (theme) storage.setItem<Theme>(storageKey, theme)
    }, [theme]);

    return [theme, toggle] as const
}
