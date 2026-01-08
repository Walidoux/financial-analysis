import { TbMoon, TbSun } from 'solid-icons/tb'
import { Show } from 'solid-js'
import { useTheme } from '../providers/theme-provider'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme() === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      aria-label='Toggle theme'
      class='inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md font-medium text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
      onClick={toggleTheme}
      type='button'>
      <Show fallback={<TbMoon />} when={theme() === 'dark'}>
        <TbSun />
      </Show>
    </button>
  )
}
