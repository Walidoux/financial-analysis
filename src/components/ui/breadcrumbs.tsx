import { A, type AnchorProps } from '@solidjs/router'
import { AiOutlineEllipsis } from 'solid-icons/ai'
import { TbChevronRight } from 'solid-icons/tb'
import type { ComponentProps } from 'solid-js'
import { cn } from 'tailwind-variants'

function Breadcrumb({ ...props }: ComponentProps<'nav'>) {
  return <nav aria-label='breadcrumb' data-slot='breadcrumb' {...props} />
}
function BreadcrumbList({ class: className, ...props }: ComponentProps<'ol'>) {
  return (
    <ol
      class={cn(
        'wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5',
        className
      )}
      data-slot='breadcrumb-list'
      {...props}
    />
  )
}

function BreadcrumbItem({ class: className, ...props }: ComponentProps<'li'>) {
  return (
    <li
      class={cn('inline-flex items-center gap-1.5', className)}
      data-slot='breadcrumb-item'
      {...props}
    />
  )
}

function BreadcrumbLink({ class: className, ...props }: AnchorProps) {
  return (
    <A
      class={cn('transition-colors hover:text-foreground', className)}
      data-slot='breadcrumb-link'
      {...props}
    />
  )
}

function BreadcrumbPage({
  class: className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-current='page'
      aria-disabled='true'
      class={cn('font-normal text-foreground', className)}
      data-slot='breadcrumb-page'
      role='link'
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  class: className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      aria-hidden='true'
      class={cn('[&>svg]:size-3.5', className)}
      data-slot='breadcrumb-separator'
      role='presentation'
      {...props}>
      {children ?? <TbChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  class: className,
  ...props
}: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden='true'
      class={cn('flex size-9 items-center justify-center', className)}
      data-slot='breadcrumb-ellipsis'
      role='presentation'
      {...props}>
      <AiOutlineEllipsis class='size-4' />
      <span class='sr-only'>More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
