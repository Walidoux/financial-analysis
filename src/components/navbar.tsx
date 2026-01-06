import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = () => {
 	return (
 		<nav class="sticky top-0 border-b">
 		  <div class="max-w-6xl py-2 px-3 flex items-center justify-between mx-auto h-full">
        <img src="/logo.svg" alt="Logo" height={50} width={50} draggable={false} class="select-none" />
    		<ThemeSwitcher />
      </div>
 		</nav>
 	);
 };
