# Relatório – Busca por ingredientes (ChefIA)

## Problema encontrado
- A busca local usava só as 6 receitas-base e comparava com "contém" nos dois sentidos (ex.: "tomate" casava com "molho de tomate").
- Quando nada combinava, o site mostrava 3 receitas quaisquer (`recipes.slice(0, 3)`) — por isso apareciam receitas sem os ingredientes.

## O que foi corrigido
- Novo arquivo `src/lib/ingredient-match.ts`: cada linha de ingrediente ("300 g de peito de frango") é reduzida ao nome do ingrediente (remove quantidade, unidades, "a gosto", divide "sal e pimenta") e comparada por igualdade, ignorando maiúsculas, acentos, espaços extras e plural. Variações equivalentes (ex.: frango ↔ peito de frango, farinha ↔ farinha de trigo) estão numa lista explícita.
- Ingredientes duplicados são ignorados ("Limão", "limao", " LIMÃO").
- Busca agora cobre o catálogo completo (181 receitas), sem receitas "de preenchimento".
- Dois modos: **Todos os ingredientes** e **Pelo menos um**, na tela "Criar com IA" e na tela de resultados; trocar o modo ou remover um ingrediente atualiza na hora.
- Sem resultados: mensagem explicativa e botão "Limpar filtros".
- Design, fotos, catálogo, favoritos e demais funções preservados (apenas `ChefIAApp.tsx` editado e 1 linha de CSS adicionada).

## Testes executados (todos aprovados)
- Testes automáticos (`bunx vitest run`): modo TODOS, modo PELO MENOS UM, "tomate" ≠ "molho de tomate", acentos/maiúsculas/plural, duplicados.
- No navegador: frango + ALHO + " cebola " → TODOS 21 receitas (todas com os três), PELO MENOS UM 117; alternância sem recarregar; remover ingrediente atualiza; limpar todos volta às 181.
- frango + queijo + tomate em TODOS → 0 (nenhuma receita do catálogo tem os três) com mensagem informativa; "Frângo" duplicado foi ignorado.
- Lagosta + Chocolate → mensagem e "Limpar filtros" funcionando.
- 0 imagens quebradas, 0 erros no console, compilação OK.

## Como executar
`bun install` (ou `npm install`) e depois `bun run dev`.
