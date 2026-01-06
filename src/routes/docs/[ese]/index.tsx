import { Meta, Title } from '@solidjs/meta'
import { A, type RouteSectionProps } from '@solidjs/router'
import type { Component } from 'solid-js'
import { createSignal, createEffect, For } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { allPages } from 'content-collections'
import { Card, CardContent } from '~/components/ui/card'

export default function EsePage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const subPages = () =>
    allPages
      .filter(
        (page) =>
          page._meta.path.startsWith(`${props.params.ese}/`) &&
          page._meta.path !== `${props.params.ese}/index`
      )
      .map((page) => ({
        slug: page._meta.path.split('/')[1],
        title: page.title,
      }))
      .sort((a, b) => a.title.localeCompare(b.title))

  createEffect(() => {
    const ese = props.params.ese
    import(`~/content/pages/${ese}/index.mdx`).then((mod) =>
      setMDXComp(() => mod.default)
    )
  })

  return (
    <>
      <Title>{props.params.ese} | Finance Career</Title>
      <Meta
        name='description'
        content='Collection of beautiful UI components for SolidJS that work with Tailwind and PandaCSS, an unofficial port of magic ui to solidjs.'
      />
      <Dynamic component={MDXComp()} />
      <ul class='grid grid-cols-3 gap-3 mt-6'>
        <For each={subPages()}>
          {(page) => (
            <Card>
              <CardContent>
                <A href={`/docs/${props.params.ese}/${page.slug}`}>
                  {page.title}
                </A>
              </CardContent>
            </Card>
          )}
        </For>
      </ul>
    </>
  )
}
