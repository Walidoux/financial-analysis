import { type RouteSectionProps, useLocation } from '@solidjs/router'
import { allPages } from 'content-collections'
import { type Component, createEffect, createSignal } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { DocFooter } from '~/components/doc-footer'

import { Metadata } from '~/components/metadata'
import { SubNav } from '~/components/sub-nav'
import NotFound from '~/routes/[...404]'

export default function Subpage(props: RouteSectionProps) {
  const [MDXComp, setMDXComp] = createSignal<Component>()
  const { pathname } = useLocation()

  const currentPage = allPages.find(
    (page) => page.title.toLowerCase() === props.params.subpage
  )
  const currentIdx = allPages.indexOf(
    currentPage as NonNullable<typeof currentPage>
  )

  createEffect(() => {
    import(`~/content/pages/${props.params.ese}/${props.params.subpage}.mdx`)
      .then((mod) => setMDXComp(() => mod.default))
      .catch(() => setMDXComp(() => NotFound))
  })

  return (
    <>
      <Metadata title={props.params.subpage as string} />
      <SubNav pathname={pathname} />
      <main class='p-6'>
        <Dynamic component={MDXComp()} />
      </main>
      <DocFooter
        next={allPages[currentIdx + 1]}
        previous={allPages[currentIdx - 1]}
      />
    </>
  )
}
