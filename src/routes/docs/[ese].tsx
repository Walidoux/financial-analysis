import type { RouteSectionProps } from "@solidjs/router";
import { A } from "@solidjs/router";
import { allDocs } from "content-collections";
import { type Component, For, type ParentComponent } from "solid-js";

const categoryMap: Record<typeof allDocs[number]["category"], string> = {
		calculs: "Calculs",
		generalites: "Généralités"
	};

const defaultSubSections = [
	{
		title: "Overview",
		links: [
			{ title: "Introduction", href: "/docs/" },
			{ title: "Nestlé", href: "/docs/nestle" },
			{ title: "DOOC", href: "/docs/dooc" },
		],
	},
];

const SideNavLink: ParentComponent<{ href: string }> = (props) => {
  const href = props.href.replace("{{ese}}", props.ese)
	return (
		<A
			href={href}
			class='text-sm'
		  inactiveClass='opacity-50'
		  activeClass='font-medium text-primary'
			end>
			{props.children}
		</A>
	);
};

const SideNav: Component<{ ese: string }> = (props) => {
	const sections = [
		...defaultSubSections,
		...Object.entries(
			allDocs.reduce(
				(acc: Record<string, { title: string; href: string }[]>, doc) => {
					const category = doc.category;
					if (!acc[category]) {
						acc[category] = [];
					}
					acc[category].push({
						title: doc.title,
						href: `/docs/{{ese}}/components/${doc._meta.path}`,
					});
					return acc;
				},
				{},
			),
		)
			.sort()
			.map(([category, links]) => ({
				title: categoryMap[category as keyof typeof categoryMap],
				links: links.sort(),
			})),
	];

	return (
		<aside class="sticky max-w-xl p-6 flex flex-col flex-1 gap-y-6 overflow-y-auto">
				<For each={sections}>
					{(section) => (
						<div class="flex flex-col gap-y-2">
							<h4>{section.title}</h4>
							<For each={section.links}>
								{(link) => (
									<SideNavLink href={link.href}>
										{link.title}
									</SideNavLink>
								)}
							</For>
						</div>
					)}
				</For>
		</aside>
	);
};

export default function DocsLayout(props: RouteSectionProps) {
	return (
			<main class="grid grid-cols-[200px_1fr] gap-6 h-full">
				<SideNav ese={props.params.ese} />

				<section class="border h-full p-6">
					{props.children}
				</section>
			</main>
	);
}
