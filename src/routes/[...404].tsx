import { Title } from "@solidjs/meta";
import { HttpStatusCode } from "@solidjs/start";

export default function NotFound() {
	return (
		<main class="h-full grid place-items-center pb-20">
			<Title>Page introuvable</Title>
			<HttpStatusCode code={404} />
			<h1>Cette page n'existe pas</h1>
		</main>
	);
}
