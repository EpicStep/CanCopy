import { describe, it, expect, vi, beforeEach } from 'vitest';
import defineContentScript  from './index.ts'
import { URLStorage } from '@/storage';

describe('content script', () => {
  beforeEach(async () => {
    await URLStorage.removeValue()
  })

  it('disabled', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://not-existent.com' } as Location)
    await URLStorage.setValue([
      'https://existed.com',
    ])

    const testContent = '<head></head><body><p oncopy="return false;">test-text</p></body>'
    setDocument(testContent)

    await defineContentScript.main({} as any)

    expect(document.documentElement.innerHTML).toBe(testContent)
  })

  it('enabled, remove JS', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://existed.com' } as Location)
    await URLStorage.setValue([
      'https://existed.com',
    ])

    setDocument('<head></head><body><p oncopy="return false;">test-text</p></body>')

    await defineContentScript.main({} as any)

    expect(document.querySelector('p')?.hasAttribute('oncopy')).toBe(false)

    const styleElement = document.querySelector('style');
    expect(styleElement).not.toBeNull();
    expect(styleElement?.textContent).toContain('html body *');
    expect(styleElement?.textContent).toContain('user-select: text !important');
    expect(styleElement?.textContent).toContain('-webkit-user-select: text !important');
    expect(styleElement?.textContent).toContain('-moz-user-select: text !important');
    expect(styleElement?.textContent).toContain('-ms-user-select: text !important');
  })

  it('enabled, remove CSS', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://existed.com' } as Location)
    await URLStorage.setValue([
      'https://existed.com',
    ])

    setDocument('<head></head><body><p style="user-select: none;">test-text</p></body>')

    await defineContentScript.main({} as any)

    // Check that our style element was added
    const styleElement = document.querySelector('style');
    expect(styleElement).not.toBeNull();
    expect(styleElement?.textContent).toContain('html body *');
    expect(styleElement?.textContent).toContain('user-select: text !important');
    expect(styleElement?.textContent).toContain('-webkit-user-select: text !important');
    expect(styleElement?.textContent).toContain('-moz-user-select: text !important');
    expect(styleElement?.textContent).toContain('-ms-user-select: text !important');
  })
})

const parser = new DOMParser();

const setDocument = (str: string) => {
  global.document = parser.parseFromString(str, 'text/html')
}