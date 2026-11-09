# Relatório de Auditoria do Catálogo de Receitas — ChefIA

## 1. Conferência dos dados

Antes da auditoria, a maior parte das receitas (todas as salgadas e de café da manhã)
era montada por **templates genéricos** dentro de `ChefIAApp.tsx`: a função
`buildCatalogRecipe()` escolhia uma lista de ingredientes e um modo de preparo a
partir de palavras-chave do título ("frango", "carne", "peixe", "macarrão"...).
Isso fazia com que pratos culinariamente distintos (ex.: Frango à parmegiana,
Frango xadrez, Fricassê de frango, Strogonoff de frango) recebessem **os mesmos
ingredientes e o mesmo preparo**, criando falsas duplicatas.

**O que foi feito:**

- Criado o arquivo `src/lib/recipes-data.ts` como **fonte única** de dados
  culinários. Cada uma das 146 receitas do catálogo final recebeu:
  - nome correto do prato;
  - descrição correspondente à receita;
  - ingredientes específicos, **com quantidades e unidades de medida**;
  - modo de preparo próprio e coerente com os ingredientes;
  - tempo de preparo, calorias estimadas e dificuldade;
  - fotografia local correspondente ao prato (todas verificadas em `public/recipes`).
- Removido o sistema de templates genéricos (`recipeCatalog`, `recipePhotos`,
  `recipeImages`, `dessertDetails`, `buildCatalogRecipe`, `expandedRecipes` e o
  array `recipes` base) de `ChefIAApp.tsx`, substituído por `import { recipesData }`.
- Sobremesas: mantidos os dados culinários próprios já revisados anteriormente,
  agora consolidados no mesmo arquivo de dados.

O design, as cores, as fontes, o layout, as animações, a responsividade e as
fotografias **não foram alterados** — apenas os dados das receitas e a forma como
são carregados.

## 2. Identificação de receitas duplicadas

**Duplicatas exatas** (mesmo prato cadastrado em mais de uma categoria, com o
mesmo nome) — 23 entradas removidas, mantida a versão em uma só categoria:

| Receita | Categorias onde aparecia | Mantida em |
|---|---|---|
| Ovo mexido cremoso | Rápidas / Café da manhã | Café da manhã |
| Misto-quente | Rápidas / Café da manhã | Café da manhã |
| Crepioca | Rápidas / Café da manhã | (removida — ver §4) |
| Pão com ovo | Rápidas / Café da manhã | Café da manhã |
| Sanduíche natural | Rápidas / Café da manhã | Café da manhã |
| Frango grelhado | Rápidas / Almoço | Almoço |
| Bife acebolado | Rápidas / Almoço | Almoço |
| Cuscuz com manteiga | Rápidas / Café da manhã | Café da manhã |
| Panqueca de banana | Rápidas / Saudável / Café da manhã | Café da manhã |
| Bolo de caneca | Rápidas / Café da manhã | (removida — ver §4) |
| Mousse de limão | Rápidas / Sobremesas | Sobremesas |
| Mousse de maracujá | Rápidas / Sobremesas | Sobremesas |
| Vitamina de banana | Rápidas / Café da manhã | Café da manhã |
| Pão de frigideira | Rápidas / Café da manhã | Café da manhã |
| Salada de atum | Rápidas / Saudável | Saudável |
| Peixe assado | Saudável / Almoço | Almoço |
| Tilápia grelhada | Saudável / Almoço | Almoço |
| Omelete de legumes | Saudável / Café da manhã | Café da manhã |
| Overnight oats | Saudável / Café da manhã | Café da manhã |
| Vitamina de morango | Saudável / Café da manhã | Café da manhã |
| Salada de frutas | Café da manhã / Sobremesas | Sobremesas |
| Brownie de chocolate (base) | base / Sobremesas (Brownie) | Sobremesas |
| Panquecas fofinhas (base) | base / Café da manhã | (ver §3) |

**Duplicatas semelhantes** (nomes diferentes, mas mesmo prato) — 6 removidas:

| Receita removida | Equivalente preservada | Motivo |
|---|---|---|
| Tapioca de queijo (Rápidas) | Tapioca com queijo (Café) | mesmo prato, grafia diferente |
| Milk-shake (Rápidas) | Milk-shake de chocolate (Sobremesas) | mesmo prato, versão genérica |
| Ovos cozidos temperados (Rápidas) | Ovos cozidos (Café) | ovos cozidos, um com temperos |
| Smoothie de banana (Saudável) | Vitamina de banana (Café) | no Brasil, vitamina = smoothie |
| Mini churros (Sobremesas) | Churros (Sobremesas) | mesma massa e preparo, só tamanho |
| Panquecas fofinhas (base) | Panqueca americana / de banana (Café) | mesma panqueca |

## 3. Correção das receitas

Cada uma das 146 receitas do catálogo final passou a ter ingredientes específicos
com quantidades coerentes e modo de preparo próprio. Nenhuma receita depende mais
de um template genérico.

## 4. Tratamento das duplicatas

- Todas as duplicatas foram identificadas e comparadas.
- A versão mais completa/correta foi preservada; as confirmadas foram removidas.
- Receitas com **diferenças culinárias relevantes** foram preservadas, mesmo
  compartilhando ingredientes base (ver §6).
- As referências internas (IDs das receitas) foram mantidas estáveis para as
  receitas preservadas, evitando quebrar favoritos já salvos. Receitas removidas
  simplesmente deixam de aparecer nos favoritos (comportamento esperado).
