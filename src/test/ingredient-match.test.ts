import { describe, it, expect } from "vitest";
import { matchesIngredients, extractIngredientNames, dedupeIngredients } from "@/lib/ingredient-match";

const frangoQueijoTomate = ["300 g de peito de frango", "2 colheres de queijo", "1 tomate"];
const soFrango = ["300 g de peito de frango", "1 dente de alho"];
const molho = ["1 xícara de molho de tomate", "Queijo e temperos a gosto"];

describe("busca por ingredientes", () => {
  it("modo TODOS exige todos os ingredientes", () => {
    expect(matchesIngredients(frangoQueijoTomate, ["Frango", "Queijo", "Tomate"], "all")).toBe(true);
    expect(matchesIngredients(soFrango, ["Frango", "Queijo", "Tomate"], "all")).toBe(false);
  });
  it("modo PELO MENOS UM aceita qualquer um", () => {
    expect(matchesIngredients(soFrango, ["Frango", "Queijo", "Tomate"], "any")).toBe(true);
    expect(matchesIngredients(["2 ovos"], ["Frango", "Queijo", "Tomate"], "any")).toBe(false);
  });
  it("tomate não corresponde a molho de tomate", () => {
    expect(matchesIngredients(molho, ["Tomate"], "any")).toBe(false);
  });
  it("maracujá corresponde ao suco e à polpa usados na mousse", () => {
    const mousse = ["1 lata de leite condensado", "1 caixa de creme de leite", "200 ml de suco concentrado de maracujá", "Polpa de 1 maracujá para decorar"];
    expect(matchesIngredients(mousse, ["Maracujá"], "all")).toBe(true);
  });
  it("ignora acentos, maiúsculas, espaços e plural", () => {
    expect(matchesIngredients(["Suco de 2 limões"], ["  LIMAO "], "all")).toBe(true);
    expect(matchesIngredients(["2 ovos"], ["Ovo"], "all")).toBe(true);
  });
  it("extrai nomes de linhas compostas", () => {
    expect(extractIngredientNames("Sal e pimenta a gosto")).toEqual(["sal", "pimenta"]);
  });
  it("remove duplicados", () => {
    expect(dedupeIngredients(["Limão", "limao", " LIMÃO"])).toEqual(["Limão"]);
  });
});
