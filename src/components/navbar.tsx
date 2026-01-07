import { ThemeSwitcher } from './theme-switcher'

export const Navbar = () => {
  return (
    <nav class='sticky top-0 flex-1 border-b'>
      <div class='mx-auto flex h-full max-w-6xl items-center justify-between px-3 py-2'>
        <img
          alt='Logo'
          class='select-none'
          draggable={false}
          height={50}
          src='/logo.svg'
          width={50}
        />
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
