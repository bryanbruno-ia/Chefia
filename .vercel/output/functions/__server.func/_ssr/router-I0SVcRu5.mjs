import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-I0SVcRu5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CZ-7mPg-.css";
var chefia_default = "/assets/chefia-9P567wDO.css";
function reportError(error, context = {}) {
	if (typeof window === "undefined") return;
	const stack = error instanceof Error ? error.stack : void 0;
	console.error("ChefIA error boundary:", describeThrown(error), {
		context,
		stack
	});
}
var MAX_SERIALIZED_LENGTH = 2e3;
function describeThrown(error) {
	if (error instanceof Response) return `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`;
	if (error instanceof Error) return error.message;
	if (typeof error === "string") return error;
	const { message } = error ?? {};
	if (typeof message === "string" && message.length > 0) return message;
	try {
		return JSON.stringify(error)?.slice(0, MAX_SERIALIZED_LENGTH) ?? String(error);
	} catch {
		return String(error);
	}
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ChefIA | Sua próxima receita começa aqui" },
			{
				name: "description",
				content: "Descubra receitas deliciosas com os ingredientes que você já tem em casa. Busca inteligente, favoritos e culinária facilitada para o dia a dia."
			},
			{
				name: "author",
				content: "ChefIA"
			},
			{
				property: "og:title",
				content: "ChefIA | Sua próxima receita começa aqui"
			},
			{
				property: "og:description",
				content: "Descubra receitas deliciosas com os ingredientes que você já tem em casa. Busca inteligente, favoritos e culinária facilitada para o dia a dia."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "https://chefia-navy.vercel.app/og-image.png"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:image:alt",
				content: "ChefIA — Sua próxima receita começa aqui"
			},
			{
				property: "og:url",
				content: "https://chefia-navy.vercel.app"
			},
			{
				property: "og:locale",
				content: "pt_BR"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@ChefIA"
			},
			{
				name: "twitter:title",
				content: "ChefIA | Sua próxima receita começa aqui"
			},
			{
				name: "twitter:description",
				content: "Descubra receitas deliciosas com os ingredientes que você já tem em casa. Busca inteligente, favoritos e culinária facilitada para o dia a dia."
			},
			{
				name: "twitter:image",
				content: "https://chefia-navy.vercel.app/og-image.png"
			},
			{
				name: "twitter:image:alt",
				content: "ChefIA — Sua próxima receita começa aqui"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "stylesheet",
				href: chefia_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "preconnect",
				href: "https://images.unsplash.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "dns-prefetch",
				href: "https://images.unsplash.com"
			},
			{
				rel: "preload",
				as: "style",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600;1,700&display=swap"
			},
			{
				rel: "preload",
				as: "image",
				href: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp",
				imageSrcSet: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&fm=webp 700w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&fm=webp 1000w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp 1400w",
				imageSizes: "(max-width: 650px) 100vw, 50vw",
				fetchPriority: "high"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon",
				sizes: "any"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter = () => import("./routes-xG0Jt34X.mjs");
var HERO_IMG = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp";
var rootRouteChildren = { IndexRoute: createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "ChefIA | Sua próxima receita começa aqui" },
			{
				name: "description",
				content: "Descubra receitas deliciosas com os ingredientes que você já tem em casa. Busca inteligente, favoritos e culinária facilitada para o dia a dia."
			},
			{
				property: "og:title",
				content: "ChefIA | Sua próxima receita começa aqui"
			},
			{
				property: "og:description",
				content: "Descubra receitas deliciosas com os ingredientes que você já tem em casa. Busca inteligente, favoritos e culinária facilitada para o dia a dia."
			},
			{
				property: "og:image",
				content: "https://chefia-navy.vercel.app/og-image.png"
			},
			{
				property: "og:url",
				content: "https://chefia-navy.vercel.app"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: "https://chefia-navy.vercel.app/og-image.png"
			}
		],
		links: [{
			rel: "preload",
			as: "image",
			href: HERO_IMG,
			imageSrcSet: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&fm=webp 700w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&fm=webp 1000w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp 1400w",
			imageSizes: "(max-width: 650px) 100vw, 50vw",
			fetchPriority: "high"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
}).update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$1
}) };
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
