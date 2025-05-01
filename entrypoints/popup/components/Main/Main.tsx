import { FC, useId } from 'react';
import { csx } from '@adara-cs/utils';
import { Header } from '@/entrypoints/popup/components/Header/Header.tsx';
import { Button, Heading, IconButton, Label, Separator, Text, TextField } from '@adara-cs/ui-kit-web';
import { i18n } from '#i18n';
import { useTheme, useURLStore } from '@/entrypoints/popup/hooks';
import { URLList } from '@/entrypoints/popup/components/URLList';
import { URLListItem } from '@/entrypoints/popup/components/URLListItem';
import style from './style.module.css'

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
          <IconButton
            type='submit'
            name='plus'
            size='small'
          />
        </div>
      </form>
      <div className={style.alternativeSeparator}>
        <Separator />
        <Text className={style.alternativeText}>Или</Text>
      </div>
      <Button variant='secondary'>
        Добавить текущий
      </Button>
      <Separator />
      <section>
        <Heading as='h3' size={3}>{i18n.t('enabledSites')}:</Heading>
        <URLList>
          {storedURLs.map((url) => (
            <URLListItem onRemove={() => removeURLFromStore(url)} key={url}>{url}</URLListItem>
          ))}
        </URLList>
      </section>
    </main>
  )
}