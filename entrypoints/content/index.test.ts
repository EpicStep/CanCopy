import { describe, it, expect, vi, beforeEach } from 'vitest';
import defineContentScript  from './index.ts'
import { URLStorage } from '@/storage';

describe('content script', () => {
  beforeEach(async () => {
    await URLStorage.removeValue()
  })

  it('disabled', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://not-existent.com' })
    await URLStorage.setValue([
      'https://existed.com',
    ])

    const testContent = '<head></head><body><p oncopy="return false;">test-text</p></body>'
    setDocument(testContent)

    await defineContentScript.main({})

    expect(document.documentElement.innerHTML).toBe(testContent)
  })

  it('enabled, remove JS', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://existed.com' })
    await URLStorage.setValue([
      'https://existed.com',
    ])

    setDocument('<head></head><body><p oncopy="return false;">test-text</p></body>')

    await defineContentScript.main({})

    expect(document.documentElement.innerHTML).toBe('<head></head><body><p>test-text</p></body>')
  })

  it('enabled, remove CSS', async () => {
    vi.spyOn(window, 'location', 'get').mockReturnValue({ origin: 'https://existed.com' })
    await URLStorage.setValue([
      'https://existed.com',
    ])

    setDocument('<head></head><body><p style="user-select: none;">test-text</p></body>')

    await defineContentScript.main({})

    expect(document.documentElement.innerHTML).toBe('<head></head><body><p style="user-select: text;">test-text</p></body>')
  })
})

const parser = new DOMParser();

const setDocument = (str: string) => {
  global.document = parser.parseFromString(str, 'text/html')
}