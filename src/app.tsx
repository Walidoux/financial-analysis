import "./app.css";

import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { type ParentComponent, Suspense } from "solid-js";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./providers/theme-provider";

const Layout: ParentComponent = (props) => {
	return (
		<>
			<Navbar />
			<Suspense>{props.children}</Suspense>
		</>
	);
};

export default function App() {
 	return (
 		<ThemeProvider defaultTheme="system" storageKey="finance-career-theme">
 			<Router
 				root={(props) => (
 					<MetaProvider>
 						<Title>Finance Career</Title>
 						<Layout>{props.children}</Layout>
 					</MetaProvider>
 				)}
 			>
 				<FileRoutes />
 			</Router>
 		</ThemeProvider>
 	);
 }
