/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-shadow */
/* eslint-disable import/extensions */
// traitement recherche / affichage des cards
// eslint-disable-next-line import/extensions, import/no-unresolved
import { getRecipes } from "./fetchRecipe.js";
import { cardTemplate } from "./card.js";
import {
  createTag,
  tags,
  searchTwoStep,
  displayData,
  majFiltreIngredient,
  majFiltreUstensils,
  majFiltreAppareils,
} from "../utils/utils.js";
import {
  initInputFilter,
  filtervalues,
  getAllingredients,
  getAllUstensils,
  getAllAppliance,
} from "./inputFilter.js";

import { setFilterData } from "./filters.js";
// module pour géré les await dans le code principale
(async () => {
  // fonction asynchrone qui encapsule le code
  const { recipes } = await getRecipes();
  let recipeFiltred = [];
  async function init() {
    // Récupère les datas
    const filtreInput = document.getElementById("input_search");
    filtreInput.addEventListener("keyup", async () => {
      recipeFiltred = await searchTwoStep(recipes);
      displayData(recipeFiltred);
    });
    // setFilterData(recipes);
    displayData(recipes);
    const filters = ["ingredients", "ustensils", "appliance"];
    filters.forEach((filter) => initInputFilter(filter, recipes));
  }

  init();

  function deleteTag(tag) {
    // recupère le tag (html)
    const tagElement = document.querySelector(`#tag-${tag}`);
    if (![null, undefined].includes(tagElement)) {
      // supprime tag html
      tagElement.remove();
      // suprression tag s-dans le tableau
      tags.filter((existedTag) => existedTag !== tag);
    }
  }

  document
    .querySelector("#input-ingredients")
    .addEventListener("input", majFiltreIngredient(recipeFiltred));
  document
    .querySelector("#input-ustensils")
    .addEventListener("input", majFiltreUstensils(recipeFiltred));
  document
    .querySelector("#input-appliance")
    .addEventListener("input", majFiltreAppareils(recipeFiltred));
})();
