import { A, type Location } from '@solidjs/router'
import { BsPen } from 'solid-icons/bs'
import { createMemo, For, Show } from 'solid-js'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumbs'
import { sanitizeSlug } from '~/lib/utils'
import { internships } from './side-nav'

export function SubNav<T>(props: Partial<Location<T>>) {
  const segments = props.pathname?.split('/').filter(Boolean)

  segments?.shift()

  if ((segments?.length as number) <= 1) {
    return null
  }

  const constructSegment = (seg: string, idx: number) => {
    if (idx === 0) {
      return `/${seg}`
    }
    return `/${segments?.slice(0, idx + 1).join('/')}`
  }

  const redirectSrcFile = createMemo(() => {
    const segments = props.pathname?.split('/').filter(Boolean)
    const IDE = 'zed://file'
    const srcDir = IDE.concat(import.meta.env.CWD).concat('/src/content')

    segments?.shift()

    let docDir = segments?.join('/')

    console.log(docDir)
    if (
      internships[0].links.find((link) => link.href.includes(docDir as string))
    ) {
      docDir = docDir?.concat('/index')
    }

    docDir = docDir?.replace('docs', 'pages')

    return `${srcDir}/${docDir}.mdx`
  })

  return (
    <nav class='flex flex-items justify-between'>
      <Breadcrumb>
        <BreadcrumbList>
          <For each={segments}>
            {(segment, idx) => {
              return (
                <>
                  {/* TODO: if pathname has more than 5 segments add <BreadcrumbEllipsis /> at pos 1 of array index */}
                  <BreadcrumbItem>
                    <BreadcrumbLink href={constructSegment(segment, idx())}>
                      {sanitizeSlug(segment)}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <Show when={segments?.[idx() + 1]}>
                    <BreadcrumbSeparator />
                  </Show>
                </>
              )
            }}
          </For>
        </BreadcrumbList>
      </Breadcrumb>
      <Show when={process.env.NODE_ENV === 'development'}>
        <A class='inline-flex items-center gap-x-2' href={redirectSrcFile()}>
          <BsPen class='mb-0.5' />
          Edit File
        </A>
      </Show>
    </nav>
  )
}
