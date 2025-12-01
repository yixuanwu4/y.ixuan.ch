// @ts-check
import { defineConfig } from 'astro/config';
import Icons from 'unplugin-icons/vite'

// https://astro.build/config
export default defineConfig({
  server: {
    host: true
  },
  site: 'https://y.ixuan.ch',
  vite: {
    plugins: [
      Icons({
        compiler: 'astro',
      }),
    ],
  },
});