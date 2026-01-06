import contentCollections from '@content-collections/solid-start'
import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
// @ts-expect-error does not export dts
import pkg from '@vinxi/plugin-mdx'
import remarkMath from 'remark-math'
import tsconfigPaths from 'vite-tsconfig-paths'

const { default: mdx } = pkg

import rehypemathJax from 'rehype-mathjax'
import remarkFrontmatter from 'remark-frontmatter'

export default defineConfig({
  extensions: ['mdx'],
  vite: {
    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      contentCollections(),
      mdx.withImports({})({
        jsxImportSource: 'solid-jsx',
        providerImportSource: '~/tools/solid-mdx',
        remarkPlugins: [remarkFrontmatter, remarkMath],
        rehypePlugins: [rehypemathJax],
      }),
    ],
  },
  server: {
    prerender: {
      crawlLinks: true,
    },
    // see https://github.com/solidjs/solid-start/issues/1614
    esbuild: { options: { target: 'esnext' } },
  },
})
