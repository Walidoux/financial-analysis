import type { RouteSectionProps } from '@solidjs/router'
import { Metadata } from '~/components/metadata'
import { SideNav } from '~/components/side-nav'
import MDXContent from '~/content/pages/introduction/index.mdx'
import { NAV_HEIGHT } from '~/lib/store'

export default function IntroductionPage(_props: RouteSectionProps) {
  return (
    <>
      <Metadata title='Introduction' />
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
