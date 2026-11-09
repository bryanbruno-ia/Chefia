// @ts-nocheck
import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import {
  ChefHat,
  Search,
  Heart,
  Clock3,
  Flame,
  Sparkles,
  ArrowRight,
  Plus,
  X,
  Leaf,
  Utensils,
  SlidersHorizontal,
  Bookmark,
  ChevronRight,
  CookingPot,
  Menu,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  matchesIngredients,
  dedupeIngredients,
  canonicalName,
  recipeHasIngredient,
} from "@/lib/ingredient-match";
import { recipesData } from "@/lib/recipes-data";

const normalize = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const ingredientIdeas = [
  ["Tomate", "🍅"],
  ["Batata", "🥔"],
  ["Cebola", "🧅"],
  ["Alho", "🧄"],
  ["Cenoura", "🥕"],
  ["Abobrinha", "🥒"],
  ["Berinjela", "🍆"],
  ["Pepino", "🥒"],
  ["Pimentão", "🫑"],
  ["Brócolis", "🥦"],
  ["Couve-flor", "🥦"],
  ["Alface", "🥬"],
  ["Espinafre", "🥬"],
  ["Couve", "🥬"],
  ["Repolho", "🥬"],
  ["Milho", "🌽"],
  ["Ervilha", "🫛"],
  ["Abóbora", "🎃"],
  ["Mandioca", "🥔"],
  ["Batata-doce", "🍠"],
  ["Frango", "🍗"],
  ["Carne bovina", "🥩"],
  ["Carne moída", "🥩"],
  ["Carne suína", "🥓"],
  ["Peixe", "🐟"],
  ["Salmão", "🐟"],
  ["Atum", "🐟"],
  ["Camarão", "🦐"],
  ["Ovo", "🥚"],
  ["Bacon", "🥓"],
  ["Linguiça", "🌭"],
  ["Presunto", "🍖"],
  ["Arroz", "🍚"],
  ["Feijão", "🫘"],
  ["Lentilha", "🫘"],
  ["Grão-de-bico", "🫘"],
  ["Macarrão", "🍝"],
  ["Farinha de trigo", "🌾"],
  ["Aveia", "🥣"],
  ["Pão", "🍞"],
  ["Tapioca", "🫓"],
  ["Cuscuz", "🍚"],
  ["Leite", "🥛"],
  ["Queijo", "🧀"],
  ["Parmesão", "🧀"],
  ["Mussarela", "🧀"],
  ["Requeijão", "🥛"],
  ["Creme de leite", "🥛"],
  ["Iogurte", "🥣"],
  ["Manteiga", "🧈"],
  ["Banana", "🍌"],
  ["Maçã", "🍎"],
  ["Laranja", "🍊"],
  ["Limão", "🍋"],
  ["Morango", "🍓"],
  ["Uva", "🍇"],
  ["Abacaxi", "🍍"],
  ["Manga", "🥭"],
  ["Abacate", "🥑"],
  ["Melancia", "🍉"],
  ["Mamão", "🍈"],
  ["Pera", "🍐"],
  ["Coco", "🥥"],
  ["Azeite", "🫒"],
  ["Óleo", "🫗"],
  ["Vinagre", "🍶"],
  ["Sal", "🧂"],
  ["Pimenta-do-reino", "🌶️"],
  ["Orégano", "🌿"],
  ["Manjericão", "🌿"],
  ["Salsinha", "🌿"],
  ["Cebolinha", "🌱"],
  ["Coentro", "🌿"],
  ["Colorau", "🧡"],
  ["Cominho", "🌰"],
  ["Canela", "🪵"],
  ["Mel", "🍯"],
  ["Açúcar", "🍚"],
  ["Chocolate", "🍫"],
  ["Cacau", "🍫"],
  ["Fermento", "🥄"],
  ["Castanha", "🥜"],
  ["Amendoim", "🥜"],
  ["Nozes", "🌰"],
  ["Beterraba", "🫜"],
  ["Chuchu", "🥒"],
  ["Quiabo", "🫛"],
  ["Jiló", "🍆"],
  ["Maxixe", "🥒"],
  ["Inhame", "🥔"],
  ["Cará", "🥔"],
  ["Mandioquinha", "🥕"],
  ["Nabo", "🫜"],
  ["Rabanete", "🫜"],
  ["Aspargo", "🌱"],
  ["Alcachofra", "🥬"],
  ["Alho-poró", "🧅"],
  ["Cebola roxa", "🧅"],
  ["Salsão", "🥬"],
  ["Rúcula", "🥬"],
  ["Agrião", "🥬"],
  ["Acelga", "🥬"],
  ["Chicória", "🥬"],
  ["Escarola", "🥬"],
  ["Vagem", "🫛"],
  ["Palmito", "🌴"],
  ["Cogumelo", "🍄"],
  ["Shiitake", "🍄"],
  ["Champignon", "🍄"],
  ["Pimenta dedo-de-moça", "🌶️"],
  ["Pimenta biquinho", "🌶️"],
  ["Gengibre", "🫚"],
  ["Azeitona", "🫒"],
  ["Tomate-cereja", "🍅"],
  ["Pimentão vermelho", "🫑"],
  ["Pimentão amarelo", "🫑"],
  ["Broto de feijão", "🌱"],
  ["Repolho roxo", "🥬"],
  ["Couve-de-bruxelas", "🥬"],
  ["Abóbora cabotiá", "🎃"],
  ["Batata baroa", "🥔"],
  ["Ervilha torta", "🫛"],
  ["Feijão verde", "🫛"],
  ["Edamame", "🫛"],
  ["Kiwi", "🥝"],
  ["Pêssego", "🍑"],
  ["Ameixa", "🍑"],
  ["Cereja", "🍒"],
  ["Mirtilo", "🫐"],
  ["Framboesa", "🍓"],
  ["Amora", "🫐"],
  ["Melão", "🍈"],
  ["Goiaba", "🍐"],
  ["Maracujá", "🟡"],
  ["Acerola", "🍒"],
  ["Caju", "🍎"],
  ["Pitanga", "🍒"],
  ["Jabuticaba", "🫐"],
  ["Açaí", "🫐"],
  ["Cupuaçu", "🥥"],
  ["Graviola", "🍈"],
  ["Pitaya", "🐉"],
  ["Caqui", "🍅"],
  ["Figo", "🟣"],
  ["Romã", "🔴"],
  ["Tangerina", "🍊"],
  ["Mexerica", "🍊"],
  ["Lima", "🍋"],
  ["Carambola", "⭐"],
  ["Jaca", "🍈"],
  ["Lichia", "🍒"],
  ["Tâmara", "🌰"],
  ["Uva-passa", "🍇"],
  ["Damasco", "🍑"],
  ["Cranberry", "🍒"],
  ["Banana-da-terra", "🍌"],
  ["Nectarina", "🍑"],
  ["Seriguela", "🍒"],
  ["Cajá", "🍋"],
  ["Umbu", "🍏"],
  ["Pequi", "🟡"],
  ["Bacuri", "🍈"],
  ["Buriti", "🟠"],
  ["Maçã verde", "🍏"],
  ["Peito de peru", "🦃"],
  ["Pato", "🦆"],
  ["Cordeiro", "🍖"],
  ["Costela", "🍖"],
  ["Picanha", "🥩"],
  ["Alcatra", "🥩"],
  ["Fraldinha", "🥩"],
  ["Patinho", "🥩"],
  ["Músculo", "🥩"],
  ["Cupim", "🥩"],
  ["Carne seca", "🥩"],
  ["Charque", "🥩"],
  ["Calabresa", "🌭"],
  ["Salsicha", "🌭"],
  ["Mortadela", "🍖"],
  ["Salame", "🍖"],
  ["Peito de frango", "🍗"],
  ["Coxa de frango", "🍗"],
  ["Asa de frango", "🍗"],
  ["Fígado", "🥩"],
  ["Coração de frango", "🍗"],
  ["Tilápia", "🐟"],
  ["Bacalhau", "🐟"],
  ["Sardinha", "🐟"],
  ["Merluza", "🐟"],
  ["Pescada", "🐟"],
  ["Lula", "🦑"],
  ["Polvo", "🐙"],
  ["Mexilhão", "🦪"],
  ["Ostra", "🦪"],
  ["Siri", "🦀"],
  ["Caranguejo", "🦀"],
  ["Lagosta", "🦞"],
  ["Tofu", "🧊"],
  ["Proteína de soja", "🫘"],
  ["Ovo de codorna", "🥚"],
  ["Arroz integral", "🍚"],
  ["Arroz arbóreo", "🍚"],
  ["Quinoa", "🌾"],
  ["Chia", "🌱"],
  ["Linhaça", "🌱"],
  ["Gergelim", "🌱"],
  ["Milho de pipoca", "🍿"],
  ["Fubá", "🌽"],
  ["Farinha de milho", "🌽"],
  ["Farinha de mandioca", "🌾"],
  ["Polvilho", "🌾"],
  ["Amido de milho", "🌽"],
  ["Farinha de rosca", "🍞"],
  ["Granola", "🥣"],
  ["Feijão preto", "🫘"],
  ["Feijão carioca", "🫘"],
  ["Feijão branco", "🫘"],
  ["Ervilha seca", "🫛"],
  ["Soja", "🫘"],
  ["Lasanha", "🍝"],
  ["Espaguete", "🍝"],
  ["Penne", "🍝"],
  ["Nhoque", "🥔"],
  ["Pão de forma", "🍞"],
  ["Pão francês", "🥖"],
  ["Pão sírio", "🫓"],
  ["Tortilha", "🫓"],
  ["Massa folhada", "🥐"],
  ["Biscoito", "🍪"],
  ["Leite condensado", "🥛"],
  ["Leite de coco", "🥥"],
  ["Coco ralado", "🥥"],
  ["Ricota", "🧀"],
  ["Cream cheese", "🧀"],
  ["Queijo coalho", "🧀"],
  ["Queijo minas", "🧀"],
  ["Provolone", "🧀"],
  ["Gorgonzola", "🧀"],
  ["Cheddar", "🧀"],
  ["Catupiry", "🧀"],
  ["Nata", "🥛"],
  ["Chantilly", "🍦"],
  ["Sorvete", "🍨"],
  ["Doce de leite", "🍮"],
  ["Leite em pó", "🥛"],
  ["Castanha-do-pará", "🌰"],
  ["Castanha de caju", "🥜"],
  ["Amêndoa", "🌰"],
  ["Avelã", "🌰"],
  ["Pistache", "🥜"],
  ["Macadâmia", "🌰"],
  ["Páprica", "🌶️"],
  ["Açafrão", "🟡"],
  ["Cúrcuma", "🟡"],
  ["Curry", "🍛"],
  ["Noz-moscada", "🌰"],
  ["Cravo", "🌸"],
  ["Louro", "🍃"],
  ["Alecrim", "🌿"],
  ["Tomilho", "🌿"],
  ["Hortelã", "🌿"],
  ["Sálvia", "🌿"],
  ["Endro", "🌿"],
  ["Cheiro-verde", "🌿"],
  ["Pimenta calabresa", "🌶️"],
  ["Gengibre em pó", "🫚"],
  ["Mostarda", "🟡"],
  ["Ketchup", "🍅"],
  ["Maionese", "🥚"],
  ["Molho de tomate", "🍅"],
  ["Extrato de tomate", "🍅"],
  ["Shoyu", "🍶"],
  ["Molho inglês", "🍶"],
  ["Vinho branco", "🍷"],
  ["Vinho tinto", "🍷"],
  ["Cerveja", "🍺"],
  ["Caldo de galinha", "🍲"],
  ["Caldo de carne", "🍲"],
  ["Azeite de dendê", "🫗"],
  ["Açúcar mascavo", "🟤"],
  ["Adoçante", "🥄"],
  ["Baunilha", "🌼"],
  ["Gelatina", "🍮"],
  ["Bicarbonato", "🥄"],
  ["Chocolate branco", "🍫"],
  ["Granulado", "🍫"],
  ["Café", "☕"],
  ["Chá", "🍵"],
  ["Água de coco", "🥥"],
];

