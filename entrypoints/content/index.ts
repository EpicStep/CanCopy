import { URLStorage } from '@/storage';

export default defineContentScript({
  matches: ['*://*/*'],
  async main() {
    const currentLocation = window.location.origin;

    const processingURLs = await URLStorage.getValue()
    if (!processingURLs || !processingURLs.includes(currentLocation)) return

    removeCopyLocks(document)
  },
});

const removeCopyLocks = (document: Document) => {
  document.querySelectorAll('*').forEach(el => {
    if (el.style.userSelect != '') el.style.userSelect = 'text';
    if (el.style.webkitUserSelect != '') el.style.webkitUserSelect = 'text';
    if (el.style.MozUserSelect != '') el.style.MozUserSelect = 'text';
    if (el.style.msUserSelect != '') el.style.msUserSelect = 'text';

    el.removeAttribute('oncopy')
    el.removeAttribute('oncut')
    el.removeAttribute('oncontextmenu')
  })
}