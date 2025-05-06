import { FC, useId } from 'react';
import { csx } from '@vega-ui/utils';
import { Header } from '@/entrypoints/popup/components/Header/Header.tsx';
import { Button, Heading, IconButton, Label, Separator, Text, TextField } from '@vega-ui/react';
import { i18n } from '#i18n';
import { useTheme, useURLStore } from '@/entrypoints/popup/hooks';
import { URLList } from '@/entrypoints/popup/components/URLList';
import { URLListItem } from '@/entrypoints/popup/components/URLListItem';
import style from './style.module.css'
import { PlusIcon } from '@vega-ui/icons';

export const Main: FC = () => {
  const { theme } = useTheme()
  const [urlInputState, setURLInput] = useState('')
  const { urls: storedURLs, add: addURLToStore, remove: removeURLFromStore } = useURLStore()
  const fieldUrlId = useId()

  return (
    <main className={csx(theme, style.main)}>
      <Header />
      <form
        className={style.urlFieldset}
        onSubmit={(e) => {
          e.preventDefault()
          addURLToStore(urlInputState)
          setURLInput('')
        }}
      >
        <Label className={style.label} htmlFor={fieldUrlId}>{i18n.t('addSite')}:</Label>
        <div className={style.urlFieldWrapper}>
          <TextField
            placeholder='https://example.com'
            id={fieldUrlId}
            className={style.urlField}
            value={urlInputState}
            onChange={(e) => {
              setURLInput(e.target.value)
            }}
          />
          <IconButton type='submit' size='small'><PlusIcon/></IconButton>
        </div>
      </form>
      <div className={style.alternativeSeparator}>
        <Separator />
        <Text className={style.alternativeText}>{i18n.t('or')}</Text>
      </div>
      <Button
        variant='secondary'
        onClick={() => {
          browser.tabs.query({ active: true }).then((tabs) => {
            if (tabs.length < 1) return
           addURLToStore(tabs[0].url)
          })
        }}
      >
        {i18n.t('addCurrentSite')}
      </Button>
      <Separator/>
      <section>
        <Heading as='h3' size={3}>{i18n.t('enabledSites')}:</Heading>
        {storedURLs.length > 0 ? (
          <URLList>
            {storedURLs.map((url) => (
              <URLListItem onRemove={() => removeURLFromStore(url)} key={url}>{url}</URLListItem>
            ))}
          </URLList>
        ) : (
          <Text asChild className={style.emptyURLListText}><p>{i18n.t('listIsEmpty')}</p></Text>
        )}
      </section>
    </main>
  )
}