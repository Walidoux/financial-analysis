import { defineConfig } from "@solidjs/start/config";
import tsconfigPaths from "vite-tsconfig-paths";
import contentCollections from "@content-collections/solid-start";
import tailwindcss from '@tailwindcss/vite'

/* @ts-ignore */
import pkg from "@vinxi/plugin-mdx";
const { default: mdx } = pkg;
import remarkFrontmatter from "remark-frontmatter";

export default defineConfig({
	extensions: ["mdx"],
	vite: {
		plugins: [
		  tailwindcss(),
			tsconfigPaths(),
			contentCollections(),
			mdx.withImports({})({
				jsx: true,
				jsxImportSource: "solid-js",
				providerImportSource: "~/tools/solid-mdx",
				remarkPlugins: [remarkFrontmatter],
			}),
		],
	},
	server: {
		prerender: {
			crawlLinks: true,
		},
		// see https://github.com/solidjs/solid-start/issues/1614
		esbuild: { options: { target: "esnext" } },
	},
});
