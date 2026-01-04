import { useLocation } from '@solidjs/router'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import type { Component } from 'solid-js'
import { createResource, Show } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import { Typography as CustomTypography } from '../design/custom-typography'
import { Typography as BaseTypography } from './base-typography'

const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  as: 'raw',
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()

  const path = () => location.pathname.replace('/docs/', '') || ''

  const loadContent = async (docPath: string) => {
    if (!docPath) return ''

    try {
      const modulePath = (ext: string) => `../../docs/${docPath}.${ext}`
      const module =
        docsModules[modulePath('mdx')] || docsModules[modulePath('md')]

      if (module) {
        const content = await module()
        return content
      }
      return `# Error\n\nDocument not found: ${docPath}`
    } catch (error) {
      console.error(`Failed to load ${docPath}:`, error)
      return `# Error\n\nCould not load documentation for ${docPath}.`
    }
  }

  const [markdownContent] = createResource(path, loadContent)

  return (
    <div class='mx-auto max-w-3xl p-8'>
      <Show fallback={<div>Loading...</div>} when={!markdownContent.loading}>
        <SolidMarkdown
          children={markdownContent() || ''}
          components={{ ...BaseTypography, ...CustomTypography }}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          remarkPlugins={[remarkMath]}
          renderingStrategy='reconcile'
        />
      </Show>
    </div>
  )
}

export default Docs
