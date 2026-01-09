import { type ComponentProps, splitProps } from 'solid-js'
import { cn } from 'tailwind-variants'

export type KbdProps = ComponentProps<'kbd'>

export const Kbd = (props: KbdProps) => {
  const [, rest] = splitProps(props, ['class'])

  return (
    <kbd
      class={cn(
        'pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm bg-muted px-1 font-medium font-sans text-muted-foreground text-xs',
        "[&_svg:not([class*='size-'])]:size-3",
        '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
        props.class
      )}
      data-slot='kbd'
      {...rest}
    />
  )
}

export type KbdGroupProps = ComponentProps<'div'>

export const KbdGroup = (props: KbdGroupProps) => {
  const [, rest] = splitProps(props, ['class'])

  return (
    <div
      class={cn('inline-flex items-center gap-1', props.class)}
      data-slot='kbd-group'
      {...rest}
    />
  )
}
