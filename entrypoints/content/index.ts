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
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    html body * {
      user-select: text !important;
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
    }
  `;
  document.head.appendChild(styleElement);

  document.querySelectorAll('*').forEach(el => {
    el.removeAttribute('oncopy')
    el.removeAttribute('oncut')
    el.removeAttribute('oncontextmenu')
  })
}