// Catálogo de receitas com dados culinários específicos (src/lib/recipes-data.ts).
const categories = [
  { name: "Todas", icon: Utensils },
  { name: "Rápidas", icon: Clock3 },
  { name: "Saudável", icon: Leaf },
  { name: "Almoço", icon: CookingPot },
  { name: "Sobremesas", icon: Sparkles },
  { name: "Café da manhã", icon: Flame },
];

function App() {
  const [page, setPage] = useState("home");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const filteredIdeas = useMemo(
    () => {
      // Normaliza o input uma única vez fora do .filter para evitar 280 chamadas redundantes
      const normalizedInput = normalize(ingredientInput);
      return ingredientIdeas.filter(([item]) => normalize(item).includes(normalizedInput));
    },
    [ingredientInput],
  );
  const [search, setSearch] = useState("");
  // Valor com debounce: só recalcula visibleRecipes após 180 ms de inatividade,
  // evitando re-render + matchesIngredients em 146 receitas a cada tecla.
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Inicializado com [] para ser seguro no SSR; hidratado pelo useEffect abaixo
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const [generated, setGenerated] = useState([]);
  const [searchMode, setSearchMode] = useState("all");
  const [appliedIngredients, setAppliedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  function navigate(nextPage) {
    setPage(nextPage);
    setMobileMenu(false);
    setShowFavorites(nextPage === "favorites");
    if (nextPage === "season") setActiveCategory("Saudável");
    else if (nextPage === "favorites") setActiveCategory("Todas");
    if (nextPage !== "recipes") {
      setGenerated([]);
      setAppliedIngredients([]);
    }
    window.history.pushState({ page: nextPage }, "", `#${nextPage}`);
    // Adia o scroll para depois do commit do React (evita race condition
    // onde o scroll é calculado antes do novo conteúdo ser inserido no DOM).
    // behavior:"smooth" é omitido — herdado de scroll-behavior:smooth no CSS.
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
    });
  }

  React.useEffect(() => {
    const sync = () => {
      const route = window.location.hash.replace("#", "") || "home";
      if (["home", "recipes", "collections", "season", "create", "favorites"].includes(route)) {
        setPage(route);
        setShowFavorites(route === "favorites");
        if (route === "season") setActiveCategory("Saudável");
      }
    };
    window.addEventListener("popstate", sync);
    sync();
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // Hidrata favorites do localStorage após a montagem (seguro para SSR)
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("chefia-favorites") || "[]");
      if (stored.length) setFavorites(stored);
    } catch {
      // localStorage indisponível ou JSON inválido — mantém []
    }
  }, []);

  // Limpa o timer de debounce quando o componente desmontar
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  const visibleRecipes = useMemo(() => {
    let list = showFavorites
      ? recipesData.filter((r) => favorites.includes(r.id))
      : generated.length
        ? generated
        : recipesData;
    if (!showFavorites && !generated.length && appliedIngredients.length)
      list = list.filter((r) => matchesIngredients(r.ingredients, appliedIngredients, searchMode));
    if (activeCategory !== "Todas") list = list.filter((r) => r.category === activeCategory);
    if (debouncedSearch.trim()) {
      // Normaliza o termo de busca uma única vez fora do .filter
      const q = debouncedSearch.toLowerCase();
      list = list.filter((r) =>
        (r.title + " " + r.ingredients.join(" ")).toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategory, favorites, generated, debouncedSearch, showFavorites, appliedIngredients, searchMode]);

  function addIngredient() {
    const value = ingredientInput.trim().replace(/,$/, "");
    if (value) setIngredients(dedupeIngredients([...ingredients, value]));
    setIngredientInput("");
  }

  function toggleFavorite(id) {
    const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
    setFavorites(next);
    localStorage.setItem("chefia-favorites", JSON.stringify(next));
  }

  async function generateRecipes() {
    if (!ingredients.length) {
      document.getElementById("ingredient-input")?.focus();
      return;
    }
    setLoading(true);
    setShowFavorites(false);
    try {
      const api = import.meta.env.VITE_API_URL;
      if (api) {
        const response = await fetch(`${api.replace(/\/$/, "")}/recipes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients }),
        });
        if (!response.ok) throw new Error("Não foi possível gerar receitas.");
        const data = await response.json();
        setGenerated(
          Array.isArray(data.recipes)
            ? data.recipes.map((r, i) => ({ ...r, id: r.id ?? `ai-${i}` }))
            : [],
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
        setGenerated([]);
      }
      setActiveCategory("Todas");
      navigate("recipes");
      if (!api) setAppliedIngredients(dedupeIngredients(ingredients));
    } catch (error) {
      alert(error.message || "Ocorreu um erro ao gerar receitas.");
    } finally {
      setLoading(false);
    }
  }

  function resetDiscovery() {
    setIngredients([]);
    setGenerated([]);
    setAppliedIngredients([]);
    setSearch("");
    // Cancela qualquer debounce pendente e zera os dois estados sincronizados
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    setDebouncedSearch("");
    setActiveCategory("Todas");
    setShowFavorites(false);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            resetDiscovery();
            navigate("home");
          }}
        >
          <span className="brand-mark">
            <ChefHat size={20} />
          </span>
          <span>
            ChefIA<small className="brand-subtitle">COZINHA CRIATIVA · 2026</small>
          </span>
        </a>
        <nav className={mobileMenu ? "nav-links open" : "nav-links"}>
          <button
            className={page === "home" ? "nav-current" : ""}
            onClick={() => {
              resetDiscovery();
              navigate("home");
            }}
          >
            Início
          </button>
          <button
            className={page === "recipes" ? "nav-current" : ""}
            onClick={() => navigate("recipes")}
          >
            Receitas
          </button>
          <button
            className={page === "collections" ? "nav-current" : ""}
            onClick={() => navigate("collections")}
          >
            Coleções
          </button>
          <button
            className={page === "create" ? "nav-current" : ""}
            onClick={() => navigate("create")}
          >
            Criar com IA
          </button>
          <button
            className={page === "favorites" ? "nav-current nav-favorite" : "nav-favorite"}
            onClick={() => navigate("favorites")}
          >
            <Heart size={15} /> Favoritos <span>{favorites.length}</span>
          </button>
        </nav>
        <button
          className="mobile-menu"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Abrir menu"
        >
          <Menu />
        </button>
        <button className="top-cta" onClick={() => navigate("create")}>
          Criar receita <span className="cta-dot" />
        </button>
      </header>

      <main>
        {page === "home" && (
          <section className="hero editorial-hero" id="inicio">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-line" /> ESCOLHAS DO CHEF
              </div>
              <h1>
                Frescor em <em>cada mordida.</em>
              </h1>
              <p className="hero-subtitle">
                Receitas criadas com ingredientes frescos, combinações surpreendentes e um toque de
                criatividade para transformar sua cozinha.
              </p>
              <div className="hero-actions">
                <button onClick={() => navigate("recipes")} className="button button-primary">
                  Explorar receitas{" "}
                  <span className="round-arrow">
                    <ArrowRight size={15} />
                  </span>
                </button>
              </div>
            </div>
            <div className="hero-art editorial-art">
              <div className="hero-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp"
                  srcSet={
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&fm=webp 700w, " +
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&fm=webp 1000w, " +
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp 1400w"
                  }
                  sizes="(max-width: 650px) 100vw, 50vw"
                  alt="Prato de macarrão com tomate e manjericão"
                  fetchPriority="high"
                  decoding="sync"
                  width={1400}
                  height={936}
                />
              </div>
              <div className="floating-note note-top">
                <span className="note-icon">
                  <Leaf size={16} />
                </span>
                <span>
                  <strong>Verde da estação</strong>
                  <small>· 12 min</small>
                </span>
              </div>
              <div className="floating-note note-bottom">
                <span className="note-emoji">●</span>
                <span>
                  <strong>310 kcal · 12g proteína</strong>
                </span>
              </div>
            </div>
          </section>
        )}

        {page === "create" && (
          <section className="generator-section page-section" id="gerador">
            <div className="section-kicker">SEU INGREDIENTE É O COMEÇO</div>
            <div className="generator-heading">
              <div>
                <h2>
                  Vamos criar algo <em>delicioso?</em>
                </h2>
                <p>Adicione o que você tem por aí. A inspiração fica por nossa conta.</p>
              </div>
              <div className="ai-pill">
                <Sparkles size={15} /> Assistente inteligente
              </div>
            </div>
            <div className="generator-card">
              <div className="input-label">
                <span>01</span> O QUE VOCÊ TEM DISPONÍVEL?
              </div>
              <div className="ingredient-entry">
                <div className="entry-input">
                  <Plus size={19} />
                  <input
                    id="ingredient-input"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addIngredient()}
                    placeholder="Pesquise um ingrediente (ex.: tomate, ovos, arroz)"
                  />
                  <button onClick={addIngredient} disabled={!ingredientInput.trim()}>
                    Adicionar
                  </button>
                </div>
                {ingredients.length > 0 && (
                  <div className="ingredient-tags">
                    {ingredients.map((item) => (
                      <span className="ingredient-tag" key={item}>
                        {item}
                        <button
                          onClick={() => setIngredients(ingredients.filter((x) => x !== item))}
                          aria-label={`Remover ${item}`}
                        >
                          <X size={13} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <div className="ingredient-picker">
                  <div className="ingredient-picker-heading">
                    <span>ESCOLHA SEUS INGREDIENTES</span>
                    <small>{filteredIdeas.length} opções · toque para adicionar</small>
                  </div>
                  <div className="ingredient-picker-grid">
                    {filteredIdeas.length === 0 && (
                      <p
                        style={{
                          gridColumn: "1/-1",
                          textAlign: "center",
                          padding: "24px",
                          opacity: 0.7,
                        }}
                      >
                        Nenhum ingrediente encontrado. Pressione Enter para adicionar "
                        {ingredientInput.trim()}".
                      </p>
                    )}
                    {filteredIdeas.map(([item, emoji]) => {
                      const added = ingredients.some(
                        (x) => canonicalName(x) === canonicalName(item),
                      );
                      return (
                        <button
                          type="button"
                          className={added ? "ingredient-choice added" : "ingredient-choice"}
                          key={item}
                          onClick={() => !added && setIngredients([...ingredients, item])}
                          aria-pressed={added}
                        >
                          <span
                            className="ingredient-thumb"
                            style={{ fontSize: "1.8rem" }}
                            role="img"
                            aria-label={item}
                          >
                            <span>{emoji}</span>
                          </span>
                          <span className="ingredient-choice-name">{item}</span>
                          {added && <span className="ingredient-added-mark">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="input-label">
                <span>02</span> COMO COMBINAR OS INGREDIENTES?
              </div>
              <div
                className="category-tabs search-mode"
                role="radiogroup"
                aria-label="Modo de busca"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={searchMode === "all"}
                  className={searchMode === "all" ? "category-tab active" : "category-tab"}
                  onClick={() => setSearchMode("all")}
                >
                  <Check size={16} />
                  Todos os ingredientes
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={searchMode === "any"}
                  className={searchMode === "any" ? "category-tab active" : "category-tab"}
                  onClick={() => setSearchMode("any")}
                >
                  <Plus size={16} />
                  Pelo menos um
                </button>
              </div>
              <div className="generator-bottom">
                <span>
                  <Sparkles size={16} /> Vamos encontrar combinações para você.
                </span>
                <button
                  className="button button-dark"
                  onClick={generateRecipes}
                  disabled={loading || !ingredients.length}
                >
                  {loading ? (
                    <>
                      <span className="spinner" /> Criando ideias...
                    </>
                  ) : (
                    <>
                      Gerar minhas receitas <ArrowRight size={17} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        )}

        {(page === "recipes" || page === "favorites" || page === "season") && (
          <section className="discover-section page-section" id="discover">
            <div className="discover-top">
              <div>
                <div className="section-kicker">
                  {showFavorites ? "SUA COLEÇÃO" : "INSPIRAÇÃO PARA HOJE"}
                </div>
                <h2>
                  {showFavorites ? (
                    <>
                      Suas receitas <em>favoritas.</em>
                    </>
                  ) : page === "season" ? (
                    <>
                      Sabores da <em>estação.</em>
                    </>
                  ) : (
                    <>
                      Um mundo de sabores <em>te espera.</em>
                    </>
                  )}
                </h2>
                <p>
                  {showFavorites
                    ? "Tudo o que você guardou em um só lugar."
                    : page === "season"
                      ? "Ideias frescas e combinações leves para experimentar."
                      : "Escolha uma categoria e encontre sua próxima descoberta."}
                </p>
              </div>
              <div className="search-box">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearch(val);
                    // Debounce: atualiza debouncedSearch (que filtra receitas)
                    // só após 180 ms de inatividade, evitando re-render pesado
                    // a cada tecla.
                    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
                    searchTimerRef.current = setTimeout(() => setDebouncedSearch(val), 180);
                  }}
                  placeholder="Buscar receita..."
                />
                <SlidersHorizontal size={17} />
              </div>
            </div>
            <div className="category-tabs">
              {categories.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  className={activeCategory === name ? "category-tab active" : "category-tab"}
                  onClick={() => setActiveCategory(name)}
                >
                  <Icon size={16} />
                  {name}
                </button>
              ))}
            </div>
            {generated.length > 0 && !showFavorites && (
              <div className="generated-banner">
                <Sparkles size={17} /> Ideias encontradas a partir dos seus ingredientes.
                <button onClick={resetDiscovery}>
                  <RotateCcw size={14} /> Limpar busca
                </button>
              </div>
            )}
            {appliedIngredients.length > 0 && !showFavorites && (
              <>
                <div className="generated-banner">
                  <Sparkles size={17} />{" "}
                  {searchMode === "all"
                    ? "Receitas com todos estes ingredientes:"
                    : "Receitas com pelo menos um destes ingredientes:"}{" "}
                  {visibleRecipes.length} encontrada(s).
                  <button onClick={resetDiscovery}>
                    <RotateCcw size={14} /> Limpar busca
                  </button>
                </div>
                <div className="ingredient-tags">
                  {appliedIngredients.map((item) => (
                    <span className="ingredient-tag" key={item}>
                      {item}
                      <button
                        onClick={() => {
                          setAppliedIngredients(appliedIngredients.filter((x) => x !== item));
                          setIngredients(ingredients.filter((x) => x !== item));
                        }}
                        aria-label={`Remover ${item}`}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
                <div
                  className="category-tabs search-mode"
                  role="radiogroup"
                  aria-label="Modo de busca"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={searchMode === "all"}
                    className={searchMode === "all" ? "category-tab active" : "category-tab"}
                    onClick={() => setSearchMode("all")}
                  >
                    <Check size={16} />
                    Todos os ingredientes
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={searchMode === "any"}
                    className={searchMode === "any" ? "category-tab active" : "category-tab"}
                    onClick={() => setSearchMode("any")}
                  >
                    <Plus size={16} />
                    Pelo menos um
                  </button>
                </div>
              </>
            )}
            <div className="recipe-grid">
              {visibleRecipes.map((recipe) => (
                <article className="recipe-card" key={recipe.id}>
                  <button className="recipe-image" onClick={() => setSelected(recipe)}>
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                    />
                    <span className="recipe-category">{recipe.category}</span>
                  </button>
                  <button
                    className={favorites.includes(recipe.id) ? "save-button saved" : "save-button"}
                    onClick={() => toggleFavorite(recipe.id)}
                    aria-label="Salvar nos favoritos"
                  >
                    <Heart
                      size={17}
                      fill={favorites.includes(recipe.id) ? "currentColor" : "none"}
                    />
                  </button>
                  <div className="recipe-info">
                    <div className="recipe-meta">
                      <span>
                        <Clock3 size={14} />
                        {recipe.time} min
                      </span>
                      <span>
                        <Flame size={14} />
                        {recipe.calories} kcal
                      </span>
                    </div>
                    <button className="recipe-title" onClick={() => setSelected(recipe)}>
                      {recipe.title}
                    </button>
                    <p>{recipe.description}</p>
                    <button className="recipe-open" onClick={() => setSelected(recipe)}>
                      Ver receita <ArrowRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {visibleRecipes.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <Bookmark size={25} />
                </div>
                <h3>
                  {showFavorites ? "Sua coleção está esperando." : "Não encontramos receitas."}
                </h3>
                <p>
                  {showFavorites
                    ? "Toque no coração de uma receita para salvá-la aqui."
                    : appliedIngredients.length
                      ? searchMode === "all"
                        ? "Nenhuma receita contém todos os ingredientes selecionados. Experimente o modo “Pelo menos um” ou remova algum ingrediente."
                        : "Nenhuma receita contém os ingredientes selecionados."
                      : "Tente outra busca ou escolha uma categoria diferente."}
                </p>
                <button className="button button-dark" onClick={resetDiscovery}>
                  {appliedIngredients.length ? "Limpar filtros" : "Ver todas as receitas"}
                </button>
              </div>
            )}
          </section>
        )}

        {page === "collections" && (
          <section className="collections-page page-section">
            <div className="section-kicker">EXPLORE POR MOMENTO</div>
            <h2>
              Uma coleção para cada <em>vontade.</em>
            </h2>
            <p>Escolha um caminho e descubra novas ideias para sua cozinha.</p>
            <div className="collection-grid">
              {[
                {
                  name: "Receitas rápidas",
                  desc: "Ideias práticas para o dia a dia.",
                  cat: "Rápidas",
                  emoji: "⏱️",
                },
                {
                  name: "Comida saudável",
                  desc: "Combinações leves e coloridas.",
                  cat: "Saudável",
                  emoji: "🥑",
                },
                {
                  name: "Almoço especial",
                  desc: "Pratos para reunir todo mundo.",
                  cat: "Almoço",
                  emoji: "🍽️",
                },
                {
                  name: "Doces e sobremesas",
                  desc: "Um toque doce para qualquer hora.",
                  cat: "Sobremesas",
                  emoji: "🍓",
                },
              ].map((item) => (
                <button
                  className="collection-card"
                  key={item.name}
                  onClick={() => {
                    setActiveCategory(item.cat);
                    setShowFavorites(false);
                    setPage("recipes");
                    window.history.pushState({ page: "recipes" }, "", "#recipes");
                    // rAF: espera o commit do React antes de rolar
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: 0 });
                    });
                  }}
                >
                  <span>{item.emoji}</span>
                  <small>COLEÇÃO CHEFIA</small>
                  <strong>{item.name}</strong>
                  <p>{item.desc}</p>
                  <i>
                    Explorar coleção <ArrowRight size={15} />
                  </i>
                </button>
              ))}
            </div>
          </section>
        )}

        {page === "home" && (
          <section className="closing-banner">
            <div className="closing-icon">
              <ChefHat size={26} />
            </div>
            <div>
              <span>UM CONVITE PARA CRIAR</span>
              <h2>
                O melhor ingrediente é a sua <em>criatividade.</em>
              </h2>
              <p>Abra a geladeira. O próximo prato especial pode estar a poucos passos.</p>
            </div>
            <button onClick={() => navigate("create")} className="button button-light">
              Começar agora <ArrowRight size={16} />
            </button>
          </section>
        )}
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">
            <ChefHat size={19} />
          </span>
          <span>
            chef<span className="brand-accent">IA</span>
          </span>
        </a>
        <span>Feito para deixar a cozinha mais interessante. © 2026 ChefIA.</span>
        <div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              navigate("home");
            }}
          >
            Voltar ao início ↑
          </a>
        </div>
      </footer>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              <X size={20} />
            </button>
            <img
              className="modal-image"
              src={selected.image}
              alt={selected.title}
              decoding="async"
              loading="lazy"
            />
            <div className="modal-content">
              <span className="section-kicker">{selected.category.toUpperCase()}</span>
              <h2>{selected.title}</h2>
              <p>{selected.description}</p>
              <div className="modal-stats">
                <span>
                  <Clock3 size={16} /> {selected.time} min
                </span>
                <span>
                  <Flame size={16} /> {selected.calories} kcal (estimativa)
                </span>
                <span>
                  <Utensils size={16} /> {selected.difficulty}
                </span>
              </div>
              <h3>Ingredientes</h3>
              <div className="modal-ingredients">
                {selected.ingredients.map((x) => {
                  const have =
                    appliedIngredients.length > 0 &&
                    appliedIngredients.some((sel) => recipeHasIngredient([x], sel));
                  return (
                    <span
                      key={x}
                      className={
                        appliedIngredients.length === 0
                          ? ""
                          : have
                            ? "ingredient-have"
                            : "ingredient-missing"
                      }
                    >
                      {appliedIngredients.length === 0 || have ? (
                        <Check size={14} />
                      ) : (
                        <X size={14} />
                      )}
                      {x}
                    </span>
                  );
                })}
              </div>
              <h3>Modo de preparo</h3>
              <ol className="steps">
                {selected.steps.map((step, i) => (
                  <li key={i}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <button
                className={
                  favorites.includes(selected.id) ? "button button-outline" : "button button-dark"
                }
                onClick={() => toggleFavorite(selected.id)}
              >
                <Heart size={16} fill={favorites.includes(selected.id) ? "currentColor" : "none"} />
                {favorites.includes(selected.id) ? "Salvo nos favoritos" : "Salvar nos favoritos"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
