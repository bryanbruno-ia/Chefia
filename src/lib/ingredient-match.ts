// Comparação de ingredientes da busca do ChefIA.
// Cada linha de ingrediente da receita (ex.: "300 g de peito de frango") é reduzida
// ao(s) nome(s) do ingrediente e comparada após normalização.

export type SearchMode = "all" | "any";

export const normalizeText = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Singular simples, palavra a palavra ("ovos" -> "ovo", "limoes" -> "limao").
function singularWord(w: string) {
  if (w.length <= 3) return w;
  if (w.endsWith("oes") || w.endsWith("aes")) return w.slice(0, -3) + "ao";
  if (w.endsWith("res") || w.endsWith("zes")) return w.slice(0, -2);
  if (w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
}

export function canonicalName(name: string) {
  return normalizeText(name).split(" ").map(singularWord).join(" ");
}

// Variações de escrita que significam o MESMO ingrediente (chave e valores já canônicos).
const SAME_INGREDIENT: Record<string, string[]> = {
  frango: ["peito de frango", "file de frango", "coxa de frango", "sobrecoxa de frango"],
  "farinha de trigo": ["farinha"],
  "pimenta do reino": ["pimenta", "pimenta calabresa"],
  "cheiro verde": ["salsinha e cebolinha", "salsinha", "cebolinha"],
  mussarela: ["muçarela", "mozarela", "mozzarella"].map(canonicalName),
  "carne bovina": ["carne", "carne moida", "patinho", "acem"],
  queijo: ["queijo mussarela", "queijo prato", "queijo ralado"].map(canonicalName),
  "leite": ["leite integral", "leite desnatado"].map(canonicalName),
};

const UNIT_WORDS = new Set([
  "g", "kg", "mg", "ml", "l", "grama", "quilo", "litro", "xicara", "colher", "colherinha", "copo",
  "lata", "caixa", "pacote", "dente", "file", "fatia", "pitada", "porcao", "unidade", "maco",
  "ramo", "folha", "pedaco", "sopa", "cha", "cafe", "media", "grande", "pequena", "pequeno",
  "gota", "fio", "punhado",
]);

const FILLER = new Set(["de", "do", "da", "dos", "das", "a", "o", "em", "com"]);

const PREFIX_DESCRIPTORS = new Set(["suco", "polpa", "raspa", "raspas", "casca", "folha", "folhas"]);

const TRAILING = [/ a gosto$/, / para (servir|untar|polvilhar)$/, / opcional$/, / em po$/];

// Adjetivos de preparo que aparecem após o nome e devem ser removidos.
// Ex.: "alho fatiado" → "alho", "carne moída" → "carne"
// NOTA: cores (vermelho, verde, amarelo) são intencionalmente excluídas pois fazem
// parte do nome de ingredientes como "pimentão vermelho" e "cheiro-verde".
const PREP_ADJECTIVES = new Set([
  "picado", "picada", "fatiado", "fatiada", "amassado", "amassada",
  "desfiado", "desfiada", "moido", "moida", "ralado", "ralada",
  "cozido", "cozida", "assado", "assada", "refogado", "refogada",
  "frito", "frita", "grelhado", "grelhada", "temperado", "temperada",
  "descascado", "descascada", "batido", "batida", "peneirado", "peneirada",
  "fresco", "fresca", "seco", "seca", "inteiro", "inteira",
]);

// Palavras de forma de corte que aparecem após "em": "em rodelas", "em cubos", etc.
const FORMA_WORDS = new Set([
  "rodela", "cubo", "tira", "pedaco", "fatia", "rodada", "lamina",
]);

// Condimentos e temperos universais que toda cozinha tem.
// No modo "todos os ingredientes", esses itens não bloqueiam uma receita.
const PANTRY_STAPLES = new Set([
  "sal", "pimenta", "pimenta do reino", "pimenta calabresa", "oleo", "azeite",
  "manteiga", "margarina", "acucar", "acucar refinado", "vinagre", "limao",
  "erva", "oregano", "tomilho", "louro", "colorau", "cominho", "canela",
  "cravo", "noz moscada", "alecrim", "manjericao", "salsinha", "cebolinha",
  "cheiro verde", "agua", "caldo", "tempero", "fermento",
]);

/** Extrai os nomes de ingrediente de uma linha de receita. */
export function extractIngredientNames(line: string): string[] {
  const text = normalizeText(line).replace(/\(.*?\)/g, " ");
  return text
    .split(/,| e | ou /)
    .map((part) => {
      let p = part.trim();
      for (const re of TRAILING) p = p.replace(re, "");
      const words = p.split(" ").filter(Boolean);
      // Remove quantidade, unidades e preposições no início
      while (
        words.length &&
        (/^[\d/.,½¼¾]+$/.test(words[0]) || UNIT_WORDS.has(singularWord(words[0])) || FILLER.has(words[0]))
      )
        words.shift();
      // "suco de maracujá", "raspas de limão" → extrai a fruta
      if (words.length && PREFIX_DESCRIPTORS.has(words[0])) {
        words.shift();
        while (
          words.length &&
          (FILLER.has(words[0]) ||
            /^[\d/.,½¼¾]+$/.test(words[0]) ||
            ["concentrado", "natural", "fresco", "fresca"].includes(words[0]))
        )
          words.shift();
      }
      // Remove adjetivos de preparo no final: "alho fatiado" → "alho"
      while (
        words.length > 1 &&
        (PREP_ADJECTIVES.has(singularWord(words[words.length - 1])) ||
          FORMA_WORDS.has(singularWord(words[words.length - 1])))
      )
        words.pop();
      // Remove "em" solto que sobra após remover forma: "em rodelas" → remove "em"
      if (words.length > 1 && words[words.length - 1] === "em") words.pop();
      return words.map(singularWord).join(" ").trim();
    })
    .filter(Boolean);
}

function equivalents(selected: string): Set<string> {
  const c = canonicalName(selected);
  const set = new Set([c]);
  for (const [key, vals] of Object.entries(SAME_INGREDIENT)) {
    const group = [key, ...vals.map(canonicalName)];
    if (group.includes(c)) group.forEach((g) => set.add(g));
  }
  return set;
}

export function recipeHasIngredient(recipeIngredients: string[], selected: string) {
  const wanted = equivalents(selected);
  return recipeIngredients.some((line) => extractIngredientNames(line).some((n) => wanted.has(n)));
}

/** Remove duplicados (ignorando caixa, acentos e espaços), mantendo a primeira grafia. */
export function dedupeIngredients(list: string[]) {
  const seen = new Set<string>();
  return list
    .map((x) => x.trim().replace(/\s+/g, " "))
    .filter((x) => {
      const k = canonicalName(x);
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
}

export function matchesIngredients(
  recipeIngredients: string[],
  selected: string[],
  mode: SearchMode,
) {
  const list = dedupeIngredients(selected);
  if (!list.length) return true;

  if (mode === "any") {
    // "Pelo menos um": a receita precisa ter algum dos ingredientes selecionados
    return list.some((s) => recipeHasIngredient(recipeIngredients, s));
  }

  // "Todos os ingredientes" (mode === "all"):
  // Mostra receitas que o usuário consegue fazer com o que tem em casa.
  // Cada ingrediente não-básico da receita deve estar na lista do usuário.
  const selectedCanonical = new Set(list.flatMap((s) => [...equivalents(s)]));

  for (const line of recipeIngredients) {
    for (const name of extractIngredientNames(line)) {
      if (PANTRY_STAPLES.has(name)) continue; // sal, azeite, etc. não bloqueiam
      if (!selectedCanonical.has(name)) return false; // falta esse ingrediente
    }
  }
  return true;
}
