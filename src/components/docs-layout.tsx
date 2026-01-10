import { useLocation } from '@solidjs/router'
import type { ParentComponent } from 'solid-js'

import { SideNav } from '~/components/side-nav'
import { SubNav } from '~/components/sub-nav'
import { NAV_HEIGHT } from '~/lib/store'

export const DocsLayout: ParentComponent = (props) => {
  const location = useLocation()

  return (
    <>
      <SideNav />
      {/*<SubNav pathname={location.pathname} />*/}
      <main
        class='grid grid-rows-[1fr_100px] grid-cols-[1fr_200px]'
        style={{ height: `calc(100vh - ${NAV_HEIGHT}px)` }}>
        {props.children}
      </main>
    </>
  )
}
