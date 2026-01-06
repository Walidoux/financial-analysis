import { TbMoon, TbSun } from "solid-icons/tb";
import { Show } from "solid-js";
import { useTheme } from "../providers/theme-provider";

export const ThemeSwitcher = () => {
 	const { theme, setTheme } = useTheme();

 	const toggleTheme = () => {
 		setTheme(theme() === "dark" ? "light" : "dark");
 	};

 	return (
 		<button
 			onClick={toggleTheme}
 			class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10"
 			aria-label="Toggle theme"
 		>
 			<Show when={theme() === "dark"} fallback={<TbMoon />}>
 				<TbSun />
 			</Show>
 		</button>
 	);
 };
