import { useLocation } from '@solidjs/router'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import type { Component } from 'solid-js'
import { createResource, Show } from 'solid-js'
import { SolidMarkdown } from 'solid-markdown'
import pkg from '~/../package.json'
import { Typography as BaseTypography } from './base-typography'
import { Typography as CustomTypography } from './custom-typography'

const BASE_REGEX = new RegExp(`^/?${pkg.name}/?`)
const DOCS_REGEX = /^\/?docs\/?/
const HEADING_REGEX = /^#{1,2} /m

const docsModules = import.meta.glob('../../docs/**/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: false,
})

const Docs: Component = () => {
  const location = useLocation()

  const path = () =>
    location.pathname.replace(BASE_REGEX, '').replace(DOCS_REGEX, '') || ''

  const loadContent = async (docPath: string) => {
    if (!docPath) {
      return ''
    }

    try {
      const modulePath = (ext: string) => `../../docs/${docPath}.${ext}`
      let module =
        docsModules[modulePath('mdx')] || docsModules[modulePath('md')]

      if (!module) {
        const searchPath = `/${docPath}.mdx`
        const foundKey = Object.keys(docsModules).find((key) =>
          key.endsWith(searchPath)
        )
        if (foundKey) {
          module = docsModules[foundKey]
        } else {
          const searchPathMd = `/${docPath}.md`
          const foundKeyMd = Object.keys(docsModules).find((key) =>
            key.endsWith(searchPathMd)
          )
          if (foundKeyMd) {
            module = docsModules[foundKeyMd]
          }
        }
      }

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

  const splitContent = (content: string) => {
    if (!content) return ['', '', '']

    // Split content by major headings (H1 and H2)
    const sections = content.split(HEADI&NG_REGEX)

    // Filter out empty sections and add back the # prefix
    const validSections = sections
      .map((section, index) => (index === 0 ? section : `#${section}`))
      .filter((section) => section.trim().length > 0)

    // If we have fewer than 3 sections, split by lines
    if (validSections.length < 3) {
      const lines = content.split('\n')
      const totalLines = lines.length
      const linesPerPanel = Math.ceil(totalLines / 3)

      const panel1 = lines.slice(0, linesPerPanel).join('\n')
      const panel2 = lines.slice(linesPerPanel, linesPerPanel * 2).join('\n')
      const panel3 = lines.slice(linesPerPanel * 2).join('\n')

      return [panel1, panel2, panel3]
    }

    // Distribute sections across 3 panels
    const sectionsPerPanel = Math.ceil(validSections.length / 3)

    const panel1 = validSections.slice(0, sectionsPerPanel).join('')
    const panel2 = validSections
      .slice(sectionsPerPanel, sectionsPerPanel * 2)
      .join('')
    const panel3 = validSections.slice(sectionsPerPanel * 2).join('')

    return [panel1, panel2, panel3]
  }

  const panels = () => {
    const content = markdownContent()
    return content ? splitContent(content) : ['', '', '']
  }

  return (
    <div class='flex gap-6 h-screen overflow-hidden'>
      {panels().map((panelContent) => (
        <div class='flex-1 overflow-y-auto'>
          <div class='mx-auto max-w-3xl p-8'>
            <Show
              fallback={<div>Loading...</div>}
              when={!markdownContent.loading}
              children={
                <SolidMarkdown
                  children={panelContent}
                  components={{ ...BaseTypography, ...CustomTypography }}
                  rehypePlugins={[rehypeRaw, rehypeKatex]}
                  remarkPlugins={[remarkMath]}
                  renderingStrategy='reconcile'
                />
              }
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Docs
