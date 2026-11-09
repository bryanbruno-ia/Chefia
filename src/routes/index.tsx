import { createFileRoute } from "@tanstack/react-router";
import ChefIAApp from "@/components/ChefIAApp";

// URL da imagem LCP — mesma do hero em ChefIAApp.tsx
const HERO_IMG = "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ChefIA — sua cozinha, suas regras" },
      {
        name: "description",
        content: "Descubra receitas incríveis com o que você já tem em casa.",
      },
      { property: "og:title", content: "ChefIA — sua cozinha, suas regras" },
      {
        property: "og:description",
        content: "Descubra receitas incríveis com o que você já tem em casa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      // Preload reforçado na rota: o browser recebe o hint antes mesmo de
      // processar os links do __root, acelerando a descoberta da imagem LCP.
      {
        rel: "preload",
        as: "image",
        href: HERO_IMG,
        // @ts-expect-error — campos imageSrcSet/imageSizes ainda não tipados
        imageSrcSet:
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&fm=webp 700w, " +
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&fm=webp 1000w, " +
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp 1400w",
        // @ts-expect-error
        imageSizes: "(max-width: 650px) 100vw, 50vw",
        fetchPriority: "high",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <ChefIAApp />;
}
