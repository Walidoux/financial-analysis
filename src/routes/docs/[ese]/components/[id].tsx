import { Meta, Title } from "@solidjs/meta";
import type { RouteSectionProps } from "@solidjs/router";
import { allDocs } from "content-collections";
import { createMemo } from "solid-js";
import { useMDXComponents } from "~/tools/solid-mdx";

const MDXComponents = useMDXComponents();

export default function PandaDocsPage(props: RouteSectionProps) {
	const doc = createMemo(() => {
		const document = allDocs.find((doc) => doc._meta.path === props.params.id);
		if (!document) {
			throw new Error("Document not found");
		}
		return document;
	});

	return (
		<>
			<Title>{doc().title} | Finance Career</Title>
			<Meta name="description" content={doc().description} />
			<MDXComponents.h1>{doc().title}</MDXComponents.h1>
			<MDXComponents.p textStyle="xl">{doc().description}</MDXComponents.p>
			<MDXComponents.hr />
		</>
	);
}
