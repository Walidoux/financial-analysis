import { For } from 'solid-js'
import type { SolidMarkdownOptions } from 'solid-markdown'
import { cn } from '~/lib/utils'

export const Typography: SolidMarkdownOptions['components'] = {
  h1(props) {
    return (
      <h1
        class={cn(
          'scroll-m-20 text-balance font-extrabold text-4xl tracking-tight',
          props.class
        )}>
        {props.children}
      </h1>
    )
  },

  h2(props) {
    return (
      <h2
        class={cn(
          'mt-10 scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0',
          props.class
        )}>
        {props.children}
      </h2>
    )
  },

  h3(props) {
    return (
      <h3
        class={cn(
          'mt-6 scroll-m-20 font-semibold text-2xl tracking-tight',
          props.class
        )}>
        {props.children}
      </h3>
    )
  },

  h4(props) {
    return (
      <h4
        class={cn(
          'mt-4 scroll-m-20 font-semibold text-xl tracking-tight',
          props.class
        )}>
        {props.children}
      </h4>
    )
  },

  p(props) {
    return (
      <p class={cn('not-first:mt-6 text-justify leading-7', props.class)}>
        {props.children}
      </p>
    )
  },

  blockquote(props) {
    return (
      <blockquote class={cn('mt-6 border-l-2 pl-6 italic', props.class)}>
        {props.children}
      </blockquote>
    )
  },

  table(props) {
    if (
      !props.data.rows.every((row) => row.length === props.data.headers.length)
    ) {
      return 'Error: Headers size should match the each row size'
    }

    return (
      <div class={cn('my-6 w-full overflow-y-auto', props.class)}>
        <table class='w-full'>
          <thead>
            <tr class='m-0 border-t p-0 even:bg-muted'>
              <For each={props.data.headers}>
                {(header) => (
                  <th class='border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right'>
                    {header}
                  </th>
                )}
              </For>
            </tr>
          </thead>
          <tbody>
            <For each={props.data.rows}>
              {(row) => (
                <tr class='m-0 border-t p-0 even:bg-muted'>
                  <For each={row}>
                    {(cell) => (
                      <td class='border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right'>
                        {cell}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    )
  },

  ul(props) {
    return (
      <ul class={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.class)}>
        {props.children}
      </ul>
    )
  },

  code(props) {
    return (
      <code
        class={cn(
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm',
          props.class
        )}>
        {props.children}
      </code>
    )
  },
}
