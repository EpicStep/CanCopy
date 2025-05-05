import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-react', '@wxt-dev/i18n/module', '@wxt-dev/auto-icons'],
  manifest: {
    default_locale: 'en',
    permissions: ['storage', 'activeTab'],
  },
});
