import { A } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'

import { DocsLayout } from '~/components/docs-layout'

import { Card, CardContent } from '~/components/ui/card'
import NotFound from '~/routes/[...404]'

export default function DocsPage(props: {
  params: { path: string[] | string }
}) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const [_headings, _setHeadings] = createSignal<
    { depth: number; slug: string; text: string }[]
  >([])

  let _main!: HTMLElement

  const path = () => {
    if (Array.isArray(props.params.path)) {
      return props.params.path
    }
    if (props.params.path) {
      return [props.params.path]
    }
    return []
  }
  const isRootDoc = () => path().length === 1

  const subPages = () =>
    allPages
      .filter(
        (page) =>
          page._meta.path.startsWith(`${path()[0]}/`) &&
          page._meta.path !== `${path()[0]}/index`
      )
      .map((page) => ({
        slug: page._meta.path.split('/')[1],
        title: page.title,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))

  createEffect(() => {
    const currentPath = path()
    const fullPath = currentPath.join('/')
    import(`~/docs/${fullPath}.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(() => {
        if (currentPath.length === 1) {
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
          _main = el
        }}>
        <Dynamic component={MDXComp()} />
        {isRootDoc() && subPages().length > 0 && (
          <ul class='mt-6 grid grid-cols-3 gap-3'>
            <For each={subPages()}>
              {(page) => (
                <Card class='min-h-12'>
                  <CardContent class='flex h-full items-center p-0'>
                    <A
                      class='w-full px-4 py-2'
                      href={`/docs/${path()[0]}/${page.slug}`}>
                      {page.title}
                    </A>
                  </CardContent>
                </Card>
              )}
            </For>
          </ul>
        )}
      </div>
    </DocsLayout>
  )
}
