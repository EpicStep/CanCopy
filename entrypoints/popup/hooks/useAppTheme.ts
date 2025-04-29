import {storage} from "#imports";
import {useLayoutEffect} from "react";

export const useAppTheme = () => {
    const [state, setState] = useState(window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light')

    const storageKey = 'local:preferred-theme'

    useLayoutEffect(() => {
        storage.getItem(storageKey).then((val: string) => {
            if (!val) {
                return
            }

            setState(val)
        })
    }, [])

    const toggle = () => {
        setState((state) => {
            const nextState = state == 'dark' ? 'light' : 'dark'
            storage.setItem(storageKey, nextState)

            return nextState
        })
    }

    return [state, toggle]
}
