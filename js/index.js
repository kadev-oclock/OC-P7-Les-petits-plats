// traitement recherche / affichage des cards
// eslint-disable-next-line import/extensions, import/no-unresolved
import { getRecipes } from "./fetchRecipe.js";

async function init() {
  const data = await getRecipes();
  console.log("data:", data);
}
init();
