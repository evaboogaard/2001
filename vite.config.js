import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/',
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'public/img/*',
          dest: 'assets/img'
        }
      ]
    })
  ]
});
