import { LoaderCircle } from 'lucide-solid'
import type { ComponentProps } from 'solid-js'
import { cn } from '~/lib/utils'

function Spinner({ class: className, ...props }: ComponentProps<'svg'>) {
  return (
    <LoaderCircle
      aria-label='Loading'
      class={cn('size-4 animate-spin', className)}
      role='status'
      {...props}
    />
  )
}

export { Spinner }
