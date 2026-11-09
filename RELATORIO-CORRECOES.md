# Relatório de correções do ChefIA

## Alterações realizadas

- Corrigidos os dados da receita **Mousse de maracujá** (incluindo as duas entradas do catálogo, em Rápidas e Sobremesas): ingredientes de mousse, preparo no liquidificador e tempo de geladeira, sem cebola, alho ou frigideira.
- Criadas fichas próprias de ingredientes e preparo para as 35 sobremesas do catálogo, em vez de reaproveitar uma lista genérica de bolo para sobremesas diferentes.
- Removido o texto de descrição genérico que afirmava que toda receita tinha um preparo igualmente genérico.
- Melhorada a extração de ingredientes da busca para reconhecer ingredientes em expressões como “suco concentrado de maracujá”, “polpa de maracujá” e “raspas de limão”.
- Acrescentado teste automatizado para a busca por maracujá na mousse.

## Verificações executadas

- Verificação de sintaxe TypeScript/TSX nos arquivos alterados: aprovada.
- Testes isolados da lógica de ingredientes: aprovados para maracujá, leite condensado, creme de leite, exclusão de cebola, distinção entre tomate e molho de tomate e normalização de limão.

## Limitação importante

O catálogo também contém receitas salgadas e de café da manhã que ainda usam regras de montagem por categoria ou palavras do título. Essas fichas precisam de revisão culinária individual adicional para garantir precisão total em todas as receitas. Não afirmo que as 180 receitas estejam integralmente revisadas.

O teste completo de build/Vitest não foi executado porque as dependências do projeto não estavam instaladas e a tentativa de instalação excedeu o tempo disponível. O ZIP mantém os arquivos de dependências originais para instalação no computador do usuário.
