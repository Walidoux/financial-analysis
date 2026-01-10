import { useLocation } from '@solidjs/router'
import { createEffect, createSignal, type ParentComponent } from 'solid-js'

import { SideNav } from '~/components/side-nav'
import { SubNav } from '~/components/sub-nav'
import { NAV_HEIGHT } from '~/lib/store'
import { DocFooter } from './doc-footer'
import { allPages } from 'content-collections'
import Toc from './toc'

export const DocsLayout: ParentComponent = (props) => {
  const location = useLocation()
  const [headings, setHeadings] = createSignal<
    { depth: number; slug: string; text: string }[]
  >([])

  const path = location.pathname.split('/').slice(2) // Remove empty string and 'docs'
  const isRootDoc = path.length === 1
  const isSubPage = path.length > 1

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

  createEffect(() => {
    if (props.children) {
      const children = props.children as HTMLElement
      const hElements = children.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const data = Array.from(hElements).map((h) => ({
        depth: Number.parseInt(h.tagName[1], 10),
        slug: h.id,
        text: h.textContent?.trim() || '',
      }))
      setHeadings(data)
    }
  })

  return (
    <>
      <SideNav />
      {/*<SubNav pathname={location.pathname} />*/}
      <main
        class='grid grid-cols-[1fr_200px] grid-rows-[1fr_100px]'
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        <div class='overflow-y-auto p-6'>{props.children}</div>

        <Toc data={headings()} />

        <DocFooter
          next={allPages[currentIdx + 1]}
          previous={allPages[currentIdx - 1]}
        />
      </main>
    </>
  )
}
