// Comparação de ingredientes da busca do ChefIA.
// Cada linha de ingrediente da receita (ex.: "300 g de peito de frango") é reduzida
// ao(s) nome(s) do ingrediente e comparada por igualdade após normalização — nunca
// por "contém", para que "tomate" não corresponda a "molho de tomate".

export type SearchMode = "all" | "any";

export const normalizeText = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Singular simples, palavra a palavra ("ovos" -> "ovo", "limoes" -> "limao", "files" -> "file").
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
  frango: ["peito de frango", "file de frango"],
  "farinha de trigo": ["farinha"],
  "pimenta do reino": ["pimenta"],
  "cheiro verde": ["salsinha e cebolinha"],
  mussarela: ["muçarela", "mozarela", "mozzarella"].map(canonicalName),
  "carne bovina": ["carne"],
};

const UNIT_WORDS = new Set(
  [
    "g", "kg", "mg", "ml", "l", "grama", "quilo", "litro", "xicara", "colher", "colherinha", "copo",
    "lata", "caixa", "pacote", "dente", "file", "fatia", "pitada", "porcao", "unidade", "maco",
    "ramo", "folha", "pedaco", "sopa", "cha", "cafe", "media", "grande", "pequena", "pequeno",
    "gota", "fio", "punhado",
  ],
);
const FILLER = new Set(["de", "do", "da", "dos", "das", "a", "o", "em", "com"]);
const PREFIX_DESCRIPTORS = new Set(["suco", "polpa", "raspa", "raspas", "casca", "folha", "folhas"]);
const TRAILING = [/ a gosto$/, / para (servir|untar|polvilhar)$/, / opcional$/, / em po$/];

/** Extrai os nomes de ingrediente de uma linha de receita. */
export function extractIngredientNames(line: string): string[] {
  const text = normalizeText(line).replace(/\(.*?\)/g, " ");
  return text
    .split(/,| e | ou /)
    .map((part) => {
      let p = part.trim();
      for (const re of TRAILING) p = p.replace(re, "");
      const words = p.split(" ").filter(Boolean);
      // remove quantidade, unidades e preposições no início
      while (
        words.length &&
        (/^[\d/.,½¼¾]+$/.test(words[0]) || UNIT_WORDS.has(singularWord(words[0])) || FILLER.has(words[0]))
      )
        words.shift();
      // Em linhas como "suco concentrado de maracujá" e "raspas de limão",
      // o ingrediente pesquisável é a fruta, não o tipo de apresentação.
      if (words.length && PREFIX_DESCRIPTORS.has(words[0])) {
        words.shift();
        while (words.length && (FILLER.has(words[0]) || /^[\d/.,½¼¾]+$/.test(words[0]) || ["concentrado", "natural", "fresco", "fresca"].includes(words[0]))) words.shift();
      }
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

export function matchesIngredients(recipeIngredients: string[], selected: string[], mode: SearchMode) {
  const list = dedupeIngredients(selected);
  if (!list.length) return true;
  const test = (s: string) => recipeHasIngredient(recipeIngredients, s);
  return mode === "all" ? list.every(test) : list.some(test);
}
