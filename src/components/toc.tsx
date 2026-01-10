import { createIntersectionObserver } from '@solid-primitives/intersection-observer'
import { createEffect, createSignal, For } from 'solid-js'
import { isServer } from 'solid-js/web'

const Toc = (props: {
  data: { depth: number; slug: string; text: string }[]
}) => {
  const [targets, setTargets] = createSignal<Element[]>([])
  const [activeItem, setActiveItem] = createSignal<string[]>([])

  createEffect(() => {
    if (isServer) {
      return
    }

    const newTargets = props.data
      .map((item) => document.getElementById(item.slug))
      .filter((el) => el !== null) as Element[]
    setTargets(newTargets)
  })

  createIntersectionObserver(targets, (entries) => {
    if (isServer) {
      return
    }

    for (const entry of entries) {
      const id = entry.target.getAttribute('id')
      if (id === null) {
        return
      }

      if (entry.isIntersecting && !activeItem().includes(id)) {
        setActiveItem([...activeItem(), id])
        return
      }
      if (!entry.isIntersecting && activeItem().includes(id)) {
        setActiveItem(activeItem().filter((h) => h !== id))
        return
      }
    }
  })

  return (
    <aside class='sticky row-span-2 top-0 left-0 z-10 flex h-full flex-col gap-2 border-l p-6'>
      <p class='h-6 bg-background text-muted-foreground text-xs'>
        Sur cette page
      </p>
      <ul class='flex flex-col gap-2'>
        <For each={props.data}>
          {(item) => (
            <li
              class='text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6 data-[active=true]:text-primary'
              data-active={activeItem().includes(item.slug)}
              data-depth={item.depth}>
              <a href={`#${item.slug}`}>{item.text}</a>
            </li>
          )}
        </For>
      </ul>
    </aside>
  )
}

export default Toc
