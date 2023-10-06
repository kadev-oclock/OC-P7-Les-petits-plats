/* eslint-disable import/extensions */
// traitement recherche / affichage des cards
// eslint-disable-next-line import/extensions, import/no-unresolved
import { getRecipes } from "./fetchRecipe.js";
import { cardTemplate } from "./card.js";
import { initInputFilter } from "./inputFilter.js";

// eslint-disable-next-line import/prefer-default-export
async function displayData(recipes) {
  const cardSection = document.getElementById("card__section");
  recipes.forEach((recipe) => {
    // eslint-disable-next-line no-undef
    const cardModel = cardTemplate(recipe);
    const createCard = cardModel.getCreateCard();
    cardSection.appendChild(createCard);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { recipes } = await getRecipes();
  displayData(recipes);
  const filters = ["ingredients", "ustensils", "appliance"];
  filters.forEach((filter) => initInputFilter(filter, recipes));
}

init();
