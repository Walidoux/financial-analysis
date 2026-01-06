import { Meta, Title } from '@solidjs/meta'
import type { RouteSectionProps } from '@solidjs/router'
import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'

export default function Subpage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()

  createEffect(() => {
    import(`~/content/pages/${props.params.ese}/${props.params.subpage}.mdx?raw`).then((mod) =>
      setMDXComp(() => mod.default)
    )
  })

  return (
    <>
      <Title>{props.params.subpage} | Finance Career</Title>
      <Meta
        content='Collection of beautiful UI components for SolidJS that work with Tailwind and PandaCSS, an unofficial port of magic ui to solidjs.'
        name='description'
      />
      <Dynamic component={MDXComp()} />
    </>
  )
}
