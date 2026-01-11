import { toaster } from '@kobalte/core/toast'
import { A, type Location } from '@solidjs/router'
import { BsPen } from 'solid-icons/bs'
import { TbCircleCheck } from 'solid-icons/tb'
import { createMemo, For, Show } from 'solid-js'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '~/components/ui/breadcrumbs'
import { sanitizeSlug } from '~/lib/utils'
import { internships } from './side-nav'
import { Button } from './ui/button'
import { Toast, ToastContent, ToastDescription, ToastTitle } from './ui/toast'

export function SubNav<T>(props: Partial<Location<T>>) {
  const segments = props.pathname?.split('/').filter(Boolean)

  segments?.shift()

  if ((segments?.length as number) <= 1) {
    return null
  }

  const safeSegments = segments as string[]

  const constructSegment = (seg: string, idx: number) => {
    if (idx === 0) {
      return `/${seg}`
    }
    return `/${safeSegments.slice(0, idx + 1).join('/')}`
  }

  const redirectSrcFile = createMemo(() => {
    const segments = props.pathname?.split('/').filter(Boolean)
    const IDE = 'zed://file'
    const srcDir = IDE.concat(import.meta.env.CWD).concat('/src/docs')

    segments?.shift()

    let docDir = segments?.join('/')

    if (
      internships[0].links.find((link) => link.href.includes(docDir as string))
    ) {
      docDir = docDir?.concat('/index')
    }

    return `${srcDir}/${docDir}.mdx`
  })

  const _showToastRedirection = () => {
    toaster.show((props) => (
      <Toast toastId={props.toastId}>
        <ToastContent>
          <TbCircleCheck class='row-span-2 my-auto text-primary' size={24} />
          <ToastTitle>Document ouvert</ToastTitle>
          <ToastDescription>
            Consultez-le depuis votre IDE si ce dernier est ouvert.
          </ToastDescription>
        </ToastContent>
      </Toast>
    ))
  }

  return (
    <nav class='sticky top-0 col-span-2 flex items-center justify-between border-b p-4 px-6 backdrop-blur-md'>
      <Breadcrumb>
        <BreadcrumbList>
          <Show
            fallback={
              <For each={safeSegments}>
                {(segment, idx) => (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink href={constructSegment(segment, idx())}>
                        {sanitizeSlug(segment)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <Show when={safeSegments[idx() + 1]}>
                      <BreadcrumbSeparator />
                    </Show>
                  </>
                )}
              </For>
            }
            when={safeSegments.length > 5}>
            <BreadcrumbItem>
              <BreadcrumbLink href={constructSegment(safeSegments[0], 0)}>
                {sanitizeSlug(safeSegments[0])}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbEllipsis />
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={constructSegment(
                  // biome-ignore lint/style/noNonNullAssertion: safeSegments is guaranteed to be non-empty
                  safeSegments.at(-1)!,
                  safeSegments.length - 1
                )}>
                {/* biome-ignore lint/style/noNonNullAssertion: safeSegments is guaranteed to be non-empty */}
                {sanitizeSlug(safeSegments.at(-1)!)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Show>
        </BreadcrumbList>
      </Breadcrumb>
      <Show when={process.env.NODE_ENV === 'development'}>
        <Button onClick={_showToastRedirection} variant='outline'>
          <A class='inline-flex items-center gap-x-2' href={redirectSrcFile()}>
            <BsPen />
            Modifier
          </A>
        </Button>
      </Show>
    </nav>
  )
}
