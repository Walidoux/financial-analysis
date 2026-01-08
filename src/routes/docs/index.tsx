import type { RouteSectionProps } from '@solidjs/router'
import { Meta, Title } from '@solidjs/meta'

import MDXContent from '~/content/pages/introduction/index.mdx'
import { SideNav } from '~/components/side-nav'
import { APP, NAV_HEIGHT } from '~/lib/store'

export default function IntroductionPage(_props: RouteSectionProps) {
  return (
    <>
      <Title>Introduction | {APP.LONG_NAME}</Title>
      <Meta
        content='Collection of beautiful UI components for SolidJS that work with Tailwind and PandaCSS, an unofficial port of magic ui to solidjs.'
        name='description'
      />
      <main
        class='grid grid-cols-[225px_1fr]'
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <SideNav />
        <section class='overflow-y-auto p-6'>
          <MDXContent />
        </section>
      </main>
    </>
  )
}
