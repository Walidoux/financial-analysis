import { defineCollection, defineConfig } from '@content-collections/core'
import { categoriesKeys } from '~/lib/store'

const pages = defineCollection({
  name: 'pages',
  directory: 'src/docs',
  include: '*/**/*.mdx',
  schema: (z) => ({
    title: z.string(),
  }),
})

const docs = defineCollection({
  name: 'docs',
  directory: 'src/docs',
  include: '*.mdx',
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    category: z.enum(categoriesKeys),
  }),
})

export default defineConfig({
  collections: [pages, docs],
})
