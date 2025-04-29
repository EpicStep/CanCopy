import {
    Card,
    TextField,
    Text,
    IconButton,
    Heading,
    Label,
} from '@adara-cs/ui-kit-web';
import './App.css';
import { i18n } from '#i18n';
import {csx} from "@adara-cs/utils";
import {useAppTheme} from "@/entrypoints/popup/hooks/useAppTheme.ts";
import {useURLStore} from "@/entrypoints/popup/hooks/useURLStore.ts";
import {Header} from "@/entrypoints/popup/components/Header/Header.tsx";


function App() {
    const [theme] = useAppTheme()
    const [urlInputState, setURLInput] = useState('')
    const [storedURLs, addURLToStore] = useURLStore()

    const urlList = storedURLs.map(url => {
        return (
            <Card className='side-card' size='small'>
                <Text className='side-card-text'>{url}</Text>
                <IconButton name='minus' size='small' />
            </Card>
        )
    })

    return (
        <main className={csx(theme, 'main')}>
            <Header />
            <Label htmlFor='side-add'>{i18n.t('addSite')}:</Label>
            <div className='side-add' id='side-add'>
                <TextField
                    value={urlInputState}
                    onChange={(e) => {
                        setURLInput(e.target.value)
                    }}
                />
                <IconButton
                    name='plus'
                    size='small'
                    onClick={() => {
                        addURLToStore(urlInputState)
                        setURLInput('')
                    }}
                />
            </div>
            <Heading size='3'>{i18n.t('enabledSites')}:</Heading>
            <div>
                {urlList}
            </div>
        </main>
    );
}

export default App;
