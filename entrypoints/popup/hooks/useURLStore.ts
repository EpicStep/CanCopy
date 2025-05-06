import { useLayoutEffect, useEffect } from 'react';
import { isValidURL } from '@/entrypoints/popup/utils';
import { URLStorage } from '@/storage';

export const useURLStore = () => {
    const [urls, setURLs] = useState<string[]>([])
    const initialized = useRef(false)

    useLayoutEffect(() => {
        URLStorage.getValue().then((value) => {
            initialized.current = true;
            if (!value) return
            setURLs(value)
        })
    }, [])

    const add = (url: string) => {
        if (!isValidURL(url)) throw new Error('Invalid URL')
        const parsedURL = URL.parse(url)
        if (!parsedURL || urls.includes(parsedURL.origin)) return

        setURLs((state) => [...state, parsedURL.origin])
    }

    const remove = (url: string) => {
        setURLs((state) => state.filter(u => u !== url))
    }

    useEffect(() => {
        if (urls && initialized.current) URLStorage.setValue(urls)
    }, [urls])

    return {
        urls,
        add,
        remove,
    }
}
