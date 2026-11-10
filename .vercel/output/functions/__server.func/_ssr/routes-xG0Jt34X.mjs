import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as ArrowRight, a as Search, c as Menu, d as Flame, f as CookingPot, g as Bookmark, h as Check, i as SlidersHorizontal, l as Leaf, m as ChefHat, n as Utensils, o as RotateCcw, p as Clock3, r as Sparkles, s as Plus, t as X, u as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-xG0Jt34X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var normalizeText = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[-_]/g, " ").replace(/\s+/g, " ").trim();
function singularWord(w) {
	if (w.length <= 3) return w;
	if (w.endsWith("oes") || w.endsWith("aes")) return w.slice(0, -3) + "ao";
	if (w.endsWith("res") || w.endsWith("zes")) return w.slice(0, -2);
	if (w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
	return w;
}
function canonicalName(name) {
	return normalizeText(name).split(" ").map(singularWord).join(" ");
}
var SAME_INGREDIENT = {
	frango: ["peito de frango", "file de frango"],
	"farinha de trigo": ["farinha"],
	"pimenta do reino": ["pimenta"],
	"cheiro verde": ["salsinha e cebolinha"],
	mussarela: [
		"muçarela",
		"mozarela",
		"mozzarella"
	].map(canonicalName),
	"carne bovina": ["carne"]
};
var UNIT_WORDS = /* @__PURE__ */ new Set([
	"g",
	"kg",
	"mg",
	"ml",
	"l",
	"grama",
	"quilo",
	"litro",
	"xicara",
	"colher",
	"colherinha",
	"copo",
	"lata",
	"caixa",
	"pacote",
	"dente",
	"file",
	"fatia",
	"pitada",
	"porcao",
	"unidade",
	"maco",
	"ramo",
	"folha",
	"pedaco",
	"sopa",
	"cha",
	"cafe",
	"media",
	"grande",
	"pequena",
	"pequeno",
	"gota",
	"fio",
	"punhado"
]);
var FILLER = /* @__PURE__ */ new Set([
	"de",
	"do",
	"da",
	"dos",
	"das",
	"a",
	"o",
	"em",
	"com"
]);
var PREFIX_DESCRIPTORS = /* @__PURE__ */ new Set([
	"suco",
	"polpa",
	"raspa",
	"raspas",
	"casca",
	"folha",
	"folhas"
]);
var TRAILING = [
	/ a gosto$/,
	/ para (servir|untar|polvilhar)$/,
	/ opcional$/,
	/ em po$/
];
/** Extrai os nomes de ingrediente de uma linha de receita. */
function extractIngredientNames(line) {
	return normalizeText(line).replace(/\(.*?\)/g, " ").split(/,| e | ou /).map((part) => {
		let p = part.trim();
		for (const re of TRAILING) p = p.replace(re, "");
		const words = p.split(" ").filter(Boolean);
		while (words.length && (/^[\d/.,½¼¾]+$/.test(words[0]) || UNIT_WORDS.has(singularWord(words[0])) || FILLER.has(words[0]))) words.shift();
		if (words.length && PREFIX_DESCRIPTORS.has(words[0])) {
			words.shift();
			while (words.length && (FILLER.has(words[0]) || /^[\d/.,½¼¾]+$/.test(words[0]) || [
				"concentrado",
				"natural",
				"fresco",
				"fresca"
			].includes(words[0]))) words.shift();
		}
		return words.map(singularWord).join(" ").trim();
	}).filter(Boolean);
}
function equivalents(selected) {
	const c = canonicalName(selected);
	const set = /* @__PURE__ */ new Set([c]);
	for (const [key, vals] of Object.entries(SAME_INGREDIENT)) {
		const group = [key, ...vals.map(canonicalName)];
		if (group.includes(c)) group.forEach((g) => set.add(g));
	}
	return set;
}
function recipeHasIngredient(recipeIngredients, selected) {
	const wanted = equivalents(selected);
	return recipeIngredients.some((line) => extractIngredientNames(line).some((n) => wanted.has(n)));
}
/** Remove duplicados (ignorando caixa, acentos e espaços), mantendo a primeira grafia. */
function dedupeIngredients(list) {
	const seen = /* @__PURE__ */ new Set();
	return list.map((x) => x.trim().replace(/\s+/g, " ")).filter((x) => {
		const k = canonicalName(x);
		if (!k || seen.has(k)) return false;
		seen.add(k);
		return true;
	});
}
function matchesIngredients(recipeIngredients, selected, mode) {
	const list = dedupeIngredients(selected);
	if (!list.length) return true;
	const test = (s) => recipeHasIngredient(recipeIngredients, s);
	return mode === "all" ? list.every(test) : list.some(test);
}
var recipesData = [
	{
		id: "catalog-rapidas-1",
		title: "Omelete simples",
		category: "Rápidas",
		time: 8,
		calories: 220,
		difficulty: "Fácil",
		image: "/recipes/rapidas-omelete-simples.jpg",
		ingredients: [
			"2 ovos",
			"1 colher de manteiga",
			"Sal e pimenta-do-reino a gosto",
			"Cheiro-verde a gosto"
		],
		description: "O omelete de sempre: macio por dentro e pronto em poucos minutos.",
		steps: [
			"Bata os ovos com sal e pimenta até espumar levemente.",
			"Derreta a manteiga em uma frigideira antiaderente em fogo baixo.",
			"Despeje os ovos e deixe as bordas firmarem.",
			"Dobre ao meio enquanto a superfície ainda estiver úmida.",
			"Salpique cheiro-verde e sirva em seguida."
		],
		protein: "14 g"
	},
	{
		id: "catalog-rapidas-7",
		title: "Macarrão alho e óleo",
		category: "Rápidas",
		time: 15,
		calories: 410,
		difficulty: "Fácil",
		image: "/recipes/rapidas-macarrao-alho-e-oleo.jpg",
		ingredients: [
			"200 g de espaguete",
			"3 dentes de alho fatiados",
			"1/4 de xícara de azeite",
			"1 pitada de pimenta-calabresa",
			"Sal e salsinha a gosto"
		],
		description: "O clássico italiano com poucos ingredientes e muito sabor, pronto em 15 minutos.",
		steps: [
			"Cozinhe o espaguete em água fervente com sal até ficar al dente.",
			"Reserve uma concha da água do cozimento e escorra o restante.",
			"Doure o alho no azeite em fogo baixo, sem deixar queimar.",
			"Junte a pimenta-calabresa e a água do cozimento.",
			"Misture o macarrão, finalize com salsinha e sirva."
		],
		protein: "10 g"
	},
	{
		id: "catalog-rapidas-8",
		title: "Macarrão com requeijão",
		category: "Rápidas",
		time: 12,
		calories: 430,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-macarrao-com-requeijao.jpg",
		ingredients: [
			"200 g de macarrão",
			"1 dente de alho",
			"1 colher de manteiga",
			"3 colheres de requeijão cremoso",
			"Sal e noz-moscada a gosto"
		],
		description: "Uma massa cremosa e reconfortante, perfeita para os dias de pressa.",
		steps: [
			"Cozinhe o macarrão em água fervente com sal e escorra.",
			"Derreta a manteiga e refogue o alho em uma panela.",
			"Acrescente o requeijão e mexa até derreter e formar um creme.",
			"Junte o macarrão e misture até envolver bem.",
			"Tempere com sal e noz-moscada e sirva quente."
		],
		protein: "12 g"
	},
	{
		id: "catalog-rapidas-9",
		title: "Pizza de frigideira",
		category: "Rápidas",
		time: 18,
		calories: 380,
		difficulty: "Fácil",
		image: "/recipes/rapidas-pizza-de-frigideira.jpg",
		ingredients: [
			"1 xícara de farinha de trigo",
			"1 colher de fermento",
			"1/2 xícara de leite",
			"3 colheres de molho de tomate",
			"100 g de mussarela ralada",
			"Orégano a gosto"
		],
		description: "Massa fininha que fica pronta no fogão, sem precisar ligar o forno.",
		steps: [
			"Misture a farinha, o fermento e o leite até formar uma massa macia.",
			"Abra a massa em uma frigideira untada, em fogo baixo.",
			"Quando dourar de baixo, vire com cuidado.",
			"Espalhe o molho, a mussarela e o orégano.",
			"Tampe até o queijo derreter e sirva."
		],
		protein: "16 g"
	},
	{
		id: "catalog-rapidas-11",
		title: "Hambúrguer caseiro",
		category: "Rápidas",
		time: 20,
		calories: 540,
		difficulty: "Fácil",
		image: "/recipes/rapidas-hamburguer-caseiro.jpg",
		ingredients: [
			"300 g de carne moída",
			"1/2 cebola ralada",
			"1 dente de alho amassado",
			"Sal e pimenta-do-reino a gosto",
			"1 pão de hambúrguer",
			"Queijo e alface para montar"
		],
		description: "Hambúrguer suculento feito em casa, do jeitinho que você gosta.",
		steps: [
			"Misture a carne com a cebola, o alho, o sal e a pimenta.",
			"Modele dois hambúrgueres com as mãos umedecidas.",
			"Grelhe em frigideira quente, cerca de 4 minutos de cada lado.",
			"Coloque o queijo sobre a carne e deixe derreter.",
			"Monte no pão com alface e sirva."
		],
		protein: "30 g"
	},
	{
		id: "catalog-rapidas-12",
		title: "Wrap de frango",
		category: "Rápidas",
		time: 15,
		calories: 350,
		difficulty: "Fácil",
		image: "/recipes/rapidas-wrap-de-frango.jpg",
		ingredients: [
			"1 filé de peito de frango",
			"1 tortilha de farinha",
			"2 folhas de alface",
			"2 colheres de requeijão",
			"1/2 tomate em fatias",
			"Sal e orégano a gosto"
		],
		description: "Lanche prático e leve para levar na marmita ou comer no meio do dia.",
		steps: [
			"Tempere e grelhe o frango até dourar e corte em tiras.",
			"Aqueça a tortilha rapidamente em uma frigideira.",
			"Espalhe o requeijão e cubra com alface e tomate.",
			"Distribua as tiras de frango e enrole firme.",
			"Corte ao meio e sirva."
		],
		protein: "28 g"
	},
	{
		id: "catalog-rapidas-13",
		title: "Batata na air fryer",
		category: "Rápidas",
		time: 25,
		calories: 260,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-batata-na-air-fryer.jpg",
		ingredients: [
			"3 batatas médias",
			"2 colheres de azeite",
			"Sal a gosto",
			"Páprika e alecrim a gosto"
		],
		description: "Batatinhas douradas e crocantes feitas na air fryer, sem óleo de imersão.",
		steps: [
			"Corte as batatas em palitos e seque bem.",
			"Regue com azeite e tempere com sal, páprika e alecrim.",
			"Distribua na cesta da air fryer sem amontoar.",
			"Asse a 200 °C por 25 minutos, agitando na metade do tempo.",
			"Sirva crocantes e quentes."
		],
		protein: "5 g"
	},
	{
		id: "catalog-rapidas-14",
		title: "Batata sauté",
		category: "Rápidas",
		time: 20,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/rapidas-batata-saute.jpg",
		ingredients: [
			"3 batatas médias",
			"1 colher de manteiga",
			"1 dente de alho",
			"Cheiro-verde a gosto",
			"Sal a gosto"
		],
		description: "Cubos de batata dourados na manteiga com alho e cheiro-verde.",
		steps: [
			"Cozinhe as batatas até ficarem macias e corte em cubos.",
			"Derreta a manteiga e doure o alho em uma frigideira.",
			"Acrescente as batatas e salteie até dourarem.",
			"Tempere com sal e finalize com cheiro-verde.",
			"Sirva como acompanhamento."
		],
		protein: "4 g"
	},
	{
		id: "catalog-rapidas-17",
		title: "Carne moída refogada",
		category: "Rápidas",
		time: 18,
		calories: 390,
		difficulty: "Fácil",
		image: "/recipes/rapidas-carne-moida-refogada.jpg",
		ingredients: [
			"400 g de carne moída",
			"1 cebola picada",
			"2 dentes de alho",
			"1 colher de azeite",
			"Sal e pimenta-do-reino a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Carne moída soltinha e temperada, base prática para o dia a dia.",
		steps: [
			"Aqueça o azeite e refogue a cebola e o alho.",
			"Junte a carne moída e mexa até perder o tom rosado.",
			"Tempere com sal e pimenta.",
			"Cozinhe até o líquido reduzir e a carne dourar levemente.",
			"Finalize com cheiro-verde e sirva."
		],
		protein: "28 g"
	},
	{
		id: "catalog-rapidas-18",
		title: "Arroz com ovo",
		category: "Rápidas",
		time: 10,
		calories: 330,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-arroz-com-ovo.jpg",
		ingredients: [
			"2 xícaras de arroz cozido",
			"2 ovos",
			"1/2 cebola picada",
			"1 colher de óleo",
			"Sal e cebolinha a gosto"
		],
		description: "Aproveitamento prático do arroz do dia anterior, gostoso e rápido.",
		steps: [
			"Aqueça o óleo e refogue a cebola.",
			"Bata os ovos e despeje na panela, mexendo como ovos mexidos.",
			"Quando firmarem, junte o arroz cozido.",
			"Mexa até aquecer bem e envolver os ovos.",
			"Tempere com sal, finalize com cebolinha e sirva."
		],
		protein: "12 g"
	},
	{
		id: "catalog-rapidas-22",
		title: "Brigadeiro de panela",
		category: "Rápidas",
		time: 12,
		calories: 320,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-brigadeiro-de-panela.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"3 colheres de chocolate em pó",
			"1 colher de manteiga",
			"1 caixa de creme de leite"
		],
		description: "Brigadeiro cremoso de colher, pronto em minutos para a vontade de doce.",
		steps: [
			"Leve o leite condensado, o chocolate e a manteiga ao fogo baixo.",
			"Mexa sem parar até desgrudar do fundo da panela.",
			"Desligue e misture o creme de leite.",
			"Transfira para tacinhas e deixe amornar.",
			"Sirva de colher, puro ou com granulado."
		],
		protein: "6 g"
	},
	{
		id: "catalog-rapidas-27",
		title: "Torrada com queijo",
		category: "Rápidas",
		time: 8,
		calories: 260,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-torrada-com-queijo.jpg",
		ingredients: [
			"2 fatias de pão de forma",
			"2 fatias de queijo mussarela",
			"1 fio de azeite",
			"Orégano a gosto"
		],
		description: "Lanche quentinho e derretido, ideal para um lanche da tarde rápido.",
		steps: [
			"Toste levemente as fatias de pão.",
			"Cubra cada uma com uma fatia de queijo.",
			"Pulverize orégano e regue um fio de azeite.",
			"Leve ao forno ou air fryer até o queijo derreter.",
			"Sirva quente e crocante."
		],
		protein: "12 g"
	},
	{
		id: "catalog-rapidas-28",
		title: "Quesadilla",
		category: "Rápidas",
		time: 12,
		calories: 360,
		difficulty: "Fácil",
		image: "/recipes/rapidas-quesadilla.jpg",
		ingredients: [
			"2 tortilhas de farinha",
			"100 g de queijo mussarela ralado",
			"1/2 xícara de frango desfiado",
			"1/4 de pimentão em tiras",
			"1 colher de óleo"
		],
		description: "Tortilha recheada derretida na frigideira, no melhor estilo mexicano.",
		steps: [
			"Aqueça uma frigideira com um fio de óleo.",
			"Coloque uma tortilha e espalhe o queijo, o frango e o pimentão.",
			"Cubra com a outra tortilha.",
			"Doure de um lado, vire com cuidado e doure o outro.",
			"Corte em triângulos e sirva."
		],
		protein: "20 g"
	},
	{
		id: "catalog-rapidas-31",
		title: "Macarrão com tomate",
		category: "Rápidas",
		time: 15,
		calories: 370,
		difficulty: "Fácil",
		image: "/recipes/rapidas-macarrao-com-tomate.jpg",
		ingredients: [
			"200 g de macarrão",
			"2 tomates maduros",
			"1 dente de alho",
			"2 colheres de azeite",
			"Sal e manjericão a gosto"
		],
		description: "Massa fresca com molho de tomate caseiro e manjericão, leve e rápida.",
		steps: [
			"Cozinhe o macarrão em água fervente com sal e escorra.",
			"Pique os tomates e refogue com o alho no azeite.",
			"Tempere com sal e deixe encorpar levemente.",
			"Misture o macarrão ao molho.",
			"Finalize com manjericão e sirva."
		],
		protein: "11 g"
	},
	{
		id: "catalog-rapidas-32",
		title: "Creme de milho rápido",
		category: "Rápidas",
		time: 12,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/rapidas-creme-de-milho-rapido.jpg",
		ingredients: [
			"1 lata de milho escorrido",
			"1 caixa de creme de leite",
			"1 colher de manteiga",
			"1/2 cebola picada",
			"Sal e noz-moscada a gosto"
		],
		description: "Acompanhamento cremoso e dourado que combina com qualquer carne.",
		steps: [
			"Bata metade do milho com o creme de leite no liquidificador.",
			"Derreta a manteiga e refogue a cebola.",
			"Junte o milho inteiro e o milho batido.",
			"Cozinhe mexendo até encorpar e tempere com sal e noz-moscada.",
			"Sirva quente como acompanhamento."
		],
		protein: "6 g"
	},
	{
		id: "catalog-rapidas-33",
		title: "Pão de queijo de frigideira",
		category: "Rápidas",
		time: 20,
		calories: 290,
		difficulty: "Médio",
		image: "/recipes/rapidas-pao-de-queijo-de-frigideira.jpg",
		ingredients: [
			"1 xícara de polvilho azedo",
			"1 ovo",
			"1/4 de xícara de leite",
			"1/2 xícara de queijo ralado",
			"1 colher de óleo",
			"Sal a gosto"
		],
		description: "Versão de frigideira do pão de queijo: douradinha e queijuda sem forno.",
		steps: [
			"Ferva o leite com o óleo e o sal e despeje sobre o polvilho.",
			"Misture e espere amornar.",
			"Junte o ovo e o queijo e sove até dar liga.",
			"Modele bolinhas e achate-as levemente.",
			"Doure em frigideira antiaderente em fogo baixo, dos dois lados."
		],
		protein: "7 g"
	},
	{
		id: "catalog-rapidas-34",
		title: "Banana com aveia",
		category: "Rápidas",
		time: 8,
		calories: 220,
		difficulty: "Muito fácil",
		image: "/recipes/rapidas-banana-com-aveia.jpg",
		ingredients: [
			"1 banana madura",
			"3 colheres de aveia",
			"1/2 xícara de leite",
			"1 colher de mel",
			"Canela a gosto"
		],
		description: "Mingau doce e nutritivo de banana com aveia, pronto em poucos minutos.",
		steps: [
			"Amasse a banana com um garfo.",
			"Misture a aveia e o leite até ficar homogêneo.",
			"Aqueça em uma panela em fogo baixo, mexendo.",
			"Quando engrossar, transfira para uma tigela.",
			"Finalize com mel e canela e sirva morno."
		],
		protein: "6 g"
	},
	{
		id: "catalog-rapidas-36",
		title: "Macarrão alho e parmesão",
		category: "Rápidas",
		time: 15,
		calories: 420,
		difficulty: "Fácil",
		image: "/recipes/base-macarrao-alho-e-parmesao.jpg",
		ingredients: [
			"200 g de macarrão",
			"3 dentes de alho",
			"1/4 de xícara de azeite",
			"50 g de parmesão ralado",
			"Salsinha a gosto",
			"Sal a gosto"
		],
		description: "Poucos ingredientes, preparo rápido e o sabor marcante do parmesão.",
		steps: [
			"Cozinhe o macarrão em água fervente com sal até ficar al dente.",
			"Doure o alho fatiado no azeite, em fogo baixo.",
			"Reserve uma concha da água do cozimento e escorra o restante.",
			"Misture o macarrão ao azeite com um pouco da água.",
			"Finalize com parmesão e salsinha e sirva."
		],
		protein: "14 g"
	},
	{
		id: "catalog-saudavel-1",
		title: "Salada de frango",
		category: "Saudável",
		time: 20,
		calories: 320,
		difficulty: "Fácil",
		image: "/recipes/saudavel-salada-de-frango.jpg",
		ingredients: [
			"200 g de peito de frango grelhado",
			"2 xícaras de alface",
			"1 tomate",
			"1/2 cenoura ralada",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e orégano a gosto"
		],
		description: "Salada leve e proteica, com frango grelhado e vegetais frescos.",
		steps: [
			"Grelhe o peito de frango temperado e corte em tiras.",
			"Lave e seque a alface e disponha em uma tigela.",
			"Corte o tomate e rale a cenoura.",
			"Misture o frango com os vegetais.",
			"Tempere com limão, azeite, sal e orégano e sirva."
		],
		protein: "32 g"
	},
	{
		id: "catalog-saudavel-2",
		title: "Salada Caesar",
		category: "Saudável",
		time: 15,
		calories: 290,
		difficulty: "Fácil",
		image: "/recipes/saudavel-salada-caesar.jpg",
		ingredients: [
			"1 maço de alface romana",
			"100 g de frango grelhado em tiras",
			"30 g de parmesão em lascas",
			"1/2 xícara de croutons",
			"3 colheres de molho Caesar",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Clássica salada Caesar com molho cremoso, frango e parmesão.",
		steps: [
			"Lave, seque e corte a alface romana.",
			"Disponha as folhas em um prato fundo.",
			"Distribua o frango grelhado em tiras por cima.",
			"Adicione os croutons e as lascas de parmesão.",
			"Regue com o molho Caesar, tempere e sirva."
		],
		protein: "24 g"
	},
	{
		id: "catalog-saudavel-3",
		title: "Salada de atum",
		category: "Saudável",
		time: 10,
		calories: 240,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-salada-de-atum.jpg",
		ingredients: [
			"1 lata de atum escorrido",
			"2 xícaras de alface",
			"1 tomate",
			"1/2 cebola",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e cheiro-verde a gosto"
		],
		description: "Salada prática de atum com vegetais frescos, pronta em minutos.",
		steps: [
			"Escorra o atum e reserve.",
			"Lave a alface e corte o tomate e a cebola em rodelas.",
			"Misture o atum com os vegetais em uma tigela.",
			"Tempere com limão, azeite e sal.",
			"Finalize com cheiro-verde e sirva gelada."
		],
		protein: "22 g"
	},
	{
		id: "catalog-saudavel-4",
		title: "Salada tropical",
		category: "Saudável",
		time: 15,
		calories: 270,
		difficulty: "Fácil",
		image: "/recipes/saudavel-salada-tropical.jpg",
		ingredients: [
			"2 xícaras de alface",
			"1/2 manga",
			"1/2 mamão papaia",
			"1/2 pepino",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e hortelã a gosto"
		],
		description: "Salada colorida e refrescante com frutas tropicais e hortelã.",
		steps: [
			"Lave e rasgue as folhas de alface.",
			"Corte a manga e o mamão em cubos.",
			"Corte o pepino em meias rodelas.",
			"Misture tudo em uma tigela grande.",
			"Tempere com limão, azeite, sal e hortelã e sirva."
		],
		protein: "4 g"
	},
	{
		id: "catalog-saudavel-5",
		title: "Salada de quinoa",
		category: "Saudável",
		time: 20,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/saudavel-salada-de-quinoa.jpg",
		ingredients: [
			"1 xícara de quinoa cozida",
			"1 tomate",
			"1/2 pepino",
			"1/2 cebola roxa",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e salsinha a gosto"
		],
		description: "Salada nutritiva e saciante à base de quinoa com vegetais frescos.",
		steps: [
			"Cozinhe a quinoa conforme a embalagem e deixe esfriar.",
			"Corte o tomate, o pepino e a cebola em cubos pequenos.",
			"Misture os vegetais com a quinoa em uma tigela.",
			"Tempere com limão, azeite e sal.",
			"Finalize com salsinha e sirva gelada."
		],
		protein: "9 g"
	},
	{
		id: "catalog-saudavel-6",
		title: "Salada de grão-de-bico",
		category: "Saudável",
		time: 20,
		calories: 310,
		difficulty: "Fácil",
		image: "/recipes/saudavel-salada-de-grao-de-bico.jpg",
		ingredients: [
			"1 lata de grão-de-bico escorrido",
			"1 tomate",
			"1/2 cebola roxa",
			"1/2 pimentão",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e salsinha a gosto"
		],
		description: "Salada substanciosa e rica em proteína vegetal, ideal como refeição leve.",
		steps: [
			"Escorra e lave o grão-de-bico.",
			"Corte o tomate, a cebola e o pimentão em cubos.",
			"Misture tudo com o grão-de-bico em uma tigela.",
			"Tempere com limão, azeite e sal.",
			"Finalize com salsinha e sirva."
		],
		protein: "14 g"
	},
	{
		id: "catalog-saudavel-7",
		title: "Frango grelhado com legumes",
		category: "Saudável",
		time: 25,
		calories: 330,
		difficulty: "Fácil",
		image: "/recipes/saudavel-frango-grelhado-com-legumes.jpg",
		ingredients: [
			"200 g de peito de frango",
			"1 abobrinha",
			"1 cenoura",
			"1/2 pimentão",
			"1 dente de alho",
			"1 colher de azeite",
			"Sal e ervas a gosto"
		],
		description: "Frango grelhado acompanhado de legumes coloridos e leves.",
		steps: [
			"Tempere o frango com alho, sal e ervas e grelhe até dourar.",
			"Corte a abobrinha, a cenoura e o pimentão em palitos.",
			"Salteie os legumes no azeite até ficarem macios mas firmes.",
			"Corte o frango em tiras e junte aos legumes.",
			"Ajuste o tempero e sirva."
		],
		protein: "36 g"
	},
	{
		id: "catalog-saudavel-8",
		title: "Frango desfiado",
		category: "Saudável",
		time: 30,
		calories: 260,
		difficulty: "Fácil",
		image: "/recipes/saudavel-frango-desfiado.jpg",
		ingredients: [
			"300 g de peito de frango",
			"1 dente de alho",
			"1/2 cebola",
			"1 folha de louro",
			"Sal a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Frango desfiado suculento, base versátil para saladas, sanduíches e recheios.",
		steps: [
			"Cozinhe o frango com alho, cebola, louro e sal em água suficiente.",
			"Quando estiver macio, retire e deixe amornar.",
			"Desfie o frango com dois garfos.",
			"Volte à panela com um pouco do caldo para manter a umidade.",
			"Finalize com cheiro-verde e use como preferir."
		],
		protein: "40 g"
	},
	{
		id: "catalog-saudavel-12",
		title: "Omelete de espinafre",
		category: "Saudável",
		time: 12,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/saudavel-omelete-de-espinafre.jpg",
		ingredients: [
			"2 ovos",
			"1 xícara de folhas de espinafre",
			"1 colher de cebola picada",
			"1 colher de azeite",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Omelete leve e nutritiva com folhas verdes frescas.",
		steps: [
			"Aqueça o azeite e refogue a cebola e o espinafre até murchar.",
			"Bata os ovos com sal e pimenta.",
			"Despeje os ovos sobre o espinafre na frigideira.",
			"Deixe as bordas firmarem e dobre ao meio.",
			"Sirva em seguida."
		],
		protein: "16 g"
	},
	{
		id: "catalog-saudavel-13",
		title: "Panqueca de aveia",
		category: "Saudável",
		time: 15,
		calories: 230,
		difficulty: "Fácil",
		image: "/recipes/saudavel-panqueca-de-aveia.jpg",
		ingredients: [
			"1 ovo",
			"1 banana madura",
			"3 colheres de aveia",
			"1/4 de xícara de leite",
			"Canela a gosto"
		],
		description: "Panqueca sem farinha, doce naturalmente pela banana e rica em fibras.",
		steps: [
			"Bata o ovo, a banana, a aveia e o leite no liquidificador.",
			"Aqueça uma frigideira antiaderente levemente untada.",
			"Despeje pequenas porções de massa.",
			"Vire quando surgirem bolhas na superfície.",
			"Sirva com canela ou frutas."
		],
		protein: "10 g"
	},
	{
		id: "catalog-saudavel-16",
		title: "Tapioca com queijo branco",
		category: "Saudável",
		time: 10,
		calories: 220,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-tapioca-com-queijo-branco.jpg",
		ingredients: [
			"3 colheres de goma de tapioca",
			"100 g de queijo branco",
			"1 fio de azeite",
			"Sal e orégano a gosto"
		],
		description: "Tapioca leve e sem glúten com recheio cremoso de queijo branco.",
		steps: [
			"Peneire a goma e espalhe em uma frigideira quente e seca.",
			"Aguarde a tapioca formar e desgrudar.",
			"Coloque o queijo branco picado de um lado.",
			"Dobre ao meio e espere o queijo derreter.",
			"Tempere com azeite e orégano e sirva quente."
		],
		protein: "14 g"
	},
	{
		id: "catalog-saudavel-17",
		title: "Cuscuz com ovos",
		category: "Saudável",
		time: 15,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/saudavel-cuscuz-com-ovos.jpg",
		ingredients: [
			"1 xícara de flocão de milho",
			"1/2 xícara de água",
			"1 colher de manteiga",
			"2 ovos",
			"Sal a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Cuscuz nordestino fofinho servido com ovos mexidos, café da manhã farto.",
		steps: [
			"Misture o flocão com a água e uma pitada de sal e deixe hidratar.",
			"Cozinhe no cuscuzeiro ou na frigideira por cerca de 10 minutos.",
			"À parte, faça ovos mexidos com manteiga.",
			"Solte o cuscuz com a manteiga.",
			"Sirva com os ovos por cima e cheiro-verde."
		],
		protein: "14 g"
	},
	{
		id: "catalog-saudavel-18",
		title: "Arroz integral com legumes",
		category: "Saudável",
		time: 35,
		calories: 250,
		difficulty: "Fácil",
		image: "/recipes/saudavel-arroz-integral-com-legumes.jpg",
		ingredients: [
			"1 xícara de arroz integral",
			"1 cenoura",
			"1/2 pimentão",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de azeite",
			"Sal a gosto"
		],
		description: "Arroz integral soltinho com legumes coloridos, rico em fibras.",
		steps: [
			"Refogue a cebola e o alho no azeite.",
			"Acrescente a cenoura e o pimentão em cubos e refogue.",
			"Junte o arroz integral e mexa para envolver.",
			"Adicione 2 xícaras de água e sal e cozinhe até secar e amaciar.",
			"Solte os grãos e sirva."
		],
		protein: "6 g"
	},
	{
		id: "catalog-saudavel-19",
		title: "Bowl de frango",
		category: "Saudável",
		time: 20,
		calories: 350,
		difficulty: "Fácil",
		image: "/recipes/saudavel-bowl-de-frango.jpg",
		ingredients: [
			"200 g de peito de frango grelhado",
			"1/2 xícara de arroz integral",
			"1 xícara de alface",
			"1/2 abacate",
			"1/2 tomate",
			"1/2 limão",
			"Sal a gosto"
		],
		description: "Bowl completo e equilibrado com frango, arroz integral e vegetais frescos.",
		steps: [
			"Cozinhe o arroz integral e reserve.",
			"Grelhe o frango temperado e fatie.",
			"Lave e corte a alface, o tomate e o abacate.",
			"Monte o bowl com o arroz, o frango e os vegetais.",
			"Tempere com limão e sal e sirva."
		],
		protein: "34 g"
	},
	{
		id: "catalog-saudavel-20",
		title: "Bowl de salmão",
		category: "Saudável",
		time: 25,
		calories: 400,
		difficulty: "Médio",
		image: "/recipes/saudavel-bowl-de-salmao.jpg",
		ingredients: [
			"1 filé de salmão",
			"1/2 xícara de arroz integral",
			"1 xícara de folhas verdes",
			"1/2 pepino",
			"1/2 abacate",
			"1 colher de shoyu",
			"1/2 limão"
		],
		description: "Bowl nutritivo com salmão, arroz integral e vegetais, finalizado com shoyu.",
		steps: [
			"Cozinhe o arroz integral e reserve.",
			"Sele o salmão em uma frigideira quente e termine no forno baixo.",
			"Corte o pepino e o abacate em fatias.",
			"Monte o bowl com o arroz, as folhas e os vegetais.",
			"Disponha o salmão e finalize com shoyu e limão."
		],
		protein: "32 g"
	},
	{
		id: "catalog-saudavel-21",
		title: "Purê de batata-doce",
		category: "Saudável",
		time: 25,
		calories: 200,
		difficulty: "Fácil",
		image: "/recipes/saudavel-pure-de-batata-doce.jpg",
		ingredients: [
			"2 batatas-doces",
			"1 colher de manteiga",
			"1/4 de xícara de leite",
			"Sal e noz-moscada a gosto"
		],
		description: "Purê levemente adocicado e cremoso, acompanhamento saudável para carnes.",
		steps: [
			"Cozinhe as batatas-doces até ficarem macias.",
			"Descasque e amasse ainda quentes.",
			"Leve ao fogo com a manteiga e mexa.",
			"Acrescente o leite aos poucos até dar o ponto.",
			"Tempere com sal e noz-moscada e sirva."
		],
		protein: "3 g"
	},
	{
		id: "catalog-saudavel-22",
		title: "Abobrinha recheada",
		category: "Saudável",
		time: 40,
		calories: 280,
		difficulty: "Médio",
		image: "/recipes/saudavel-abobrinha-recheada.jpg",
		ingredients: [
			"2 abobrinhas médias",
			"200 g de carne moída",
			"1/2 cebola",
			"1 dente de alho",
			"1 tomate",
			"50 g de queijo ralado",
			"Sal e cheiro-verde a gosto"
		],
		description: "Abobrinhas assadas recheadas com carne e finalizada com queijo gratinado.",
		steps: [
			"Corte as abobrinhas ao meio no comprimento e retire o miolo.",
			"Refogue a cebola, o alho e a carne moída com o tomate picado.",
			"Tempere com sal e cheiro-verde.",
			"Recheie as abobrinhas e coloque em uma assadeira.",
			"Polvilhe queijo e asse a 200 °C até dourar."
		],
		protein: "24 g"
	},
	{
		id: "catalog-saudavel-23",
		title: "Berinjela assada",
		category: "Saudável",
		time: 35,
		calories: 160,
		difficulty: "Fácil",
		image: "/recipes/saudavel-berinjela-assada.jpg",
		ingredients: [
			"1 berinjela",
			"2 colheres de azeite",
			"2 dentes de alho",
			"Sal e pimenta-do-reino a gosto",
			"Salsinha a gosto"
		],
		description: "Berinjela macia e aromática assada com alho e azeite, leve e saborosa.",
		steps: [
			"Corte a berinjela em rodelas e salpique sal.",
			"Deixe descansar e seque o excesso de água.",
			"Regue com azeite e espalhe o alho amassado.",
			"Asse a 200 °C até dourar e ficar macia.",
			"Finalize com pimenta e salsinha e sirva."
		],
		protein: "3 g"
	},
	{
		id: "catalog-saudavel-24",
		title: "Legumes salteados",
		category: "Saudável",
		time: 15,
		calories: 150,
		difficulty: "Fácil",
		image: "/recipes/saudavel-legumes-salteados.jpg",
		ingredients: [
			"1 abobrinha",
			"1 cenoura",
			"1/2 pimentão",
			"1 brócolis",
			"1 dente de alho",
			"1 colher de azeite",
			"Sal e ervas a gosto"
		],
		description: "Mix de legumes salteados rapidamente, crocantes e coloridos.",
		steps: [
			"Corte todos os legumes em pedaços parecidos.",
			"Aqueça o azeite e doure o alho.",
			"Junte os legumes mais duros primeiro e depois os mais macios.",
			"Salteie em fogo alto por poucos minutos, mantendo a textura.",
			"Tempere com sal e ervas e sirva."
		],
		protein: "4 g"
	},
	{
		id: "catalog-saudavel-25",
		title: "Sopa de legumes",
		category: "Saudável",
		time: 30,
		calories: 180,
		difficulty: "Fácil",
		image: "/recipes/saudavel-sopa-de-legumes.jpg",
		ingredients: [
			"1 cenoura",
			"1 batata",
			"1 abobrinha",
			"1/2 chuchu",
			"1/2 cebola",
			"1 dente de alho",
			"Sal e cheiro-verde a gosto"
		],
		description: "Sopa reconfortante e leve com vários legumes, ideal para dias frios.",
		steps: [
			"Corte todos os legumes em cubos pequenos.",
			"Refogue a cebola e o alho em uma panela.",
			"Acrescente os legumes e cubra com água.",
			"Cozinhe até tudo ficar macio.",
			"Tempere com sal e cheiro-verde e sirva quente."
		],
		protein: "4 g"
	},
	{
		id: "catalog-saudavel-26",
		title: "Caldo de abóbora",
		category: "Saudável",
		time: 30,
		calories: 170,
		difficulty: "Fácil",
		image: "/recipes/saudavel-caldo-de-abobora.jpg",
		ingredients: [
			"500 g de abóbora cabotiá",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de azeite",
			"1 litro de caldo de legumes",
			"Sal e noz-moscada a gosto"
		],
		description: "Caldo cremoso e aveludado de abóbora, suave e nutritivo.",
		steps: [
			"Refogue a cebola e o alho no azeite.",
			"Acrescente a abóbora em cubos e o caldo.",
			"Cozinhe até a abóbora ficar bem macia.",
			"Bata com o caldo até formar um creme.",
			"Tempere com sal e noz-moscada e sirva quente."
		],
		protein: "3 g"
	},
	{
		id: "catalog-saudavel-27",
		title: "Sopa de frango",
		category: "Saudável",
		time: 40,
		calories: 230,
		difficulty: "Fácil",
		image: "/recipes/saudavel-sopa-de-frango.jpg",
		ingredients: [
			"200 g de peito de frango",
			"1 cenoura",
			"1 batata",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de azeite",
			"Sal e cheiro-verde a gosto"
		],
		description: "Sopa de frango caseira com legumes, reconfortante e nutritiva.",
		steps: [
			"Refogue a cebola e o alho no azeite.",
			"Acrescente o frango e cubra com água.",
			"Cozinhe até o frango ficar macio e retire para desfiar.",
			"Volte o frango desfiado com os legumes em cubos e cozinhe.",
			"Tempere com sal e cheiro-verde e sirva quente."
		],
		protein: "26 g"
	},
	{
		id: "catalog-saudavel-28",
		title: "Sanduíche natural integral",
		category: "Saudável",
		time: 10,
		calories: 260,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-sanduiche-natural-integral.jpg",
		ingredients: [
			"2 fatias de pão integral",
			"100 g de frango desfiado",
			"1 colher de requeijão",
			"1/2 cenoura ralada",
			"Folhas de alface",
			"Sal a gosto"
		],
		description: "Sanduíche prático no pão integral com frango desfiado e cenoura.",
		steps: [
			"Misture o frango desfiado com o requeijão e o sal.",
			"Toste levemente as fatias de pão integral.",
			"Disponha a alface sobre uma fatia.",
			"Espalhe o recheio de frango e a cenoura ralada.",
			"Feche o sanduíche, corte ao meio e sirva."
		],
		protein: "24 g"
	},
	{
		id: "catalog-saudavel-29",
		title: "Wrap integral de frango",
		category: "Saudável",
		time: 15,
		calories: 320,
		difficulty: "Fácil",
		image: "/recipes/saudavel-wrap-integral-de-frango.jpg",
		ingredients: [
			"1 filé de peito de frango",
			"1 tortilha integral",
			"2 folhas de alface",
			"1/2 cenoura ralada",
			"1 colher de iogurte",
			"Sal e ervas a gosto"
		],
		description: "Wrap no pão integral com frango, iogurte e vegetais, leve e saciante.",
		steps: [
			"Tempere e grelhe o frango e corte em tiras.",
			"Aqueça a tortilha integral rapidamente.",
			"Misture o iogurte com ervas e espalhe na tortilha.",
			"Disponha a alface, a cenoura e o frango.",
			"Enrole firme, corte ao meio e sirva."
		],
		protein: "30 g"
	},
	{
		id: "catalog-saudavel-30",
		title: "Iogurte com frutas e granola",
		category: "Saudável",
		time: 5,
		calories: 240,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-iogurte-com-frutas-e-granola.jpg",
		ingredients: [
			"1 pote de iogurte natural",
			"1/2 banana",
			"1/2 maçã",
			"3 colheres de granola",
			"1 colher de mel",
			"Canela a gosto"
		],
		description: "Lanche saudável e doce naturalmente, com frutas, granola e mel.",
		steps: [
			"Coloque o iogurte em uma tigela.",
			"Corte a banana e a maçã em cubos.",
			"Distribua as frutas sobre o iogurte.",
			"Salpique a granola por cima.",
			"Finalize com mel e canela e sirva."
		],
		protein: "10 g"
	},
	{
		id: "catalog-saudavel-34",
		title: "Guacamole",
		category: "Saudável",
		time: 10,
		calories: 200,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-guacamole.jpg",
		ingredients: [
			"1 abacate maduro",
			"1/2 cebola",
			"1 tomate",
			"1/2 limão",
			"1 dente de alho",
			"Sal e coentro a gosto"
		],
		description: "Molho cremoso mexicano de abacate com tomate e limão, ideal com nachos.",
		steps: [
			"Amasse o abacate com um garfo até ficar cremoso.",
			"Pique a cebola, o tomate e o alho bem miúdo.",
			"Misture ao abacate e regue com limão.",
			"Tempere com sal e coentro.",
			"Sirva com tortilhas ou como acompanhamento."
		],
		protein: "3 g"
	},
	{
		id: "catalog-saudavel-35",
		title: "Batata-doce assada",
		category: "Saudável",
		time: 35,
		calories: 180,
		difficulty: "Muito fácil",
		image: "/recipes/saudavel-batata-doce-assada.jpg",
		ingredients: [
			"2 batatas-doces",
			"2 colheres de azeite",
			"Sal a gosto",
			"Páprika e alecrim a gosto"
		],
		description: "Batata-doce assada com casca, dourada e levemente adocicada.",
		steps: [
			"Lave bem as batatas e corte em gomos.",
			"Regue com azeite e tempere com sal, páprika e alecrim.",
			"Distribua em uma assadeira sem amontoar.",
			"Asse a 200 °C por cerca de 30 minutos, virando na metade.",
			"Sirva douradas e macias."
		],
		protein: "3 g"
	},
	{
		id: "catalog-saudavel-36",
		title: "Bowl colorido da horta",
		category: "Saudável",
		time: 15,
		calories: 310,
		difficulty: "Fácil",
		image: "/recipes/base-bowl-colorido-da-horta.jpg",
		ingredients: [
			"2 xícaras de alface",
			"1 tomate",
			"1/2 cenoura",
			"1 xícara de grão-de-bico cozido",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e pimenta a gosto"
		],
		description: "Uma combinação fresca e nutritiva para deixar a refeição mais leve.",
		steps: [
			"Lave e seque bem as folhas.",
			"Corte o tomate e rale a cenoura.",
			"Misture com o grão-de-bico cozido.",
			"Tempere com limão, azeite, sal e pimenta.",
			"Sirva em uma tigela."
		],
		protein: "12 g"
	},
	{
		id: "catalog-saudavel-37",
		title: "Tostada de abacate",
		category: "Saudável",
		time: 10,
		calories: 260,
		difficulty: "Muito fácil",
		image: "/recipes/base-tostada-de-abacate.jpg",
		ingredients: [
			"2 fatias de pão",
			"1 abacate maduro",
			"1/2 limão",
			"1 tomate",
			"Sal e pimenta a gosto"
		],
		description: "Uma opção prática, cremosa e cheia de textura para o café da manhã.",
		steps: [
			"Amasse o abacate com algumas gotas de limão.",
			"Tempere com sal e pimenta.",
			"Toste as fatias de pão.",
			"Espalhe o creme de abacate.",
			"Finalize com tomate picado."
		],
		protein: "7 g"
	},
	{
		id: "catalog-almoco-1",
		title: "Arroz, feijão e bife",
		category: "Almoço",
		time: 30,
		calories: 560,
		difficulty: "Fácil",
		image: "/recipes/almoco-arroz-feijao-e-bife.jpg",
		ingredients: [
			"1 bife bovino",
			"1 xícara de arroz cozido",
			"1 concha de feijão cozido",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de óleo",
			"Sal e cheiro-verde a gosto"
		],
		description: "O clássico prato brasileiro completo: arroz, feijão e um bife suculento.",
		steps: [
			"Prepare o arroz e o feijão do jeito de sempre.",
			"Tempere o bife com sal e alho.",
			"Sele o bife em frigideira quente com um fio de óleo.",
			"Doure a cebola em rodelas e coloque sobre o bife.",
			"Sirva o bife com o arroz e o feijão e finalize com cheiro-verde."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-2",
		title: "Frango grelhado",
		category: "Almoço",
		time: 25,
		calories: 320,
		difficulty: "Fácil",
		image: "/recipes/almoco-frango-grelhado.jpg",
		ingredients: [
			"300 g de peito de frango",
			"2 dentes de alho",
			"1/2 limão",
			"1 colher de azeite",
			"Sal e ervas a gosto"
		],
		description: "Frango grelhado suculento, temperado com alho e limão, leve e dourado.",
		steps: [
			"Tempere o frango com alho, limão, sal e ervas.",
			"Deixe marinar por alguns minutos, se possível.",
			"Aqueça uma frigideira grelhada com azeite.",
			"Grelhe o frango dos dois lados até dourar e cozinhar por dentro.",
			"Sirva com o acompanhamento de sua preferência."
		],
		protein: "42 g"
	},
	{
		id: "catalog-almoco-3",
		title: "Frango à parmegiana",
		category: "Almoço",
		time: 45,
		calories: 560,
		difficulty: "Médio",
		image: "/recipes/almoco-frango-a-parmegiana.jpg",
		ingredients: [
			"2 filés de peito de frango",
			"1 ovo",
			"1 xícara de farinha de rosca",
			"1 xícara de molho de tomate",
			"150 g de mussarela",
			"1 colher de óleo",
			"Sal e orégano a gosto"
		],
		description: "Frango empanado e gratinado com molho de tomate e queijo, um clássico de boteco.",
		steps: [
			"Tempere os filés com sal e passe na farinha, no ovo e na farinha de rosca.",
			"Frite em óleo quente até dourar e reserve.",
			"Coloque os filés em um refratário.",
			"Cubra com o molho de tomate e a mussarela.",
			"Leve ao forno até o queijo derreter e sirva."
		],
		protein: "44 g"
	},
	{
		id: "catalog-almoco-4",
		title: "Frango xadrez",
		category: "Almoço",
		time: 30,
		calories: 420,
		difficulty: "Médio",
		image: "/recipes/almoco-frango-xadrez.jpg",
		ingredients: [
			"300 g de peito de frango em cubos",
			"1/2 pimentão",
			"1 cenoura",
			"1/2 cebola",
			"2 colheres de shoyu",
			"1 colher de amido de milho",
			"1 dente de alho"
		],
		description: "Refogado chinês de frango com legumes em cubos, no estilo frango xadrez.",
		steps: [
			"Tempere o frango com um pouco de shoyu e amido de milho.",
			"Doure o alho e refogue o frango em fogo alto.",
			"Acrescente a cebola, o pimentão e a cenoura em cubos.",
			"Salteie os legumes mantendo a textura crocante.",
			"Acrescente o restante do shoyu, misture e sirva com arroz."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-5",
		title: "Fricassê de frango",
		category: "Almoço",
		time: 40,
		calories: 540,
		difficulty: "Médio",
		image: "/recipes/almoco-fricasse-de-frango.jpg",
		ingredients: [
			"300 g de frango desfiado",
			"1 lata de milho",
			"1 caixa de creme de leite",
			"1 xícara de requeijão cremoso",
			"100 g de batata-palha",
			"1/2 cebola",
			"Sal e cheiro-verde a gosto"
		],
		description: "Frango desfiado em creme de milho e requeijão, gratinado e crocante em cima.",
		steps: [
			"Refogue a cebola e o frango desfiado.",
			"Bata o milho com o creme de leite e junte à panela.",
			"Acrescente o requeijão e tempere com sal e cheiro-verde.",
			"Transfira para um refratário.",
			"Cubra com batata-palha e leve ao forno para dourar."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-6",
		title: "Strogonoff de frango",
		category: "Almoço",
		time: 35,
		calories: 490,
		difficulty: "Fácil",
		image: "/recipes/almoco-strogonoff-de-frango.jpg",
		ingredients: [
			"300 g de peito de frango em cubos",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de manteiga",
			"1 caixa de creme de leite",
			"2 colheres de molho de tomate",
			"1 colher de mostarda",
			"Sal e batata-palha a gosto"
		],
		description: "Clássico strogonoff cremoso de frango com mostarda e batata-palha.",
		steps: [
			"Refogue a cebola e o alho na manteiga.",
			"Doure o frango em cubos e tempere com sal.",
			"Junte o molho de tomate e a mostarda e cozinhe.",
			"Acrescente o creme de leite e aqueça sem ferver.",
			"Sirva com arroz e batata-palha."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-7",
		title: "Strogonoff de carne",
		category: "Almoço",
		time: 40,
		calories: 540,
		difficulty: "Médio",
		image: "/recipes/almoco-strogonoff-de-carne.jpg",
		ingredients: [
			"400 g de carne bovina em tiras",
			"1/2 cebola",
			"1 colher de manteiga",
			"1 caixa de creme de leite",
			"2 colheres de molho de tomate",
			"1 colher de mostarda",
			"1 colher de ketchup",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Strogonoff de carne com molho cremoso e levemente adocicado, com batata-palha.",
		steps: [
			"Sele a carne em tiras na manteiga quente e reserve.",
			"Refogue a cebola na mesma panela.",
			"Volte a carne e junte o molho de tomate, a mostarda e o ketchup.",
			"Acrescente o creme de leite e aqueça sem ferver.",
			"Sirva com arroz e batata-palha."
		],
		protein: "38 g"
	},
	{
		id: "catalog-almoco-8",
		title: "Carne de panela",
		category: "Almoço",
		time: 90,
		calories: 450,
		difficulty: "Fácil",
		image: "/recipes/almoco-carne-de-panela.jpg",
		ingredients: [
			"500 g de carne bovina em cubos",
			"1 cebola",
			"2 dentes de alho",
			"2 tomates",
			"1 colher de óleo",
			"1 folha de louro",
			"Sal e cheiro-verde a gosto"
		],
		description: "Carne cozida lentamente na panela, macia e envolvida em molho caseiro.",
		steps: [
			"Sele a carne em cubos no óleo quente.",
			"Junte a cebola, o alho e o louro e refogue.",
			"Acrescente os tomates picados e água até cobrir.",
			"Cozinhe em fogo baixo até a carne ficar bem macia.",
			"Ajuste o sal, finalize com cheiro-verde e sirva."
		],
		protein: "40 g"
	},
	{
		id: "catalog-almoco-9",
		title: "Carne moída com batata",
		category: "Almoço",
		time: 35,
		calories: 430,
		difficulty: "Fácil",
		image: "/recipes/almoco-carne-moida-com-batata.jpg",
		ingredients: [
			"400 g de carne moída",
			"2 batatas",
			"1 cebola",
			"2 dentes de alho",
			"1 tomate",
			"1 colher de óleo",
			"Sal e cheiro-verde a gosto"
		],
		description: "Carne moída cozida com batata em cubos, prato simples e gostoso de todo dia.",
		steps: [
			"Refogue a cebola e o alho no óleo.",
			"Junte a carne moída e mexa até perder o tom rosado.",
			"Acrescente o tomate picado e tempere com sal.",
			"Coloque a batata em cubos e um pouco de água.",
			"Cozinhe até a batata amaciar, finalize com cheiro-verde e sirva."
		],
		protein: "28 g"
	},
	{
		id: "catalog-almoco-10",
		title: "Bife acebolado",
		category: "Almoço",
		time: 20,
		calories: 410,
		difficulty: "Fácil",
		image: "/recipes/almoco-bife-acebolado.jpg",
		ingredients: [
			"2 bifes bovinos",
			"2 cebolas",
			"1 dente de alho",
			"1 colher de manteiga",
			"1 colher de óleo",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Bife grelhado coberto com cebola dourada na manteiga, simples e saboroso.",
		steps: [
			"Tempere os bifes com sal, pimenta e alho.",
			"Sele os bifes em frigideira quente com óleo.",
			"Corte as cebolas em rodelas.",
			"Derreta a manteiga e doure as cebolas.",
			"Coloque as cebolas sobre os bifes e sirva."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-11",
		title: "Bife à milanesa",
		category: "Almoço",
		time: 25,
		calories: 480,
		difficulty: "Fácil",
		image: "/recipes/almoco-bife-a-milanesa.jpg",
		ingredients: [
			"2 bifes bovinos finos",
			"1 ovo",
			"1 xícara de farinha de rosca",
			"1/2 limão",
			"1 colher de óleo",
			"Sal e alho a gosto"
		],
		description: "Bife empanado crocante por fora e macio por dentro, com toque de limão.",
		steps: [
			"Tempere os bifes com alho, sal e limão.",
			"Passe cada bife na farinha, no ovo e na farinha de rosca.",
			"Frite em óleo quente até dourar dos dois lados.",
			"Escorra sobre papel-toalha.",
			"Sirva com limão e o acompanhamento de sua escolha."
		],
		protein: "30 g"
	},
	{
		id: "catalog-almoco-12",
		title: "Costela assada",
		category: "Almoço",
		time: 180,
		calories: 520,
		difficulty: "Médio",
		image: "/recipes/almoco-costela-assada.jpg",
		ingredients: [
			"1 kg de costela bovina",
			"1 cabeça de alho",
			"1 colher de sal grosso",
			"1 colher de pimenta-do-reino",
			"1/2 xícara de vinho tinto",
			"Cheiro-verde a gosto"
		],
		description: "Costela assada lentamente até desfiar, com tempero de alho e sal grosso.",
		steps: [
			"Esfregue o sal, a pimenta e o alho amassado na costela.",
			"Coloque em uma assadeira e regue com o vinho.",
			"Cubra com papel-alumínio e asse a 160 °C por cerca de 3 horas.",
			"Retire o papel e doure por mais 20 minutos.",
			"Desfie a carne e sirva com cheiro-verde."
		],
		protein: "46 g"
	},
	{
		id: "catalog-almoco-13",
		title: "Linguiça acebolada",
		category: "Almoço",
		time: 20,
		calories: 450,
		difficulty: "Muito fácil",
		image: "/recipes/almoco-linguica-acebolada.jpg",
		ingredients: [
			"500 g de linguiça",
			"2 cebolas",
			"1 dente de alho",
			"1 colher de óleo",
			"Cheiro-verde a gosto"
		],
		description: "Linguiça dourada com cebola, petisco ou prato rápido e cheiroso.",
		steps: [
			"Corte a linguiça em rodelas.",
			"Aqueça o óleo e doure a linguiça dos dois lados.",
			"Acrescente a cebola em rodelas e o alho.",
			"Refogue até a cebola murchar e dourar.",
			"Finalize com cheiro-verde e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-14",
		title: "Peixe frito",
		category: "Almoço",
		time: 25,
		calories: 390,
		difficulty: "Fácil",
		image: "/recipes/almoco-peixe-frito.jpg",
		ingredients: [
			"2 filés de peixe",
			"1 limão",
			"2 dentes de alho",
			"1 xícara de farinha de trigo",
			"Óleo para fritar",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Filés de peixe empanados e fritos até ficarem dourados e crocantes.",
		steps: [
			"Tempere os filés com limão, alho, sal e pimenta.",
			"Passe levemente na farinha de trigo.",
			"Frite em óleo quente até dourar dos dois lados.",
			"Escorra sobre papel-toalha.",
			"Sirva com limão e acompanhamento."
		],
		protein: "30 g"
	},
	{
		id: "catalog-almoco-15",
		title: "Peixe assado",
		category: "Almoço",
		time: 35,
		calories: 300,
		difficulty: "Fácil",
		image: "/recipes/almoco-peixe-assado.jpg",
		ingredients: [
			"2 filés de peixe",
			"1 limão",
			"2 dentes de alho",
			"2 colheres de azeite",
			"1 colher de ervas",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Filés de peixe assados com azeite e ervas, leves e suculentos.",
		steps: [
			"Tempere os filés com limão, alho, sal, pimenta e ervas.",
			"Disponha em uma assadeira levemente untada.",
			"Regue com o azeite.",
			"Asse a 200 °C até o peixe ficar opaco e se separar em lascas.",
			"Sirva com limão e acompanhamentos."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-16",
		title: "Tilápia grelhada",
		category: "Almoço",
		time: 20,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/almoco-tilapia-grelhada.jpg",
		ingredients: [
			"2 filés de tilápia",
			"1 limão",
			"1 dente de alho",
			"1 colher de azeite",
			"Sal e ervas a gosto"
		],
		description: "Tilápia grelhada dourada e suculenta, temperada com alho e limão.",
		steps: [
			"Tempere os filés com limão, alho, sal e ervas.",
			"Aqueça uma frigideira grelhada com azeite.",
			"Grelhe os filés poucos minutos de cada lado, sem mexer muito.",
			"Deixe dourar levemente e cozinhar por dentro.",
			"Sirva com o acompanhamento de sua preferência."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-17",
		title: "Macarronada",
		category: "Almoço",
		time: 35,
		calories: 520,
		difficulty: "Fácil",
		image: "/recipes/almoco-macarronada.jpg",
		ingredients: [
			"500 g de macarrão",
			"300 g de carne moída",
			"1 cebola",
			"2 dentes de alho",
			"1 lata de molho de tomate",
			"150 g de mussarela",
			"Sal e orégano a gosto"
		],
		description: "Macarronada de forno com molho de carne e queijo derretido, prato de domingo.",
		steps: [
			"Cozinhe o macarrão em água fervente com sal e escorra.",
			"Refogue a cebola, o alho e a carne moída.",
			"Junte o molho de tomate e tempere com sal e orégano.",
			"Misture o macarrão ao molho e coloque em um refratário.",
			"Cubra com mussarela e leve ao forno para gratinar."
		],
		protein: "28 g"
	},
	{
		id: "catalog-almoco-18",
		title: "Lasanha à bolonhesa",
		category: "Almoço",
		time: 75,
		calories: 580,
		difficulty: "Médio",
		image: "/recipes/almoco-lasanha-a-bolonhesa.jpg",
		ingredients: [
			"1 pacote de massa de lasanha",
			"500 g de carne moída",
			"1 cebola",
			"2 dentes de alho",
			"1 lata de molho de tomate",
			"300 g de mussarela",
			"200 g de parmesão ralado",
			"Sal e orégano a gosto"
		],
		description: "Lasanha clássica com molho bolonhesa e camadas de queijo, gratinada.",
		steps: [
			"Refogue a cebola, o alho e a carne e junte o molho temperado.",
			"Cozinhe o molho até encorpar.",
			"Em um refratário, intercale massa, molho e mussarela.",
			"Repita as camadas e finalize com parmesão.",
			"Asse a 200 °C até dourar e borbulhar."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-19",
		title: "Lasanha de frango",
		category: "Almoço",
		time: 70,
		calories: 540,
		difficulty: "Médio",
		image: "/recipes/almoco-lasanha-de-frango.jpg",
		ingredients: [
			"1 pacote de massa de lasanha",
			"300 g de frango desfiado",
			"1 lata de milho",
			"1 caixa de creme de leite",
			"200 g de requeijão cremoso",
			"200 g de mussarela",
			"Sal e cheiro-verde a gosto"
		],
		description: "Lasanha cremosa de frango desfiado com milho e requeijão, suave e saborosa.",
		steps: [
			"Refogue o frango desfiado com o milho e tempere com sal e cheiro-verde.",
			"Misture o creme de leite e reserve.",
			"Em um refratário, intercale massa, recheio de frango e requeijão.",
			"Repita e finalize com mussarela.",
			"Asse a 200 °C até dourar."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-20",
		title: "Panqueca de carne",
		category: "Almoço",
		time: 45,
		calories: 430,
		difficulty: "Médio",
		image: "/recipes/almoco-panqueca-de-carne.jpg",
		ingredients: [
			"1 xícara de farinha de trigo",
			"1 ovo",
			"1 xícara de leite",
			"300 g de carne moída refogada",
			"1 lata de molho de tomate",
			"100 g de mussarela",
			"Sal a gosto"
		],
		description: "Panquecas recheadas com carne moída e cobertas com molho de tomate e queijo.",
		steps: [
			"Bata a farinha, o ovo, o leite e o sal no liquidificador.",
			"Fatie panquecas finas em uma frigideira untada.",
			"Recheie cada uma com a carne moída refogada e enrole.",
			"Coloque em um refratário e cubra com o molho de tomate e a mussarela.",
			"Leve ao forno para gratinar e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-21",
		title: "Escondidinho de carne",
		category: "Almoço",
		time: 60,
		calories: 520,
		difficulty: "Médio",
		image: "/recipes/almoco-escondidinho-de-carne.jpg",
		ingredients: [
			"300 g de carne seca dessalgada",
			"1 cebola",
			"2 dentes de alho",
			"500 g de mandioca",
			"1 caixa de creme de leite",
			"100 g de mussarela",
			"1 colher de manteiga",
			"Cheiro-verde a gosto"
		],
		description: "Carne seca desfiada escondida sob um purê de mandioca cremoso e gratinado.",
		steps: [
			"Cozinhe a mandioca até amaciar e amasse com manteiga e creme de leite.",
			"Refogue a cebola, o alho e a carne seca desfiada.",
			"Forre um refratário com parte do purê.",
			"Espalhe a carne e cubra com o restante do purê.",
			"Polvilhe mussarela e asse até dourar."
		],
		protein: "30 g"
	},
	{
		id: "catalog-almoco-22",
		title: "Escondidinho de frango",
		category: "Almoço",
		time: 50,
		calories: 480,
		difficulty: "Médio",
		image: "/recipes/almoco-escondidinho-de-frango.jpg",
		ingredients: [
			"300 g de frango desfiado",
			"1/2 cebola",
			"1 dente de alho",
			"1 lata de milho",
			"500 g de batata",
			"1 caixa de creme de leite",
			"100 g de mussarela",
			"Sal e cheiro-verde a gosto"
		],
		description: "Frango cremoso com milho sob purê de batata gratinado, reconfortante.",
		steps: [
			"Cozinhe e amasse a batata com creme de leite até virar purê.",
			"Refogue a cebola, o alho e o frango com o milho.",
			"Forre um refratário com parte do purê.",
			"Espalhe o recheio de frango e cubra com o restante do purê.",
			"Polvilhe mussarela e asse até dourar."
		],
		protein: "28 g"
	},
	{
		id: "catalog-almoco-23",
		title: "Arroz carreteiro",
		category: "Almoço",
		time: 40,
		calories: 470,
		difficulty: "Médio",
		image: "/recipes/almoco-arroz-carreteiro.jpg",
		ingredients: [
			"300 g de carne seca dessalgada",
			"1 cebola",
			"2 dentes de alho",
			"1/2 pimentão",
			"2 xícaras de arroz",
			"1 colher de óleo",
			"Sal a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Arroz soltinho cozido com carne seca, no estilo do pampa gaúcho.",
		steps: [
			"Dessalgue, cozinhe e desfie a carne seca.",
			"Refogue a cebola, o alho e o pimentão no óleo.",
			"Junte a carne e refogue bem.",
			"Acrescente o arroz e a água e cozinhe até secar e amaciar.",
			"Solte os grãos, finalize com cheiro-verde e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-24",
		title: "Arroz de forno",
		category: "Almoço",
		time: 45,
		calories: 450,
		difficulty: "Fácil",
		image: "/recipes/almoco-arroz-de-forno.jpg",
		ingredients: [
			"2 xícaras de arroz cozido",
			"200 g de presunto",
			"200 g de mussarela",
			"1 lata de milho",
			"1 lata de ervilha",
			"1 xícara de molho de tomate",
			"1 colher de manteiga",
			"Cheiro-verde a gosto"
		],
		description: "Arroz reinventado no forno com presunto, queijo, milho e ervilha.",
		steps: [
			"Misture o arroz com o milho, a ervilha e o molho de tomate.",
			"Unte um refratário com manteiga.",
			"Coloque metade do arroz e cubra com presunto e mussarela.",
			"Repita as camadas e finalize com mussarela.",
			"Asse a 200 °C até dourar e sirva."
		],
		protein: "22 g"
	},
	{
		id: "catalog-almoco-25",
		title: "Galinhada",
		category: "Almoço",
		time: 50,
		calories: 480,
		difficulty: "Médio",
		image: "/recipes/almoco-galinhada.jpg",
		ingredients: [
			"500 g de frango em pedaços",
			"2 xícaras de arroz",
			"1 cebola",
			"2 dentes de alho",
			"1/2 pimentão",
			"1 colher de açafrão",
			"1 colher de óleo",
			"Sal e cheiro-verde a gosto"
		],
		description: "Arroz amarelo cozido com frango, prato típico de Minas e Goiás.",
		steps: [
			"Refogue a cebola, o alho e o pimentão no óleo.",
			"Doure o frango e tempere com sal e açafrão.",
			"Junte o arroz e a água e cozinhe até secar e amaciar.",
			"Deixe descansar tampado por alguns minutos.",
			"Finalize com cheiro-verde e sirva."
		],
		protein: "30 g"
	},
	{
		id: "catalog-almoco-26",
		title: "Feijoada",
		category: "Almoço",
		time: 150,
		calories: 560,
		difficulty: "Difícil",
		image: "/recipes/almoco-feijoada.jpg",
		ingredients: [
			"500 g de feijão preto",
			"300 g de carne seca",
			"200 g de paio",
			"200 g de costela defumada",
			"1 cebola",
			"3 dentes de alho",
			"2 folhas de louro",
			"Sal a gosto",
			"Laranja e couve para acompanhar"
		],
		description: "A clássica feijoada brasileira com carnes defumadas, servada com arroz e couve.",
		steps: [
			"Dessalgue as carnes e cozinhe o feijão com o louro.",
			"Acrescente as carnes e cozinhe até amaciarem.",
			"Refogue a cebola e o alho e junte ao feijão.",
			"Cozinhe em fogo baixo até o caldo engrossar.",
			"Sirva com arroz branco, couve e laranja."
		],
		protein: "38 g"
	},
	{
		id: "catalog-almoco-27",
		title: "Feijão tropeiro",
		category: "Almoço",
		time: 50,
		calories: 520,
		difficulty: "Médio",
		image: "/recipes/almoco-feijao-tropeiro.jpg",
		ingredients: [
			"2 xícaras de feijão cozido",
			"200 g de linguiça calabresa",
			"100 g de bacon",
			"2 xícaras de farinha de mandioca",
			"1 cebola",
			"2 dentes de alho",
			"1 maço de couve",
			"Sal a gosto"
		],
		description: "Prato mineiro de feijão com linguiça, bacon, couve e farinha, encorpado.",
		steps: [
			"Frite o bacon e a linguiça em cubos.",
			"Refogue a cebola e o alho na mesma panela.",
			"Junte o feijão cozido e tempere com sal.",
			"Acrescente a couve picada e mexa até murchar.",
			"Engrosse com a farinha de mandioca e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-28",
		title: "Baião de dois",
		category: "Almoço",
		time: 45,
		calories: 480,
		difficulty: "Médio",
		image: "/recipes/almoco-baiao-de-dois.jpg",
		ingredients: [
			"1 xícara de arroz",
			"1 xícara de feijão verde",
			"200 g de queijo coalho",
			"100 g de bacon",
			"1 cebola",
			"2 dentes de alho",
			"1 colher de manteiga de garrafa",
			"Sal e cheiro-verde a gosto"
		],
		description: "Clássico cearense de arroz com feijão verde e queijo coalho, cremoso e saboroso.",
		steps: [
			"Cozinhe o feijão verde até amaciar.",
			"Frite o bacon e refogue a cebola e o alho na manteiga de garrafa.",
			"Junte o arroz e o feijão com seu caldo e cozinhe até secar.",
			"Acrescente o queijo coalho em cubos e mexa até derreter.",
			"Finalize com cheiro-verde e sirva."
		],
		protein: "24 g"
	},
	{
		id: "catalog-almoco-29",
		title: "Risoto de frango",
		category: "Almoço",
		time: 35,
		calories: 460,
		difficulty: "Médio",
		image: "/recipes/almoco-risoto-de-frango.jpg",
		ingredients: [
			"1 xícara de arroz arbóreo",
			"200 g de peito de frango em cubos",
			"1/2 cebola",
			"1 litro de caldo de galinha",
			"1/2 xícara de parmesão ralado",
			"1 colher de manteiga",
			"1/2 xícara de vinho branco",
			"Sal a gosto"
		],
		description: "Risoto cremoso de frango feito com arroz arbóreo, finalizado com parmesão.",
		steps: [
			"Refogue a cebola na manteiga e junte o frango.",
			"Acrescente o arroz e refogue, depois o vinho branco.",
			"Vá adicionando o caldo quente aos poucos, mexendo sempre.",
			"Cozinhe até o arroz ficar al dente e cremoso.",
			"Finalize com parmesão e manteiga e sirva imediatamente."
		],
		protein: "30 g"
	},
	{
		id: "catalog-almoco-30",
		title: "Risoto de camarão",
		category: "Almoço",
		time: 35,
		calories: 430,
		difficulty: "Médio",
		image: "/recipes/almoco-risoto-de-camarao.jpg",
		ingredients: [
			"1 xícara de arroz arbóreo",
			"300 g de camarão",
			"1/2 cebola",
			"2 dentes de alho",
			"1 litro de caldo de camarão",
			"1/2 xícara de vinho branco",
			"1/2 xícara de parmesão ralado",
			"1 colher de manteiga",
			"Sal e salsinha a gosto"
		],
		description: "Risoto cremoso de camarão com vinho branco e parmesão, refinado e saboroso.",
		steps: [
			"Sele o camarão no alho e reserve.",
			"Refogue a cebola na manteiga e junte o arroz e o vinho.",
			"Adicione o caldo quente aos poucos, mexendo sempre.",
			"Quando o arroz estiver al dente, junte o camarão.",
			"Finalize com parmesão e salsinha e sirva imediatamente."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-31",
		title: "Purê com carne moída",
		category: "Almoço",
		time: 40,
		calories: 450,
		difficulty: "Fácil",
		image: "/recipes/almoco-pure-com-carne-moida.jpg",
		ingredients: [
			"400 g de carne moída",
			"1 cebola",
			"2 dentes de alho",
			"1 lata de milho",
			"4 batatas",
			"1 caixa de creme de leite",
			"100 g de mussarela",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Carne moída cremosa com milho coberta por purê de batata gratinado, prato de panela.",
		steps: [
			"Refogue a cebola, o alho e a carne e junte o milho.",
			"Cozinhe as batatas e amasse com manteiga e creme de leite.",
			"Coloque a carne em um refratário.",
			"Cubra com o purê e a mussarela.",
			"Asse até dourar e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-32",
		title: "Frango com creme de milho",
		category: "Almoço",
		time: 35,
		calories: 430,
		difficulty: "Fácil",
		image: "/recipes/almoco-frango-com-creme-de-milho.jpg",
		ingredients: [
			"300 g de peito de frango",
			"1 lata de milho",
			"1 caixa de creme de leite",
			"1/2 cebola",
			"1 dente de alho",
			"1 colher de manteiga",
			"Sal e cheiro-verde a gosto"
		],
		description: "Frango cremoso envolvido em creme de milho, suave e dourado.",
		steps: [
			"Tempere e doure o frango cortado em cubos na manteiga.",
			"Refogue a cebola e o alho e volte o frango.",
			"Bata o milho com o creme de leite e junte à panela.",
			"Cozinhe mexendo até formar um creme e tempere com sal.",
			"Finalize com cheiro-verde e sirva com arroz."
		],
		protein: "32 g"
	},
	{
		id: "catalog-almoco-33",
		title: "Frango ao molho",
		category: "Almoço",
		time: 40,
		calories: 410,
		difficulty: "Fácil",
		image: "/recipes/almoco-frango-ao-molho.jpg",
		ingredients: [
			"500 g de sobrecoxa de frango",
			"1 cebola",
			"2 dentes de alho",
			"2 tomates",
			"1 colher de óleo",
			"1 folha de louro",
			"Sal e cheiro-verde a gosto"
		],
		description: "Frango cozido em molho de tomate caseiro, macio e saboroso.",
		steps: [
			"Tempere o frango com sal, alho e louro.",
			"Sele o frango no óleo quente.",
			"Junte a cebola e os tomates picados.",
			"Acrescente um pouco de água e cozinhe até o frango amaciar.",
			"Finalize com cheiro-verde e sirva com arroz."
		],
		protein: "34 g"
	},
	{
		id: "catalog-almoco-34",
		title: "Yakisoba de carne",
		category: "Almoço",
		time: 30,
		calories: 450,
		difficulty: "Médio",
		image: "/recipes/almoco-yakisoba-de-carne.jpg",
		ingredients: [
			"200 g de carne bovina em tiras",
			"1 pacote de macarrão yakisoba",
			"1/2 repolho",
			"1 cenoura",
			"1/2 pimentão",
			"1/2 cebola",
			"3 colheres de molho yakisoba",
			"1 colher de óleo"
		],
		description: "Refogado japonês de macarrão com carne e legumes no molho yakisoba.",
		steps: [
			"Cozinhe o macarrão conforme a embalagem e reserve.",
			"Sele a carne em tiras no óleo quente e reserve.",
			"Salteie a cebola, o repolho, a cenoura e o pimentão em tiras.",
			"Volte a carne e o macarrão e misture.",
			"Acrescente o molho yakisoba, envolva bem e sirva."
		],
		protein: "28 g"
	},
	{
		id: "catalog-almoco-35",
		title: "Yakisoba de frango",
		category: "Almoço",
		time: 30,
		calories: 420,
		difficulty: "Médio",
		image: "/recipes/almoco-yakisoba-de-frango.jpg",
		ingredients: [
			"200 g de peito de frango em tiras",
			"1 pacote de macarrão yakisoba",
			"1/2 repolho",
			"1 cenoura",
			"1/2 pimentão",
			"1/2 cebola",
			"3 colheres de molho yakisoba",
			"1 colher de óleo"
		],
		description: "Refogado japonês de macarrão com frango e legumes no molho yakisoba.",
		steps: [
			"Cozinhe o macarrão conforme a embalagem e reserve.",
			"Sele o frango em tiras no óleo quente e reserve.",
			"Salteie a cebola, o repolho, a cenoura e o pimentão em tiras.",
			"Volte o frango e o macarrão e misture.",
			"Acrescente o molho yakisoba, envolva bem e sirva."
		],
		protein: "26 g"
	},
	{
		id: "catalog-almoco-36",
		title: "Frango cremoso com ervas",
		category: "Almoço",
		time: 25,
		calories: 420,
		difficulty: "Fácil",
		image: "/recipes/base-frango-cremoso-com-ervas.jpg",
		ingredients: [
			"300 g de peito de frango",
			"1 caixa de creme de leite",
			"1 dente de alho",
			"1/2 limão",
			"Cheiro-verde a gosto",
			"Sal e ervas a gosto"
		],
		description: "Um prato aconchegante, cremoso e cheio de sabor, perfeito para o almoço.",
		steps: [
			"Tempere o frango com alho, limão, sal e ervas.",
			"Doure os pedaços em uma frigideira aquecida.",
			"Adicione o creme de leite e um pouco de água.",
			"Cozinhe em fogo baixo até formar um molho cremoso.",
			"Finalize com cheiro-verde e sirva."
		],
		protein: "36 g"
	},
	{
		id: "catalog-sobremesas-1",
		title: "Brigadeiro",
		category: "Sobremesas",
		time: 25,
		calories: 130,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-brigadeiro.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"3 colheres de chocolate em pó",
			"1 colher de manteiga",
			"Chocolate granulado"
		],
		description: "O doce brasileiro mais querido, com massa brilhante e casquinha de granulado.",
		steps: [
			"Coloque o leite condensado, o chocolate em pó e a manteiga em uma panela.",
			"Misture em fogo baixo até dissolver o chocolate.",
			"Mexa sem parar até a massa engrossar e desgrudar do fundo.",
			"Transfira para um prato untado e espere esfriar.",
			"Enrole com as mãos untadas e passe no granulado, ou sirva de colher."
		],
		protein: "2 g"
	},
	{
		id: "catalog-sobremesas-2",
		title: "Beijinho",
		category: "Sobremesas",
		time: 25,
		calories: 120,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-beijinho.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"1 colher de manteiga",
			"100 g de coco ralado",
			"Cravos-da-índia para decorar"
		],
		description: "Docinho de coco com textura macia, tradicional em festas e comemorações.",
		steps: [
			"Misture o leite condensado, a manteiga e metade do coco em uma panela.",
			"Cozinhe em fogo baixo, mexendo sempre.",
			"Quando desgrudar do fundo, desligue e deixe esfriar.",
			"Unte as mãos e modele pequenas bolinhas.",
			"Passe no coco restante e decore com cravo, se desejar."
		],
		protein: "2 g"
	},
	{
		id: "catalog-sobremesas-3",
		title: "Mousse de maracujá",
		category: "Sobremesas",
		time: 15,
		calories: 230,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-mousse-de-maracuja.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"1 caixa de creme de leite",
			"200 ml de suco concentrado de maracujá",
			"Polpa de 1 maracujá para decorar"
		],
		description: "Mousse cremosa e refrescante de maracujá, pronta em poucos minutos.",
		steps: [
			"Coloque o leite condensado, o creme de leite e o suco concentrado no liquidificador.",
			"Bata por cerca de 2 minutos, até obter um creme uniforme.",
			"Distribua em taças ou em um refratário.",
			"Leve à geladeira por pelo menos 3 horas, até firmar.",
			"Finalize com a polpa de maracujá e sirva gelado."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-4",
		title: "Mousse de limão",
		category: "Sobremesas",
		time: 15,
		calories: 210,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-mousse-de-limao.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"1 caixa de creme de leite",
			"120 ml de suco de limão",
			"Raspas de limão para decorar"
		],
		description: "Mousse aveludada de limão, com toque cítrico e aroma das raspas.",
		steps: [
			"Coloque o leite condensado e o creme de leite no liquidificador.",
			"Bata e acrescente o suco de limão aos poucos.",
			"Continue batendo até o creme engrossar.",
			"Distribua em taças e leve à geladeira por pelo menos 2 horas.",
			"Finalize com raspas de limão e sirva gelado."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-5",
		title: "Mousse de chocolate",
		category: "Sobremesas",
		time: 20,
		calories: 290,
		difficulty: "Médio",
		image: "/recipes/sobremesas-mousse-de-chocolate.jpg",
		ingredients: [
			"200 g de chocolate meio amargo",
			"1 caixa de creme de leite",
			"3 claras",
			"3 colheres de açúcar"
		],
		description: "Mousse aerada e intensa de chocolate, com claras em neve para leveza.",
		steps: [
			"Derreta o chocolate em banho-maria ou no micro-ondas, mexendo a cada intervalo.",
			"Misture o creme de leite ao chocolate derretido e deixe amornar.",
			"Bata as claras até ficarem firmes e acrescente o açúcar aos poucos.",
			"Incorpore as claras delicadamente ao creme de chocolate.",
			"Distribua em taças e leve à geladeira por pelo menos 3 horas."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-6",
		title: "Pudim de leite condensado",
		category: "Sobremesas",
		time: 80,
		calories: 320,
		difficulty: "Médio",
		image: "/recipes/sobremesas-pudim-de-leite-condensado.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"A mesma medida de leite",
			"3 ovos",
			"1 xícara de açúcar para a calda"
		],
		description: "Pudim clássico de leite condensado, com calda de caramelo e textura macia.",
		steps: [
			"Derreta o açúcar em uma panela até formar um caramelo dourado.",
			"Espalhe o caramelo em uma forma de pudim.",
			"Bata o leite condensado, o leite e os ovos até misturar.",
			"Despeje na forma e asse em banho-maria a 180 °C até firmar.",
			"Espere esfriar, leve à geladeira e desenforme."
		],
		protein: "7 g"
	},
	{
		id: "catalog-sobremesas-7",
		title: "Pudim de caneca",
		category: "Sobremesas",
		time: 10,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-pudim-de-caneca.jpg",
		ingredients: [
			"1 ovo",
			"8 colheres de leite",
			"8 colheres de leite condensado",
			"1 colher de açúcar para o caramelo"
		],
		description: "Pudim individual feito no micro-ondas, rápido para a vontade de doce.",
		steps: [
			"Derreta o açúcar com algumas gotas de água em uma caneca própria para micro-ondas.",
			"Em outro recipiente, misture o ovo, o leite e o leite condensado.",
			"Passe a mistura por uma peneira e coloque sobre o caramelo.",
			"Leve ao micro-ondas em potência média, observando até firmar.",
			"Deixe esfriar e desenforme com cuidado."
		],
		protein: "6 g"
	},
	{
		id: "catalog-sobremesas-8",
		title: "Bolo de cenoura",
		category: "Sobremesas",
		time: 50,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-bolo-de-cenoura.jpg",
		ingredients: [
			"2 cenouras médias",
			"3 ovos",
			"1/2 xícara de óleo",
			"2 xícaras de açúcar",
			"2 xícaras de farinha de trigo",
			"1 colher de fermento"
		],
		description: "Bolo fofinho de cenoura com cobertura de chocolate, clássico do café.",
		steps: [
			"Bata no liquidificador a cenoura, os ovos, o óleo e o açúcar.",
			"Transfira para uma tigela e misture a farinha aos poucos.",
			"Incorpore o fermento delicadamente.",
			"Despeje em forma untada e asse a 180 °C até passar no teste do palito.",
			"Espere amornar antes de desenformar e cobrir, se desejar."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-9",
		title: "Bolo de chocolate",
		category: "Sobremesas",
		time: 45,
		calories: 310,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-bolo-de-chocolate.jpg",
		ingredients: [
			"2 xícaras de farinha de trigo",
			"1 xícara de açúcar",
			"1 xícara de chocolate em pó",
			"3 ovos",
			"1 xícara de leite",
			"1/2 xícara de óleo",
			"1 colher de fermento"
		],
		description: "Bolo úmido e intenso de chocolate, perfeito para o lanche da tarde.",
		steps: [
			"Misture a farinha, o açúcar e o chocolate em pó.",
			"Acrescente os ovos, o leite e o óleo e mexa até ficar homogêneo.",
			"Adicione o fermento por último.",
			"Coloque em forma untada e asse a 180 °C por cerca de 35 minutos.",
			"Espere amornar antes de cortar e servir."
		],
		protein: "6 g"
	},
	{
		id: "catalog-sobremesas-10",
		title: "Bolo de fubá",
		category: "Sobremesas",
		time: 45,
		calories: 260,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-bolo-de-fuba.jpg",
		ingredients: [
			"2 xícaras de fubá",
			"1 xícara de farinha de trigo",
			"1 e 1/2 xícara de açúcar",
			"3 ovos",
			"1 xícara de leite",
			"1/2 xícara de óleo",
			"1 colher de fermento"
		],
		description: "Bolo rústico de fubá, dourado e com aquele gostinho do interior.",
		steps: [
			"Misture o fubá, a farinha e o açúcar.",
			"Acrescente os ovos, o leite e o óleo e mexa até formar uma massa lisa.",
			"Misture o fermento delicadamente.",
			"Despeje em forma untada e asse a 180 °C até dourar.",
			"Deixe amornar antes de desenformar."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-11",
		title: "Bolo de milho",
		category: "Sobremesas",
		time: 50,
		calories: 300,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-bolo-de-milho.jpg",
		ingredients: [
			"1 lata de milho escorrido",
			"3 ovos",
			"1 xícara de leite",
			"1 xícara de açúcar",
			"1/2 xícara de óleo",
			"1 xícara de fubá",
			"1 colher de fermento"
		],
		description: "Bolo cremoso de milho, levemente adocicado e com textura aveludada.",
		steps: [
			"Bata o milho, os ovos, o leite, o açúcar e o óleo no liquidificador.",
			"Acrescente o fubá e bata até misturar.",
			"Adicione o fermento e pulse rapidamente.",
			"Despeje em forma untada e asse a 180 °C até dourar e firmar.",
			"Espere esfriar um pouco antes de servir."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-12",
		title: "Brownie",
		category: "Sobremesas",
		time: 35,
		calories: 350,
		difficulty: "Médio",
		image: "/recipes/sobremesas-brownie.jpg",
		ingredients: [
			"200 g de chocolate meio amargo",
			"150 g de manteiga",
			"1 xícara de açúcar",
			"3 ovos",
			"3/4 de xícara de farinha de trigo",
			"1 pitada de sal"
		],
		description: "Brownie com interior úmido e sabor intenso de chocolate.",
		steps: [
			"Derreta o chocolate com a manteiga e misture até ficar liso.",
			"Acrescente o açúcar e os ovos, um de cada vez.",
			"Incorpore a farinha e o sal sem bater demais.",
			"Espalhe em forma forrada e asse a 180 °C até as bordas firmarem e o centro continuar úmido.",
			"Deixe esfriar antes de cortar em quadrados."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-13",
		title: "Brownie de caneca",
		category: "Sobremesas",
		time: 5,
		calories: 300,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-brownie-de-caneca.jpg",
		ingredients: [
			"2 colheres de farinha de trigo",
			"2 colheres de açúcar",
			"1 colher de chocolate em pó",
			"2 colheres de leite",
			"1 colher de óleo",
			"1 colher de chocolate picado"
		],
		description: "Brownie individual pronto no micro-ondas, em poucos minutos.",
		steps: [
			"Misture a farinha, o açúcar e o chocolate em pó em uma caneca grande.",
			"Adicione o leite e o óleo e mexa até não restarem grumos.",
			"Acrescente o chocolate picado.",
			"Leve ao micro-ondas por intervalos curtos até cozinhar, sem ressecar.",
			"Espere amornar antes de consumir."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-14",
		title: "Cookies de chocolate",
		category: "Sobremesas",
		time: 30,
		calories: 180,
		difficulty: "Médio",
		image: "/recipes/sobremesas-cookies-de-chocolate.jpg",
		ingredients: [
			"1 e 1/2 xícara de farinha de trigo",
			"100 g de manteiga",
			"1/2 xícara de açúcar mascavo",
			"1/4 de xícara de açúcar",
			"1 ovo",
			"1/2 colher de bicarbonato",
			"100 g de gotas de chocolate"
		],
		description: "Cookies macios por dentro e crocantes nas bordas, com gotas de chocolate.",
		steps: [
			"Bata a manteiga com os açúcares até formar um creme.",
			"Misture o ovo e depois incorpore a farinha e o bicarbonato.",
			"Adicione as gotas de chocolate.",
			"Modele porções em uma assadeira, deixando espaço entre elas.",
			"Asse a 180 °C até as bordas dourarem e deixe esfriar para firmar."
		],
		protein: "3 g"
	},
	{
		id: "catalog-sobremesas-15",
		title: "Palha italiana",
		category: "Sobremesas",
		time: 30,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-palha-italiana.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"2 colheres de chocolate em pó",
			"1 colher de manteiga",
			"1 pacote de biscoito maisena",
			"Açúcar para finalizar"
		],
		description: "Docinho de biscoito com brigadeiro, cortado em quadradinhos e passado no açúcar.",
		steps: [
			"Prepare um brigadeiro com leite condensado, chocolate e manteiga.",
			"Cozinhe até ficar consistente e desgrudar do fundo.",
			"Quebre os biscoitos em pedaços e misture ao brigadeiro.",
			"Espalhe em uma forma forrada e leve à geladeira até firmar.",
			"Corte em quadrados e passe no açúcar, se desejar."
		],
		protein: "3 g"
	},
	{
		id: "catalog-sobremesas-16",
		title: "Pavê de chocolate",
		category: "Sobremesas",
		time: 30,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-pave-de-chocolate.jpg",
		ingredients: [
			"1 pacote de biscoito maisena",
			"1 lata de leite condensado",
			"2 xícaras de leite",
			"2 colheres de amido de milho",
			"3 colheres de chocolate em pó",
			"1 caixa de creme de leite"
		],
		description: "Pavê cremoso de chocolate em camadas de biscoito e creme, gelado.",
		steps: [
			"Dissolva o amido em parte do leite e misture com o leite condensado e o chocolate.",
			"Cozinhe mexendo até formar um creme; desligue e misture o creme de leite.",
			"Faça uma camada de creme em um refratário.",
			"Intercale camadas de biscoito levemente umedecido e creme.",
			"Finalize com creme e gele por pelo menos 3 horas."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-17",
		title: "Pavê de limão",
		category: "Sobremesas",
		time: 30,
		calories: 260,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-pave-de-limao.jpg",
		ingredients: [
			"1 pacote de biscoito maisena",
			"1 lata de leite condensado",
			"1 caixa de creme de leite",
			"Suco de 2 limões",
			"Raspas de limão"
		],
		description: "Pavê refrescante de limão com camadas de biscoito e creme cítrico.",
		steps: [
			"Misture o leite condensado com o creme de leite.",
			"Acrescente o suco de limão aos poucos até engrossar.",
			"Intercale camadas do creme com biscoitos em um refratário.",
			"Finalize com uma camada de creme.",
			"Leve à geladeira por pelo menos 3 horas e decore com raspas."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-18",
		title: "Banoffee",
		category: "Sobremesas",
		time: 40,
		calories: 340,
		difficulty: "Médio",
		image: "/recipes/sobremesas-banoffee.jpg",
		ingredients: [
			"200 g de biscoito maisena",
			"100 g de manteiga derretida",
			"300 g de doce de leite",
			"3 bananas",
			"200 ml de chantilly",
			"Canela ou chocolate em pó"
		],
		description: "Torta de banana com base crocante, doce de leite e chantilly, gelada.",
		steps: [
			"Triture os biscoitos e misture com a manteiga.",
			"Pressione a farofa no fundo de uma forma e leve para gelar.",
			"Espalhe o doce de leite sobre a base.",
			"Distribua as bananas fatiadas e cubra com chantilly.",
			"Finalize com canela ou chocolate e mantenha refrigerada."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-19",
		title: "Torta de limão",
		category: "Sobremesas",
		time: 40,
		calories: 290,
		difficulty: "Médio",
		image: "/recipes/sobremesas-torta-de-limao.jpg",
		ingredients: [
			"200 g de biscoito maisena",
			"100 g de manteiga derretida",
			"1 lata de leite condensado",
			"1 caixa de creme de leite",
			"Suco de 3 limões",
			"Raspas de limão"
		],
		description: "Torta gelada de limão com base crocante e recheio cremoso, sem forno.",
		steps: [
			"Triture os biscoitos e misture com a manteiga.",
			"Forre o fundo e as laterais de uma forma e leve ao forno por 10 minutos a 180 °C.",
			"Misture o leite condensado, o creme de leite e o suco de limão.",
			"Despeje o recheio sobre a base já fria.",
			"Gele por pelo menos 3 horas e finalize com raspas de limão."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-20",
		title: "Torta de morango",
		category: "Sobremesas",
		time: 40,
		calories: 280,
		difficulty: "Médio",
		image: "/recipes/sobremesas-torta-de-morango.jpg",
		ingredients: [
			"200 g de biscoito maisena",
			"100 g de manteiga",
			"500 ml de leite",
			"1 lata de leite condensado",
			"2 colheres de amido de milho",
			"1 caixa de morangos"
		],
		description: "Torta gelada com creme de leite condensado e morangos frescos por cima.",
		steps: [
			"Triture os biscoitos e misture com a manteiga para formar a base.",
			"Pressione em uma forma e asse por 10 minutos a 180 °C.",
			"Cozinhe o leite, o leite condensado e o amido até engrossar e deixe esfriar.",
			"Espalhe o creme sobre a base e distribua os morangos higienizados.",
			"Leve à geladeira antes de servir."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-21",
		title: "Cheesecake",
		category: "Sobremesas",
		time: 70,
		calories: 320,
		difficulty: "Difícil",
		image: "/recipes/sobremesas-cheesecake.jpg",
		ingredients: [
			"200 g de biscoito maisena",
			"100 g de manteiga",
			"300 g de cream cheese",
			"1 lata de leite condensado",
			"2 ovos",
			"1 colher de suco de limão"
		],
		description: "Cheesecake cremoso com base de biscoito, assado em banho-maria.",
		steps: [
			"Triture os biscoitos e misture com a manteiga para fazer a base.",
			"Pressione em uma forma de fundo removível.",
			"Bata o cream cheese, o leite condensado, os ovos e o limão até ficar liso.",
			"Despeje sobre a base e asse em banho-maria a 160 °C até firmar nas bordas.",
			"Deixe esfriar e refrigere antes de desenformar."
		],
		protein: "6 g"
	},
	{
		id: "catalog-sobremesas-22",
		title: "Cocada",
		category: "Sobremesas",
		time: 25,
		calories: 220,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-cocada.jpg",
		ingredients: [
			"2 xícaras de coco ralado",
			"1 xícara de açúcar",
			"1/2 xícara de água",
			"1/2 lata de leite condensado"
		],
		description: "Cocada cremosa e dourada, doce de coco com textura macia.",
		steps: [
			"Leve o açúcar e a água ao fogo até formar uma calda leve.",
			"Acrescente o coco ralado e mexa.",
			"Adicione o leite condensado para uma cocada mais cremosa.",
			"Cozinhe até a mistura ficar úmida e encorpada.",
			"Distribua porções sobre papel-manteiga e deixe esfriar."
		],
		protein: "2 g"
	},
	{
		id: "catalog-sobremesas-23",
		title: "Canjica doce",
		category: "Sobremesas",
		time: 90,
		calories: 280,
		difficulty: "Médio",
		image: "/recipes/sobremesas-canjica-doce.jpg",
		ingredients: [
			"500 g de milho para canjica",
			"1 litro de leite",
			"1 lata de leite condensado",
			"200 ml de leite de coco",
			"Canela em pau",
			"Canela em pó"
		],
		description: "Canjica cremosa de milho com leite e canela, típica das festas juninas.",
		steps: [
			"Deixe o milho de molho por algumas horas e escorra.",
			"Cozinhe na panela de pressão com água até os grãos ficarem macios.",
			"Acrescente o leite, o leite condensado, o leite de coco e a canela em pau.",
			"Cozinhe em fogo baixo, mexendo, até ficar cremoso.",
			"Sirva quente ou fria com canela em pó."
		],
		protein: "6 g"
	},
	{
		id: "catalog-sobremesas-24",
		title: "Arroz-doce",
		category: "Sobremesas",
		time: 40,
		calories: 250,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-arroz-doce.jpg",
		ingredients: [
			"1 xícara de arroz",
			"1 litro de leite",
			"1/2 xícara de açúcar",
			"1 pau de canela",
			"Casca de 1/2 limão",
			"Canela em pó"
		],
		description: "Arroz-doce cremoso com canela e casca de limão, servido morno ou gelado.",
		steps: [
			"Lave o arroz e cozinhe com água até começar a amaciar.",
			"Acrescente o leite, o açúcar, a canela em pau e a casca de limão.",
			"Cozinhe em fogo baixo, mexendo para não grudar.",
			"Quando ficar cremoso e o arroz estiver macio, desligue.",
			"Sirva morno ou gelado com canela em pó."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-25",
		title: "Churros",
		category: "Sobremesas",
		time: 35,
		calories: 240,
		difficulty: "Médio",
		image: "/recipes/sobremesas-churros.jpg",
		ingredients: [
			"1 xícara de água",
			"2 colheres de manteiga",
			"1 xícara de farinha de trigo",
			"1 pitada de sal",
			"Açúcar e canela",
			"Doce de leite para acompanhar"
		],
		description: "Churros dourados e crocantes, passados em açúcar com canela e com doce de leite.",
		steps: [
			"Aqueça a água com a manteiga e o sal até ferver.",
			"Adicione a farinha de uma vez e mexa até formar uma massa que solte da panela.",
			"Deixe amornar e coloque a massa em um saco de confeitar com bico estrelado.",
			"Modele os churros e frite em óleo quente com supervisão e cuidado.",
			"Escorra, passe em açúcar com canela e sirva com doce de leite."
		],
		protein: "3 g"
	},
	{
		id: "catalog-sobremesas-27",
		title: "Banana caramelizada",
		category: "Sobremesas",
		time: 20,
		calories: 230,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-banana-caramelizada.jpg",
		ingredients: [
			"4 bananas firmes",
			"1/2 xícara de açúcar",
			"1/4 de xícara de água",
			"1 colher de manteiga",
			"Canela a gosto"
		],
		description: "Bananas douradas em caramelo com manteiga e canela, doce e morno.",
		steps: [
			"Descasque e corte as bananas ao meio no sentido do comprimento.",
			"Derreta o açúcar em uma frigideira até formar caramelo dourado.",
			"Adicione a água com cuidado e mexa até dissolver o caramelo.",
			"Junte a manteiga e as bananas e cozinhe até ficarem macias.",
			"Finalize com canela e sirva morna."
		],
		protein: "1 g"
	},
	{
		id: "catalog-sobremesas-28",
		title: "Morango com chocolate",
		category: "Sobremesas",
		time: 20,
		calories: 200,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-morango-com-chocolate.jpg",
		ingredients: [
			"300 g de morangos",
			"200 g de chocolate ao leite ou meio amargo",
			"1/2 caixa de creme de leite"
		],
		description: "Morangos mergulhados em chocolate, gelados até firmar a casquinha.",
		steps: [
			"Lave os morangos e seque-os completamente.",
			"Derreta o chocolate em banho-maria ou no micro-ondas.",
			"Mergulhe os morangos no chocolate ou distribua o chocolate por cima.",
			"Coloque sobre papel-manteiga.",
			"Leve à geladeira até o chocolate firmar."
		],
		protein: "3 g"
	},
	{
		id: "catalog-sobremesas-30",
		title: "Geladinho gourmet",
		category: "Sobremesas",
		time: 30,
		calories: 150,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-geladinho-gourmet.jpg",
		ingredients: [
			"1 litro de leite",
			"1 lata de leite condensado",
			"1 caixa de creme de leite",
			"4 colheres de leite em pó",
			"Saquinhos próprios para geladinho"
		],
		description: "Geladinho cremoso de leite condensado, refrescante e vendável.",
		steps: [
			"Bata o leite, o leite condensado, o creme de leite e o leite em pó.",
			"Distribua a mistura nos saquinhos com espaço para fechar.",
			"Retire o excesso de ar e amarre bem.",
			"Organize os saquinhos deitados no congelador.",
			"Congele até ficar firme e mantenha congelado até servir."
		],
		protein: "4 g"
	},
	{
		id: "catalog-sobremesas-31",
		title: "Salada de frutas",
		category: "Sobremesas",
		time: 15,
		calories: 120,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-salada-de-frutas.jpg",
		ingredients: [
			"1 banana",
			"1 maçã",
			"1 laranja",
			"1/2 mamão",
			"1 fatia de abacaxi",
			"Suco de 1/2 laranja"
		],
		description: "Mix de frutas frescas e suculentas, sobremesa leve e natural.",
		steps: [
			"Higienize as frutas e descasque as que forem necessárias.",
			"Corte tudo em cubos pequenos e semelhantes.",
			"Coloque as frutas em uma tigela.",
			"Regue com o suco de laranja e misture delicadamente.",
			"Mantenha refrigerada até servir."
		],
		protein: "1 g"
	},
	{
		id: "catalog-sobremesas-32",
		title: "Sorvete caseiro",
		category: "Sobremesas",
		time: 30,
		calories: 260,
		difficulty: "Fácil",
		image: "/recipes/sobremesas-sorvete-caseiro.jpg",
		ingredients: [
			"1 lata de leite condensado",
			"2 caixas de creme de leite",
			"1 colher de essência de baunilha"
		],
		description: "Sorvete cremoso caseiro de leite condensado, sem máquina.",
		steps: [
			"Deixe o creme de leite bem gelado.",
			"Bata o leite condensado com o creme de leite e a baunilha até ficar aerado.",
			"Transfira para um recipiente com tampa.",
			"Leve ao congelador por cerca de 6 horas, mexendo uma vez na metade do tempo.",
			"Retire alguns minutos antes de servir."
		],
		protein: "5 g"
	},
	{
		id: "catalog-sobremesas-33",
		title: "Milk-shake de chocolate",
		category: "Sobremesas",
		time: 10,
		calories: 320,
		difficulty: "Muito fácil",
		image: "/recipes/sobremesas-milk-shake-de-chocolate.jpg",
		ingredients: [
			"3 bolas de sorvete de chocolate",
			"200 ml de leite gelado",
			"2 colheres de chocolate em pó",
			"Chantilly"
		],
		description: "Milk-shake cremoso de chocolate, encorpado e finalizado com chantilly.",
		steps: [
			"Coloque o sorvete, o leite e o chocolate no liquidificador.",
			"Bata rapidamente até ficar cremoso.",
			"Ajuste a quantidade de leite para a textura desejada.",
			"Despeje em um copo alto.",
			"Finalize com chantilly, se desejar, e sirva imediatamente."
		],
		protein: "8 g"
	},
	{
		id: "catalog-sobremesas-35",
		title: "Doce de leite",
		category: "Sobremesas",
		time: 120,
		calories: 230,
		difficulty: "Médio",
		image: "/recipes/sobremesas-doce-de-leite.jpg",
		ingredients: [
			"1 litro de leite",
			"2 xícaras de açúcar",
			"1 pitada de bicarbonato"
		],
		description: "Doce de leite caseiro cremoso, cozido lentamente até caramelizar.",
		steps: [
			"Coloque o leite e o açúcar em uma panela alta e de fundo grosso.",
			"Aqueça em fogo médio, mexendo até dissolver o açúcar.",
			"Cozinhe em fogo baixo, mexendo com frequência, até reduzir e ganhar cor de caramelo.",
			"Desligue quando atingir a consistência desejada; lembre que engrossa ao esfriar.",
			"Deixe esfriar e guarde em recipiente limpo e fechado na geladeira."
		],
		protein: "5 g"
	},
	{
		id: "catalog-cafe-da-manha-1",
		title: "Pão com ovo",
		category: "Café da manhã",
		time: 10,
		calories: 280,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-pao-com-ovo.jpg",
		ingredients: [
			"2 fatias de pão",
			"1 ovo",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Café da manhã prático e farto, com ovo na manteiga servido sobre o pão.",
		steps: [
			"Toste as fatias de pão levemente.",
			"Derreta a manteiga em uma frigideira.",
			"Quebre o ovo e tempere com sal.",
			"Frite do jeito que preferir, mexido ou na chapa.",
			"Sirva o ovo sobre o pão e aproveite."
		],
		protein: "14 g"
	},
	{
		id: "catalog-cafe-da-manha-2",
		title: "Ovo mexido cremoso",
		category: "Café da manhã",
		time: 8,
		calories: 220,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-ovo-mexido-cremoso.jpg",
		ingredients: [
			"2 ovos",
			"1 colher de manteiga",
			"2 colheres de leite",
			"Sal e pimenta-do-reino a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Ovos mexidos macios e cremosos, cozidos em fogo baixo com manteiga.",
		steps: [
			"Bata os ovos com o leite, o sal e a pimenta.",
			"Derreta a manteiga em uma frigideira em fogo baixo.",
			"Despeje os ovos e mexa continuamente com uma espátula.",
			"Retire do fogo antes de firmarem completamente, para ficarem cremosos.",
			"Finalize com cheiro-verde e sirva quente."
		],
		protein: "15 g"
	},
	{
		id: "catalog-cafe-da-manha-3",
		title: "Omelete de queijo",
		category: "Café da manhã",
		time: 10,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-omelete-de-queijo.jpg",
		ingredients: [
			"2 ovos",
			"50 g de queijo mussarela",
			"1 colher de manteiga",
			"Sal e pimenta-do-reino a gosto"
		],
		description: "Omelete simples e derretida, com recheio generoso de queijo.",
		steps: [
			"Bata os ovos com sal e pimenta.",
			"Derreta a manteiga em uma frigideira antiaderente em fogo baixo.",
			"Despeje os ovos e deixe as bordas firmarem.",
			"Coloque o queijo de um lado e dobre ao meio.",
			"Sirva assim que o queijo começar a derreter."
		],
		protein: "20 g"
	},
	{
		id: "catalog-cafe-da-manha-4",
		title: "Omelete de legumes",
		category: "Café da manhã",
		time: 15,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-omelete-de-legumes.jpg",
		ingredients: [
			"2 ovos",
			"1/2 tomate",
			"1/4 de pimentão",
			"1 colher de cebola",
			"1 colher de azeite",
			"Sal e cheiro-verde a gosto"
		],
		description: "Omelete colorida e nutritiva recheada com legumes frescos.",
		steps: [
			"Refogue a cebola, o tomate e o pimentão no azeite e reserve.",
			"Bata os ovos com sal e cheiro-verde.",
			"Despeje os ovos em uma frigideira antiaderente.",
			"Quando as bordas firmarem, distribua os legumes.",
			"Dobre ao meio e sirva."
		],
		protein: "16 g"
	},
	{
		id: "catalog-cafe-da-manha-5",
		title: "Tapioca com queijo",
		category: "Café da manhã",
		time: 10,
		calories: 230,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-tapioca-com-queijo.jpg",
		ingredients: [
			"3 colheres de goma de tapioca",
			"50 g de queijo mussarela",
			"Manteiga a gosto",
			"Sal a gosto"
		],
		description: "Tapioca quentinha e sem glúten, recheada com queijo derretido.",
		steps: [
			"Peneire a goma e espalhe em uma frigideira quente e seca.",
			"Aguarde a tapioca formar e desgrudar.",
			"Coloque o queijo picado de um lado.",
			"Dobre ao meio e espere o queijo derreter.",
			"Passe manteiga, se desejar, e sirva quente."
		],
		protein: "13 g"
	},
	{
		id: "catalog-cafe-da-manha-8",
		title: "Cuscuz com manteiga",
		category: "Café da manhã",
		time: 15,
		calories: 240,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-cuscuz-com-manteiga.jpg",
		ingredients: [
			"1 xícara de flocão de milho",
			"1/2 xícara de água",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Cuscuz nordestino fofinho com manteiga, café da manhã simples e gostoso.",
		steps: [
			"Misture o flocão com a água e uma pitada de sal e deixe hidratar.",
			"Cozinhe no cuscuzeiro ou na frigideira por cerca de 10 minutos.",
			"Desinforme e solte com a manteiga.",
			"Sirva quente com manteiga extra por cima, se gostar.",
			"Acompanha bem um café passado na hora."
		],
		protein: "4 g"
	},
	{
		id: "catalog-cafe-da-manha-9",
		title: "Cuscuz com ovo",
		category: "Café da manhã",
		time: 20,
		calories: 310,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-cuscuz-com-ovo.jpg",
		ingredients: [
			"1 xícara de flocão de milho",
			"1/2 xícara de água",
			"2 ovos",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Cuscuz nordestino servido com ovos mexidos, café da manhã farto e prático.",
		steps: [
			"Misture o flocão com a água e o sal e deixe hidratar.",
			"Cozinhe o cuscuz por cerca de 10 minutos.",
			"À parte, faça ovos mexidos com manteiga.",
			"Solte o cuscuz com um pouco de manteiga.",
			"Sirva com os ovos por cima."
		],
		protein: "12 g"
	},
	{
		id: "catalog-cafe-da-manha-10",
		title: "Cuscuz com queijo",
		category: "Café da manhã",
		time: 20,
		calories: 290,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-cuscuz-com-queijo.jpg",
		ingredients: [
			"1 xícara de flocão de milho",
			"1/2 xícara de água",
			"50 g de queijo coalho",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Cuscuz nordestino com queijo coalho derretido, sabor marcante do Norte.",
		steps: [
			"Misture o flocão com a água e o sal e deixe hidratar.",
			"Cozinhe o cuscuz por cerca de 10 minutos.",
			"Corte o queijo coalho em cubos e distribua por cima.",
			"Tampe por alguns minutos até o queijo amolecer.",
			"Solte com manteiga e sirva quente."
		],
		protein: "10 g"
	},
	{
		id: "catalog-cafe-da-manha-11",
		title: "Pão na chapa",
		category: "Café da manhã",
		time: 5,
		calories: 200,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-pao-na-chapa.jpg",
		ingredients: [
			"1 pão francês",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "Pão francês quentinho na chapa com manteiga, café da manhã clássico.",
		steps: [
			"Corte o pão ao meio no sentido do comprimento.",
			"Aqueça uma frigideira ou chapa em fogo médio.",
			"Passe manteiga nas faces internas do pão.",
			"Coloque na chapa com a manteiga virada para baixo.",
			"Doure levemente e sirva quente."
		],
		protein: "5 g"
	},
	{
		id: "catalog-cafe-da-manha-12",
		title: "Misto-quente",
		category: "Café da manhã",
		time: 8,
		calories: 320,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-misto-quente.jpg",
		ingredients: [
			"2 fatias de pão de forma",
			"2 fatias de presunto",
			"2 fatias de queijo mussarela",
			"1 colher de manteiga"
		],
		description: "Sanduíche prensado quentinho com presunto e queijo, o clássico misto-quente.",
		steps: [
			"Passe manteiga por fora das fatias de pão.",
			"Monte o sanduíche com o presunto e o queijo.",
			"Aqueça uma frigideira em fogo médio.",
			"Doure o sanduíche dos dois lados, pressionando.",
			"Corte na diagonal e sirva quente."
		],
		protein: "18 g"
	},
	{
		id: "catalog-cafe-da-manha-13",
		title: "Pão de queijo",
		category: "Café da manhã",
		time: 35,
		calories: 120,
		difficulty: "Médio",
		image: "/recipes/cafe-da-manha-pao-de-queijo.jpg",
		ingredients: [
			"2 xícaras de polvilho azedo",
			"1/2 xícara de leite",
			"1/4 de xícara de óleo",
			"2 ovos",
			"1 xícara de queijo ralado",
			"Sal a gosto"
		],
		description: "Pão de queijo mineiro douradinho e queijudo, assado e fofo.",
		steps: [
			"Ferva o leite com o óleo e o sal e despeje sobre o polvilho.",
			"Misture e espere amornar.",
			"Junte os ovos e o queijo e sove até formar uma massa macia.",
			"Modele bolinhas e coloque em uma assadeira.",
			"Asse a 200 °C até dourar e crescer."
		],
		protein: "4 g"
	},
	{
		id: "catalog-cafe-da-manha-14",
		title: "Panqueca americana",
		category: "Café da manhã",
		time: 20,
		calories: 300,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-panqueca-americana.jpg",
		ingredients: [
			"1 xícara de farinha de trigo",
			"1 ovo",
			"1 xícara de leite",
			"1 colher de fermento",
			"2 colheres de açúcar",
			"1 colher de manteiga derretida",
			"Sal a gosto"
		],
		description: "Panquecas fofinhas e douradas, servidas com mel ou calda.",
		steps: [
			"Misture a farinha, o açúcar, o fermento e o sal.",
			"Junte o leite, o ovo e a manteiga e mexa até homogeneizar.",
			"Despeje porções em uma frigideira antiaderente levemente untada.",
			"Vire quando surgirem bolhas na superfície.",
			"Sirva quente com mel ou frutas."
		],
		protein: "9 g"
	},
	{
		id: "catalog-cafe-da-manha-15",
		title: "Panqueca de banana",
		category: "Café da manhã",
		time: 15,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-panqueca-de-banana.jpg",
		ingredients: [
			"1 banana madura",
			"1 ovo",
			"3 colheres de aveia",
			"Canela a gosto",
			"Mel a gosto"
		],
		description: "Panqueca doce naturalmente, com banana e aveia, sem farinha.",
		steps: [
			"Amasse a banana e misture o ovo e a aveia.",
			"Aqueça uma frigideira antiaderente levemente untada.",
			"Despeje pequenas porções de massa.",
			"Vire quando a superfície firmar levemente.",
			"Sirva com canela e mel."
		],
		protein: "8 g"
	},
	{
		id: "catalog-cafe-da-manha-16",
		title: "Waffle",
		category: "Café da manhã",
		time: 25,
		calories: 330,
		difficulty: "Médio",
		image: "/recipes/cafe-da-manha-waffle.jpg",
		ingredients: [
			"1 e 1/2 xícara de farinha de trigo",
			"1 ovo",
			"1 xícara de leite",
			"1/4 de xícara de manteiga derretida",
			"1 colher de fermento",
			"2 colheres de açúcar",
			"Sal a gosto"
		],
		description: "Waffle crocante por fora e macio por dentro, perfeito com mel ou frutas.",
		steps: [
			"Misture a farinha, o açúcar, o fermento e o sal.",
			"Junte o leite, o ovo e a manteiga e mexa até homogeneizar.",
			"Aqueça a máquina de waffle e unte levemente.",
			"Despeje a massa e cozinhe até dourar.",
			"Sirva quente com mel, frutas ou manteiga."
		],
		protein: "8 g"
	},
	{
		id: "catalog-cafe-da-manha-17",
		title: "Torrada com requeijão",
		category: "Café da manhã",
		time: 8,
		calories: 250,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-torrada-com-requeijao.jpg",
		ingredients: [
			"2 fatias de pão de forma",
			"3 colheres de requeijão cremoso",
			"Orégano a gosto"
		],
		description: "Torrada quentinha coberta com requeijão cremoso, lanche prático da manhã.",
		steps: [
			"Toste as fatias de pão até ficarem douradas.",
			"Espalhe o requeijão cremoso sobre cada torrada.",
			"Pulverize orégano por cima.",
			"Deixe o requeijão amolecer levemente.",
			"Sirva imediatamente."
		],
		protein: "7 g"
	},
	{
		id: "catalog-cafe-da-manha-18",
		title: "Sanduíche natural",
		category: "Café da manhã",
		time: 10,
		calories: 290,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-sanduiche-natural.jpg",
		ingredients: [
			"2 fatias de pão de forma",
			"100 g de frango desfiado",
			"1 colher de maionese",
			"1/2 cenoura ralada",
			"Folhas de alface",
			"Sal a gosto"
		],
		description: "Sanduíche prático com frango desfiado e cenoura, leve e saciante.",
		steps: [
			"Misture o frango desfiado com a maionese e o sal.",
			"Disponha a alface sobre uma fatia de pão.",
			"Espalhe o recheio de frango e a cenoura ralada.",
			"Feche o sanduíche com a outra fatia.",
			"Corte ao meio e sirva."
		],
		protein: "20 g"
	},
	{
		id: "catalog-cafe-da-manha-19",
		title: "Pão integral com queijo",
		category: "Café da manhã",
		time: 8,
		calories: 260,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-pao-integral-com-queijo.jpg",
		ingredients: [
			"2 fatias de pão integral",
			"2 fatias de queijo branco",
			"1 colher de requeijão",
			"Orégano a gosto"
		],
		description: "Lanche leve no pão integral com queijo branco, opção saudável para a manhã.",
		steps: [
			"Toste levemente as fatias de pão integral.",
			"Espalhe o requeijão sobre o pão.",
			"Disponha as fatias de queijo branco.",
			"Pulverize orégano por cima.",
			"Sirva em seguida."
		],
		protein: "13 g"
	},
	{
		id: "catalog-cafe-da-manha-20",
		title: "Mingau de aveia",
		category: "Café da manhã",
		time: 10,
		calories: 220,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-mingau-de-aveia.jpg",
		ingredients: [
			"3 colheres de aveia",
			"1 xícara de leite",
			"1 colher de mel",
			"Canela a gosto"
		],
		description: "Mingau quentinho e cremoso de aveia, reconfortante para a manhã.",
		steps: [
			"Leve o leite ao fogo baixo.",
			"Acrescente a aveia e mexa sem parar.",
			"Cozinhe até engrossar e ficar cremoso.",
			"Transfira para uma tigela.",
			"Finalize com mel e canela e sirva morno."
		],
		protein: "8 g"
	},
	{
		id: "catalog-cafe-da-manha-21",
		title: "Overnight oats",
		category: "Café da manhã",
		time: 5,
		calories: 230,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-overnight-oats.jpg",
		ingredients: [
			"1/2 xícara de aveia",
			"1/2 xícara de leite",
			"1/4 de xícara de iogurte",
			"1 colher de mel",
			"1/2 banana",
			"Canela a gosto"
		],
		description: "Aveia preparada na noite anterior, cremosa e pronta para a manhã.",
		steps: [
			"Misture a aveia, o leite e o iogurte em um pote.",
			"Adicione o mel e a canela.",
			"Deixe na geladeira durante a noite.",
			"Pela manhã, corte a banana em rodelas e coloque por cima.",
			"Sirva gelado."
		],
		protein: "9 g"
	},
	{
		id: "catalog-cafe-da-manha-22",
		title: "Iogurte com granola",
		category: "Café da manhã",
		time: 5,
		calories: 220,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-iogurte-com-granola.jpg",
		ingredients: [
			"1 pote de iogurte natural",
			"3 colheres de granola",
			"1 colher de mel",
			"Canela a gosto"
		],
		description: "Café da manhã leve e prático, com iogurte, granola e mel.",
		steps: [
			"Coloque o iogurte em uma tigela.",
			"Salpique a granola por cima.",
			"Regue com o mel.",
			"Pulverize canela a gosto.",
			"Sirva imediatamente."
		],
		protein: "8 g"
	},
	{
		id: "catalog-cafe-da-manha-23",
		title: "Vitamina de banana",
		category: "Café da manhã",
		time: 5,
		calories: 200,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-vitamina-de-banana.jpg",
		ingredients: [
			"1 banana",
			"1 xícara de leite",
			"1 colher de aveia",
			"Mel a gosto",
			"Canela a gosto"
		],
		description: "Vitamina cremosa de banana, energética e nutritiva para a manhã.",
		steps: [
			"Coloque a banana, o leite e a aveia no liquidificador.",
			"Bata até ficar cremoso.",
			"Adoce com mel a gosto.",
			"Despeje em um copo.",
			"Pulverize canela e sirva gelado."
		],
		protein: "7 g"
	},
	{
		id: "catalog-cafe-da-manha-24",
		title: "Vitamina de morango",
		category: "Café da manhã",
		time: 5,
		calories: 180,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-vitamina-de-morango.jpg",
		ingredients: [
			"1 xícara de morangos",
			"1 xícara de leite",
			"1 colher de aveia",
			"Mel a gosto"
		],
		description: "Vitamina refrescante de morango, doce naturalmente e nutritiva.",
		steps: [
			"Lave e tire os talos dos morangos.",
			"Coloque os morangos, o leite e a aveia no liquidificador.",
			"Bata até ficar cremoso.",
			"Adoce com mel a gosto.",
			"Sirva gelado."
		],
		protein: "7 g"
	},
	{
		id: "catalog-cafe-da-manha-25",
		title: "Vitamina de abacate",
		category: "Café da manhã",
		time: 5,
		calories: 240,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-vitamina-de-abacate.jpg",
		ingredients: [
			"1/2 abacate",
			"1 xícara de leite",
			"1 colher de mel",
			"Canela a gosto"
		],
		description: "Vitamina cremosa e saciante de abacate, rica em gorduras boas.",
		steps: [
			"Coloque o abacate, o leite e o mel no liquidificador.",
			"Bata até ficar bem cremoso.",
			"Despeje em um copo.",
			"Pulverize canela por cima.",
			"Sirva gelado."
		],
		protein: "6 g"
	},
	{
		id: "catalog-cafe-da-manha-26",
		title: "Smoothie de frutas",
		category: "Café da manhã",
		time: 5,
		calories: 170,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-smoothie-de-frutas.jpg",
		ingredients: [
			"1 banana",
			"1/2 maçã",
			"1/2 xícara de morangos",
			"1/2 xícara de leite",
			"Mel a gosto"
		],
		description: "Bebida cremosa com mix de frutas frescas, leve e refrescante.",
		steps: [
			"Lave e pique as frutas.",
			"Coloque as frutas e o leite no liquidificador.",
			"Bata até ficar cremoso.",
			"Adoce com mel a gosto.",
			"Sirva gelado imediatamente."
		],
		protein: "5 g"
	},
	{
		id: "catalog-cafe-da-manha-28",
		title: "Bolo simples",
		category: "Café da manhã",
		time: 45,
		calories: 260,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-bolo-simples.jpg",
		ingredients: [
			"2 xícaras de farinha de trigo",
			"1 e 1/2 xícara de açúcar",
			"3 ovos",
			"1/2 xícara de leite",
			"1/2 xícara de óleo",
			"1 colher de fermento",
			"Baunilha a gosto"
		],
		description: "Bolo fofo e dourado de massa branca, clássico para o café da manhã.",
		steps: [
			"Bata os ovos com o açúcar e a baunilha.",
			"Acrescente o óleo e o leite e misture.",
			"Junte a farinha e mexa até ficar homogêneo.",
			"Incorpore o fermento delicadamente.",
			"Despeje em forma untada e asse a 180 °C até dourar."
		],
		protein: "5 g"
	},
	{
		id: "catalog-cafe-da-manha-30",
		title: "Pão de frigideira",
		category: "Café da manhã",
		time: 15,
		calories: 240,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-pao-de-frigideira.jpg",
		ingredients: [
			"1 xícara de farinha de trigo",
			"1 ovo",
			"1/2 xícara de leite",
			"1 colher de fermento",
			"1 colher de manteiga derretida",
			"Sal a gosto"
		],
		description: "Pão rápido de frigideira, macio e dourado, sem precisar de forno.",
		steps: [
			"Misture a farinha, o fermento e o sal.",
			"Junte o leite, o ovo e a manteiga e mexa até homogeneizar.",
			"Despeje porções em uma frigideira antiaderente levemente untada.",
			"Doure dos dois lados.",
			"Sirva quente com manteiga ou geleia."
		],
		protein: "7 g"
	},
	{
		id: "catalog-cafe-da-manha-31",
		title: "Croissant com queijo",
		category: "Café da manhã",
		time: 15,
		calories: 320,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-croissant-com-queijo.jpg",
		ingredients: [
			"1 croissant",
			"50 g de queijo mussarela",
			"1 colher de requeijão",
			"Orégano a gosto"
		],
		description: "Croissant quentinho recheado com queijo derretido, café da manhã sofisticado.",
		steps: [
			"Corte o croissant ao meio sem separar as metades.",
			"Espalhe o requeijão nas faces internas.",
			"Coloque o queijo mussarela.",
			"Leve ao forno ou air fryer até o queijo derreter e dourar.",
			"Pulverize orégano e sirva quente."
		],
		protein: "12 g"
	},
	{
		id: "catalog-cafe-da-manha-32",
		title: "Pão com manteiga",
		category: "Café da manhã",
		time: 5,
		calories: 180,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-pao-com-manteiga.jpg",
		ingredients: [
			"1 pão francês",
			"1 colher de manteiga",
			"Sal a gosto"
		],
		description: "O clássico pão francês quentinho com manteiga, simples e reconfortante.",
		steps: [
			"Corte o pão ao meio no sentido do comprimento.",
			"Aqueça uma frigideira ou chapa.",
			"Passe manteiga nas faces internas do pão.",
			"Coloque na chapa com a manteiga virada para baixo.",
			"Doure levemente e sirva quente."
		],
		protein: "5 g"
	},
	{
		id: "catalog-cafe-da-manha-33",
		title: "Pão com geleia",
		category: "Café da manhã",
		time: 5,
		calories: 200,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-pao-com-geleia.jpg",
		ingredients: [
			"2 fatias de pão de forma",
			"2 colheres de geleia",
			"1 colher de manteiga"
		],
		description: "Torrada doce com geleia, café da manhã doce e prático.",
		steps: [
			"Toste levemente as fatias de pão.",
			"Passe manteiga em cada fatia.",
			"Espalhe a geleia por cima.",
			"Corte ao meio, se desejar.",
			"Sirva imediatamente."
		],
		protein: "4 g"
	},
	{
		id: "catalog-cafe-da-manha-34",
		title: "Ovos cozidos",
		category: "Café da manhã",
		time: 15,
		calories: 140,
		difficulty: "Muito fácil",
		image: "/recipes/cafe-da-manha-ovos-cozidos.jpg",
		ingredients: [
			"2 ovos",
			"Sal e pimenta-do-reino a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Ovos cozidos firmes e práticos, prontos para o café da manhã.",
		steps: [
			"Coloque os ovos em uma panela com água fria.",
			"Leve ao fogo e, ao ferver, conte 10 minutos.",
			"Escorra e coloque em água gelada para facilitar a descasca.",
			"Descasque e corte ao meio.",
			"Tempere com sal, pimenta e cheiro-verde e sirva."
		],
		protein: "12 g"
	},
	{
		id: "catalog-cafe-da-manha-35",
		title: "Batata-doce com ovos",
		category: "Café da manhã",
		time: 25,
		calories: 280,
		difficulty: "Fácil",
		image: "/recipes/cafe-da-manha-batata-doce-com-ovos.jpg",
		ingredients: [
			"1 batata-doce",
			"2 ovos",
			"1 colher de azeite",
			"Sal e pimenta-do-reino a gosto",
			"Cheiro-verde a gosto"
		],
		description: "Café da manhã nutritivo com batata-doce assada e ovos, energético.",
		steps: [
			"Corte a batata-doce em cubos e asse a 200 °C até macia.",
			"Aqueça o azeite em uma frigideira.",
			"Faça ovos mexidos ou na chapa e tempere com sal e pimenta.",
			"Disponha a batata-doce em um prato.",
			"Sirva com os ovos por cima e finalize com cheiro-verde."
		],
		protein: "13 g"
	}
];
var normalize = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
var ingredientIdeas = [
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
	["Água de coco", "🥥"]
];
var categories = [
	{
		name: "Todas",
		icon: Utensils
	},
	{
		name: "Rápidas",
		icon: Clock3
	},
	{
		name: "Saudável",
		icon: Leaf
	},
	{
		name: "Almoço",
		icon: CookingPot
	},
	{
		name: "Sobremesas",
		icon: Sparkles
	},
	{
		name: "Café da manhã",
		icon: Flame
	}
];
function App() {
	const [page, setPage] = (0, import_react.useState)("home");
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("Todas");
	const [ingredients, setIngredients] = (0, import_react.useState)([]);
	const [ingredientInput, setIngredientInput] = (0, import_react.useState)("");
	const filteredIdeas = (0, import_react.useMemo)(() => {
		const normalizedInput = normalize(ingredientInput);
		return ingredientIdeas.filter(([item]) => normalize(item).includes(normalizedInput));
	}, [ingredientInput]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	const searchTimerRef = (0, import_react.useRef)(null);
	const [favorites, setFavorites] = (0, import_react.useState)([]);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [generated, setGenerated] = (0, import_react.useState)([]);
	const [searchMode, setSearchMode] = (0, import_react.useState)("all");
	const [appliedIngredients, setAppliedIngredients] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showFavorites, setShowFavorites] = (0, import_react.useState)(false);
	const [mobileMenu, setMobileMenu] = (0, import_react.useState)(false);
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
		requestAnimationFrame(() => {
			window.scrollTo({ top: 0 });
		});
	}
	import_react.useEffect(() => {
		const sync = () => {
			const route = window.location.hash.replace("#", "") || "home";
			if ([
				"home",
				"recipes",
				"collections",
				"season",
				"create",
				"favorites"
			].includes(route)) {
				setPage(route);
				setShowFavorites(route === "favorites");
				if (route === "season") setActiveCategory("Saudável");
			}
		};
		window.addEventListener("popstate", sync);
		sync();
		return () => window.removeEventListener("popstate", sync);
	}, []);
	(0, import_react.useEffect)(() => {
		try {
			const stored = JSON.parse(localStorage.getItem("chefia-favorites") || "[]");
			if (stored.length) setFavorites(stored);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		return () => {
			if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
		};
	}, []);
	const visibleRecipes = (0, import_react.useMemo)(() => {
		let list = showFavorites ? recipesData.filter((r) => favorites.includes(r.id)) : generated.length ? generated : recipesData;
		if (!showFavorites && !generated.length && appliedIngredients.length) list = list.filter((r) => matchesIngredients(r.ingredients, appliedIngredients, searchMode));
		if (activeCategory !== "Todas") list = list.filter((r) => r.category === activeCategory);
		if (debouncedSearch.trim()) {
			const q = debouncedSearch.toLowerCase();
			list = list.filter((r) => (r.title + " " + r.ingredients.join(" ")).toLowerCase().includes(q));
		}
		return list;
	}, [
		activeCategory,
		favorites,
		generated,
		debouncedSearch,
		showFavorites,
		appliedIngredients,
		searchMode
	]);
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
			await new Promise((resolve) => setTimeout(resolve, 900));
			setGenerated([]);
			setActiveCategory("Todas");
			navigate("recipes");
			setAppliedIngredients(dedupeIngredients(ingredients));
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
		if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
		setDebouncedSearch("");
		setActiveCategory("Todas");
		setShowFavorites(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "topbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "brand",
						href: "#home",
						onClick: (e) => {
							e.preventDefault();
							resetDiscovery();
							navigate("home");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-mark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ChefIA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "brand-subtitle",
							children: "COZINHA CRIATIVA · 2026"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: mobileMenu ? "nav-links open" : "nav-links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: page === "home" ? "nav-current" : "",
								onClick: () => {
									resetDiscovery();
									navigate("home");
								},
								children: "Início"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: page === "recipes" ? "nav-current" : "",
								onClick: () => navigate("recipes"),
								children: "Receitas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: page === "collections" ? "nav-current" : "",
								onClick: () => navigate("collections"),
								children: "Coleções"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: page === "create" ? "nav-current" : "",
								onClick: () => navigate("create"),
								children: "Criar com IA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: page === "favorites" ? "nav-current nav-favorite" : "nav-favorite",
								onClick: () => navigate("favorites"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 15 }),
									" Favoritos ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: favorites.length })
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mobile-menu",
						onClick: () => setMobileMenu(!mobileMenu),
						"aria-label": "Abrir menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "top-cta",
						onClick: () => navigate("create"),
						children: ["Criar receita ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "cta-dot" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				page === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "hero editorial-hero",
					id: "inicio",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-copy",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "eyebrow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "eyebrow-line" }), " ESCOLHAS DO CHEF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Frescor em ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "cada mordida." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "hero-subtitle",
								children: "Receitas criadas com ingredientes frescos, combinações surpreendentes e um toque de criatividade para transformar sua cozinha."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-actions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => navigate("recipes"),
									className: "button button-primary",
									children: [
										"Explorar receitas",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "round-arrow",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })
										})
									]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-art editorial-art",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hero-image-wrap",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp",
									srcSet: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=80&fm=webp 700w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1000&q=85&fm=webp 1000w, https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1400&q=85&fm=webp 1400w",
									sizes: "(max-width: 650px) 100vw, 50vw",
									alt: "Prato de macarrão com tomate e manjericão",
									fetchPriority: "high",
									decoding: "sync",
									width: 1400,
									height: 936
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "floating-note note-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "note-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verde da estação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "· 12 min" })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "floating-note note-bottom",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "note-emoji",
									children: "●"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "310 kcal · 12g proteína" }) })]
							})
						]
					})]
				}),
				page === "create" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "generator-section page-section",
					id: "gerador",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-kicker",
							children: "SEU INGREDIENTE É O COMEÇO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "generator-heading",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Vamos criar algo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "delicioso?" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Adicione o que você tem por aí. A inspiração fica por nossa conta." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ai-pill",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 15 }), " Assistente inteligente"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "generator-card",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }), " O QUE VOCÊ TEM DISPONÍVEL?"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ingredient-entry",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "entry-input",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 19 }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													id: "ingredient-input",
													value: ingredientInput,
													onChange: (e) => setIngredientInput(e.target.value),
													onKeyDown: (e) => e.key === "Enter" && addIngredient(),
													placeholder: "Pesquise um ingrediente (ex.: tomate, ovos, arroz)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: addIngredient,
													disabled: !ingredientInput.trim(),
													children: "Adicionar"
												})
											]
										}),
										ingredients.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ingredient-tags",
											children: ingredients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ingredient-tag",
												children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setIngredients(ingredients.filter((x) => x !== item)),
													"aria-label": `Remover ${item}`,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
												})]
											}, item))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ingredient-picker",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "ingredient-picker-heading",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ESCOLHA SEUS INGREDIENTES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [filteredIdeas.length, " opções · toque para adicionar"] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "ingredient-picker-grid",
												children: [filteredIdeas.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													style: {
														gridColumn: "1/-1",
														textAlign: "center",
														padding: "24px",
														opacity: .7
													},
													children: [
														"Nenhum ingrediente encontrado. Pressione Enter para adicionar \"",
														ingredientInput.trim(),
														"\"."
													]
												}), filteredIdeas.map(([item, emoji]) => {
													const added = ingredients.some((x) => canonicalName(x) === canonicalName(item));
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														className: added ? "ingredient-choice added" : "ingredient-choice",
														onClick: () => !added && setIngredients([...ingredients, item]),
														"aria-pressed": added,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "ingredient-thumb",
																style: { fontSize: "1.8rem" },
																role: "img",
																"aria-label": item,
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: emoji })
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "ingredient-choice-name",
																children: item
															}),
															added && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "ingredient-added-mark",
																children: "✓"
															})
														]
													}, item);
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "input-label",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }), " COMO COMBINAR OS INGREDIENTES?"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "category-tabs search-mode",
									role: "radiogroup",
									"aria-label": "Modo de busca",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "radio",
										"aria-checked": searchMode === "all",
										className: searchMode === "all" ? "category-tab active" : "category-tab",
										onClick: () => setSearchMode("all"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), "Todos os ingredientes"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "radio",
										"aria-checked": searchMode === "any",
										className: searchMode === "any" ? "category-tab active" : "category-tab",
										onClick: () => setSearchMode("any"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), "Pelo menos um"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "generator-bottom",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }), " Vamos encontrar combinações para você."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "button button-dark",
										onClick: generateRecipes,
										disabled: loading || !ingredients.length,
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "spinner" }), " Criando ideias..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Gerar minhas receitas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })] })
									})]
								})
							]
						})
					]
				}),
				(page === "recipes" || page === "favorites" || page === "season") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "discover-section page-section",
					id: "discover",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "discover-top",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "section-kicker",
									children: showFavorites ? "SUA COLEÇÃO" : "INSPIRAÇÃO PARA HOJE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: showFavorites ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Suas receitas ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "favoritas." })] }) : page === "season" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Sabores da ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "estação." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Um mundo de sabores ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "te espera." })] }) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: showFavorites ? "Tudo o que você guardou em um só lugar." : page === "season" ? "Ideias frescas e combinações leves para experimentar." : "Escolha uma categoria e encontre sua próxima descoberta." })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "search-box",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: search,
										onChange: (e) => {
											const val = e.target.value;
											setSearch(val);
											if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
											searchTimerRef.current = setTimeout(() => setDebouncedSearch(val), 180);
										},
										placeholder: "Buscar receita..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 17 })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "category-tabs",
							children: categories.map(({ name, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: activeCategory === name ? "category-tab active" : "category-tab",
								onClick: () => setActiveCategory(name),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), name]
							}, name))
						}),
						generated.length > 0 && !showFavorites && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "generated-banner",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 17 }),
								" Ideias encontradas a partir dos seus ingredientes.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: resetDiscovery,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), " Limpar busca"]
								})
							]
						}),
						appliedIngredients.length > 0 && !showFavorites && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "generated-banner",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 17 }),
									" ",
									searchMode === "all" ? "Receitas com todos estes ingredientes:" : "Receitas com pelo menos um destes ingredientes:",
									" ",
									visibleRecipes.length,
									" encontrada(s).",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: resetDiscovery,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 14 }), " Limpar busca"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ingredient-tags",
								children: appliedIngredients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ingredient-tag",
									children: [item, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setAppliedIngredients(appliedIngredients.filter((x) => x !== item));
											setIngredients(ingredients.filter((x) => x !== item));
										},
										"aria-label": `Remover ${item}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 13 })
									})]
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "category-tabs search-mode",
								role: "radiogroup",
								"aria-label": "Modo de busca",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "radio",
									"aria-checked": searchMode === "all",
									className: searchMode === "all" ? "category-tab active" : "category-tab",
									onClick: () => setSearchMode("all"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }), "Todos os ingredientes"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									role: "radio",
									"aria-checked": searchMode === "any",
									className: searchMode === "any" ? "category-tab active" : "category-tab",
									onClick: () => setSearchMode("any"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), "Pelo menos um"]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "recipe-grid",
							children: visibleRecipes.map((recipe) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "recipe-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "recipe-image",
										onClick: () => setSelected(recipe),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: recipe.image,
											alt: recipe.title,
											loading: "lazy",
											decoding: "async",
											width: 600,
											height: 400
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "recipe-category",
											children: recipe.category
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: favorites.includes(recipe.id) ? "save-button saved" : "save-button",
										onClick: () => toggleFavorite(recipe.id),
										"aria-label": "Salvar nos favoritos",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
											size: 17,
											fill: favorites.includes(recipe.id) ? "currentColor" : "none"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "recipe-info",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "recipe-meta",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 14 }),
													recipe.time,
													" min"
												] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { size: 14 }),
													recipe.calories,
													" kcal"
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "recipe-title",
												onClick: () => setSelected(recipe),
												children: recipe.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: recipe.description }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												className: "recipe-open",
												onClick: () => setSelected(recipe),
												children: ["Ver receita ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })]
											})
										]
									})
								]
							}, recipe.id))
						}),
						visibleRecipes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "empty-state",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "empty-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { size: 25 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: showFavorites ? "Sua coleção está esperando." : "Não encontramos receitas." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: showFavorites ? "Toque no coração de uma receita para salvá-la aqui." : appliedIngredients.length ? searchMode === "all" ? "Nenhuma receita contém todos os ingredientes selecionados. Experimente o modo “Pelo menos um” ou remova algum ingrediente." : "Nenhuma receita contém os ingredientes selecionados." : "Tente outra busca ou escolha uma categoria diferente." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button button-dark",
									onClick: resetDiscovery,
									children: appliedIngredients.length ? "Limpar filtros" : "Ver todas as receitas"
								})
							]
						})
					]
				}),
				page === "collections" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "collections-page page-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "section-kicker",
							children: "EXPLORE POR MOMENTO"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["Uma coleção para cada ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "vontade." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Escolha um caminho e descubra novas ideias para sua cozinha." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "collection-grid",
							children: [
								{
									name: "Receitas rápidas",
									desc: "Ideias práticas para o dia a dia.",
									cat: "Rápidas",
									emoji: "⏱️"
								},
								{
									name: "Comida saudável",
									desc: "Combinações leves e coloridas.",
									cat: "Saudável",
									emoji: "🥑"
								},
								{
									name: "Almoço especial",
									desc: "Pratos para reunir todo mundo.",
									cat: "Almoço",
									emoji: "🍽️"
								},
								{
									name: "Doces e sobremesas",
									desc: "Um toque doce para qualquer hora.",
									cat: "Sobremesas",
									emoji: "🍓"
								}
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "collection-card",
								onClick: () => {
									setActiveCategory(item.cat);
									setShowFavorites(false);
									setPage("recipes");
									window.history.pushState({ page: "recipes" }, "", "#recipes");
									requestAnimationFrame(() => {
										window.scrollTo({ top: 0 });
									});
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.emoji }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "COLEÇÃO CHEFIA" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.desc }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("i", { children: ["Explorar coleção ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })] })
								]
							}, item.name))
						})
					]
				}),
				page === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "closing-banner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "closing-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { size: 26 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UM CONVITE PARA CRIAR" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: ["O melhor ingrediente é a sua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "criatividade." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Abra a geladeira. O próximo prato especial pode estar a poucos passos." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate("create"),
							className: "button button-light",
							children: ["Começar agora ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "footer",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "brand footer-brand",
						href: "#",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-mark",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { size: 19 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["chef", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "brand-accent",
							children: "IA"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Feito para deixar a cozinha mais interessante. © 2026 ChefIA." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#home",
						onClick: (e) => {
							e.preventDefault();
							navigate("home");
						},
						children: "Voltar ao início ↑"
					}) })
				]
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "modal-backdrop",
				onClick: () => setSelected(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "recipe-modal",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "modal-close",
							onClick: () => setSelected(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							className: "modal-image",
							src: selected.image,
							alt: selected.title,
							decoding: "async",
							loading: "lazy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "modal-content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "section-kicker",
									children: selected.category.toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: selected.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selected.description }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "modal-stats",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
											" ",
											selected.time,
											" min"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { size: 16 }),
											" ",
											selected.calories,
											" kcal (estimativa)"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { size: 16 }),
											" ",
											selected.difficulty
										] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ingredientes" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "modal-ingredients",
									children: selected.ingredients.map((x) => {
										const have = appliedIngredients.length > 0 && appliedIngredients.some((sel) => recipeHasIngredient([x], sel));
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: appliedIngredients.length === 0 ? "" : have ? "ingredient-have" : "ingredient-missing",
											children: [appliedIngredients.length === 0 || have ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 14 }), x]
										}, x);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Modo de preparo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "steps",
									children: selected.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(i + 1).padStart(2, "0") }), step] }, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: favorites.includes(selected.id) ? "button button-outline" : "button button-dark",
									onClick: () => toggleFavorite(selected.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
										size: 16,
										fill: favorites.includes(selected.id) ? "currentColor" : "none"
									}), favorites.includes(selected.id) ? "Salvo nos favoritos" : "Salvar nos favoritos"]
								})
							]
						})
					]
				})
			})
		]
	});
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {});
}
//#endregion
export { Index as component };