- A busca por texto e por categoria continua funcionando normalmente.

**Removidas também por ausência de fotografia correspondente** (6), para garantir
que toda foto exibida corresponda ao prato:

- Crepioca de frango (Saudável)
- Bombom de travessa (Sobremesas)
- Manjar de coco (Sobremesas)
- Tapioca com frango (Café da manhã)
- Crepioca (Café da manhã)
- Bolo de caneca (Café da manhã)

## 5. Verificação da busca por ingredientes

Os dois modos foram testados contra o catálogo real (`recipesData`):

- **Todos os ingredientes**: retorna apenas receitas que possuem de fato todos os
  ingredientes selecionados (verificado campo a campo).
- **Pelo menos um**: retorna receitas com ao menos um dos ingredientes, e nenhuma
  receita aparece indevidamente (ex.: Brigadeiro não aparece na busca por "Frango";
  a busca por "Maracujá" encontra a Mousse de maracujá e só receitas com maracujá).

A lógica de comparação (`src/lib/ingredient-match.ts`) foi preservada: cada linha
de ingrediente é reduzida ao nome do ingrediente (quantidades e unidades são
ignoradas) e comparada por igualdade, de modo que "tomate" não casa com
"molho de tomate".

## 6. Receitas preservadas por serem diferentes

Foram mantidas receitas que compartilham ingredientes base mas têm diferença
culinária relevante (pratos distintos):

- **Pão de queijo** (assado) e **Pão de queijo de frigideira** (método diferente).
- **Macarrão alho e óleo**, **Macarrão com requeijão**, **Macarrão com tomate**,
  **Macarrão alho e parmesão** e **Macarronada** (molhos/preparos distintos).
- **Carne moída refogada**, **Carne moída com batata** e **Purê com carne moída**
  (preparos distintos).
- **Escondidinho de carne** e **Escondidinho de frango** (proteína diferente).
- **Risoto de frango** e **Risoto de camarão**; **Yakisoba de carne** e
  **Yakisoba de frango**; **Lasanha à bolonhesa** e **Lasanha de frango**;
  **Strogonoff de frango** e **Strogonoff de carne**.
- **Bolo de cenoura, Bolo de chocolate, Bolo de fubá, Bolo de milho, Bolo
  simples** (receitas de bolo distintas).
- **Mousse de maracujá, Mousse de limão, Mousse de chocolate**; **Torta de limão**
  e **Torta de morango**; **Pavê de chocolate** e **Pavê de limão**; **Pudim de
  leite condensado** e **Pudim de caneca**; **Brownie** e **Brownie de caneca**.
- **Omelete simples, Omelete de queijo, Omelete de legumes, Omelete de espinafre**.
- **Cuscuz com manteiga, Cuscuz com ovo, Cuscuz com queijo**.
- **Vitamina de banana, Vitamina de morango, Vitamina de abacate**.
- **Tapioca com queijo** e **Tapioca com queijo branco** (queijos diferentes).
- **Brigadeiro** (enrolado), **Brigadeiro de panela** (de colher) e **Palha
  italiana** (com biscoito) — doces diferentes.
- **Frango grelhado** e **Frango grelhado com legumes**; **Batata na air fryer**,
  **Batata sauté** e **Batata-doce assada**.

## 7. Receitas que ainda precisam de informações ou confirmação

As 6 receitas removidas por falta de fotografia podem ser reincluídas assim que
houver uma foto correspondente ao prato:

- Crepioca de frango
- Bombom de travessa
- Manjar de coco
- Tapioca com frango
- Crepioca
- Bolo de caneca

(Seus dados culinários podem ser preparados; a única pendência é a fotografia.)

## 8. Resultado dos testes

- `npm run build`: **aprovado** (compilação completa, incluindo o novo
  `src/lib/recipes-data.ts`).
- `npm test` (Vitest): **8/8 aprovados** (busca por ingredientes, modos todos/
  pelo-menos-um, normalização, roteamento).
- Auditoria extra (validação de integridade dos dados e dos dois modos de busca
  contra o catálogo real): **9/9 aprovados** — cada receita tem campos
  obrigatórios preenchidos, não há IDs nem títulos duplicados, não há conteúdo
  totalmente idêntico, e os resultados da busca correspondem aos ingredientes
  reais de cada receita.

## 9. Resumo numérico

| Indicador | Valor |
|---|---|
| Receitas analisadas | 181 (175 do catálogo + 6 base) |
| Receitas com dados próprios no catálogo final | 146 |
| Receitas corrigidas/reescritas com dados específicos | 146 |
| Duplicatas exatas encontradas (entradas removidas) | 23 |
| Duplicatas semelhantes encontradas | 6 |
| Removidas por falta de fotografia | 6 |
| Total de receitas removidas | 35 |
| Receitas no catálogo final | 146 |

Distribuição final por categoria: Almoço 36 · Café da manhã 31 · Saudável 29 ·
Sobremesas 32 · Rápidas 18.

## 10. Arquivos alterados

- `src/lib/recipes-data.ts` (novo) — catálogo completo com dados próprios.
- `src/components/ChefIAApp.tsx` — passou a importar `recipesData` e deixou de
  usar os templates genéricos.
- `RELATORIO-AUDITORIA.md` (novo) — este relatório.

Nenhum arquivo de estilo, layout, fonte, animação ou configuração foi alterado.
