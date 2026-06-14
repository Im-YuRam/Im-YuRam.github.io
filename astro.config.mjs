// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  site: 'https://Im-YuRam.github.io',
  base: '/', // ⚠️重要：リポジトリ名を「/」から始めて必ず指定してください
  

  integrations: [react()]
});

