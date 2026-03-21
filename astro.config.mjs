// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    srcDir: './src_v2026',
    output: 'server',
    adapter: node({
        mode: 'standalone'
    })
});
