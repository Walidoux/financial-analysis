import { type RouteSectionProps } from '@solidjs/router'
import { allPages } from 'content-collections'

import { DocFooter } from '~/components/doc-footer'
import { DocsLayout } from '~/components/docs-layout'
import MDXContent from '~/docs/introduction.mdx'

/** Introduction Docs Page */
export default function IntroductionPage(_props: RouteSectionProps) {
  const pageTitle = 'Introduction'
  const currentPage = allPages.find((page) => page.title === pageTitle)
  const currentIdx = allPages.indexOf(
    currentPage as NonNullable<typeof currentPage>
  )

  return (
    <DocsLayout>
      <div class='overflow-y-auto p-6'>
        <MDXContent />
      </div>
      <DocFooter
        next={allPages[currentIdx + 1]}
        previous={allPages[currentIdx - 1]}
      />
    </DocsLayout>
  )
}
