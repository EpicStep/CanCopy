import { storage } from "#imports";
import { useLayoutEffect, useEffect } from "react";
import { isValidURL } from '@/entrypoints/popup/utils';

export const useURLStore = () => {
    const [urls, setURLs] = useState<string[]>([])
    const initialized = useRef(false)

    const storageKey = 'local:processing-urls'

    useLayoutEffect(() => {
        storage.getItem<string[]>(storageKey).then((value) => {
            initialized.current = true;
            if (!value) return
            setURLs(value)
        })
    }, [])

    const add = (url: string) => {
        if (!isValidURL(url)) throw new Error('Invalid URL')
        if (urls.includes(url)) return

        setURLs((state) => [...state, url])
    }

    const remove = (url: string) => {
        setURLs((state) => state.filter(u => u !== url))
    }

    useEffect(() => {
        if (urls && initialized.current) storage.setItem(storageKey, urls)
    }, [urls])

    return {
        urls,
        add,
        remove,
    }
}
