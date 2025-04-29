import {storage} from "#imports";
import {useLayoutEffect} from "react";

export const useURLStore = () => {
    const [state, setState] = useState<string[]>([])

    const storageKey = 'local:processing-urls'

    useLayoutEffect(() => {
        storage.getItem(storageKey).then((val: string[]) => {
            if (!val) {
                return
            }

            setState(val)
        })
    }, [])

    // TODO: where to validate?
    const add = (url: string) => {
        setState((state) => {
            let nextState = [
                ...state,
                url
            ]

            storage.setItem(storageKey, nextState)

            return nextState
        })
    }

    return [state, add]
}
