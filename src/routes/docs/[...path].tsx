import { A } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { DocFooter } from '~/components/doc-footer'
import { DocsLayout } from '~/components/docs-layout'

import Toc from '~/components/toc'
import { Card, CardContent } from '~/components/ui/card'
import NotFound from '~/routes/[...404]'

export default function DocsPage(props: {
  params: { path: string[] | string }
}) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const [headings, setHeadings] = createSignal<
    { depth: number; slug: string; text: string }[]
  >([])

  let main!: HTMLElement

  const path = Array.isArray(props.params.path)
    ? props.params.path
    : props.params.path
      ? [props.params.path]
      : []
  const isRootDoc = path.length === 1
  const isSubPage = path.length === 2

  const currentPage = allPages.find((page) => {
    if (isRootDoc) {
      return page._meta.path === path[0]
    }
    if (isSubPage) {
      return page._meta.path === `${path[0]}/${path[1]}`
    }
    return false
  })
  const currentIdx = currentPage ? allPages.indexOf(currentPage) : -1

  const subPages = () =>
    allPages
      .filter(
        (page) =>
          page._meta.path.startsWith(`${path[0]}/`) &&
          page._meta.path !== `${path[0]}/index`
      )
      .map((page) => ({
        slug: page._meta.path.split('/')[1],
        title: page.title,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))

  createEffect(() => {
    if (MDXComp()) {
      const hElements = main.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const data = Array.from(hElements).map((h) => ({
        depth: Number.parseInt(h.tagName[1], 10),
        slug: h.id,
        text: h.textContent?.trim() || '',
      }))
      setHeadings(data)
    }
  })

  createEffect(() => {
    const fullPath = path.join('/')
    import(`~/docs/${fullPath}.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(() => {
        if (path.length === 1) {
          import(`~/docs/${fullPath}/index.mdx`)
            .then((mod) => setMDXComp(() => mod.default))
            .catch(() => setMDXComp(() => NotFound))
        } else {
          setMDXComp(() => NotFound)
        }
      })
  })

  return (
    <DocsLayout>
        <div
          class='overflow-y-auto'
          ref={(el) => {
            main = el
          }}>
          <Dynamic component={MDXComp()} />
          {isRootDoc && subPages().length > 0 && (
            <ul class='mt-6 grid grid-cols-3 gap-3'>
              <For each={subPages()}>
                {(page) => (
                  <Card class='min-h-12'>
                    <CardContent class='flex h-full items-center p-0'>
                      <A
                        class='w-full px-4 py-2'
                        href={`/docs/${path[0]}/${page.slug}`}>
                        {page.title}
                      </A>
                    </CardContent>
                  </Card>
                )}
              </For>
            </ul>
          )}
        </div>
        <Toc data={headings()} />
      {isSubPage && (
        <DocFooter
          next={allPages[currentIdx + 1]}
          previous={allPages[currentIdx - 1]}
        />
      )}
    </DocsLayout>
  )
}
