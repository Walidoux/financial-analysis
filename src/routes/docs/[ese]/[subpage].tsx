import type { RouteSectionProps } from '@solidjs/router'
import type { Component } from 'solid-js'
import { createEffect, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { Metadata } from '~/components/metadata'
import NotFound from '~/routes/[...404]'

export default function Subpage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()

  createEffect(() => {
    import(`~/content/pages/${props.params.ese}/${props.params.subpage}.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(() => setMDXComp(() => NotFound))
  })

  return (
    <>
      <Metadata title={props.params.subpage as string} />
      <Dynamic component={MDXComp()} />
    </>
  )
}
