import { type RouteSectionProps, useLocation } from '@solidjs/router'
import { allPages } from 'content-collections'

import { DocFooter } from '~/components/doc-footer'
import { Metadata } from '~/components/metadata'
import { SideNav } from '~/components/side-nav'
import { SubNav } from '~/components/sub-nav'
import MDXContent from '~/content/pages/introduction/index.mdx'
import { NAV_HEIGHT } from '~/lib/store'

export default function IntroductionPage(_props: RouteSectionProps) {
  const { pathname } = useLocation()

  const pageTitle = 'Introduction'
  const currentPage = allPages.find((page) => page.title === pageTitle)
  const currentIdx = allPages.indexOf(
    currentPage as NonNullable<typeof currentPage>
  )

  return (
    <>
      <Metadata title={pageTitle} />
      <main
        class='grid grid-cols-[225px_1fr]'
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <SideNav />
        <section class='overflow-y-auto p-6'>
          <SubNav pathname={pathname} />
          <MDXContent />
          <DocFooter
            next={allPages[currentIdx + 1]}
            previous={allPages[currentIdx - 1]}
          />
        </section>
      </main>
    </>
  )
}
