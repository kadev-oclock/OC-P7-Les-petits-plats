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
import { createTag, tags } from "../utils/utils.js";
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

  // eslint-disable-next-line import/prefer-default-export
  function displayData(recipes) {
    const cardSection = document.getElementById("card__section");
    recipes.forEach((recipe) => {
      // eslint-disable-next-line no-undef
      const cardModel = cardTemplate(recipe);
      const createCard = cardModel.getCreateCard();
      cardSection.appendChild(createCard);
    });
  }
  function init() {
    // Récupère les datas

    setFilterData(recipes);
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
    .addEventListener("input", (event) => {
      const listIngredients = document.querySelector("#list-ingredients");
      // vide de ligne list
      listIngredients.innerHTML = " ";
      const ingredients = filtervalues(
        event.target.value,
        getAllingredients(recipes)
      );
      ingredients.forEach((ingredient) => {
        const a = document.createElement("a");
        a.className = "dropdown-item item-ingredients";
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event));
        listIngredients.appendChild(a);
      });
    });
  document
    .querySelector("#input-ustensils")
    .addEventListener("input", (event) => {
      const listIngredients = document.querySelector("#list-ustensils");
      // vide de ligne list
      listIngredients.innerHTML = " ";
      const ingredients = filtervalues(
        event.target.value,
        getAllUstensils(recipes)
      );
      ingredients.forEach((ingredient) => {
        const a = document.createElement("a");
        a.className = "dropdown-item item-ustensils";
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event));
        listIngredients.appendChild(a);
      });
    });
  document
    .querySelector("#input-appliance")
    .addEventListener("input", (event) => {
      const listIngredients = document.querySelector("#list-appliance");
      // vide de ligne list
      listIngredients.innerHTML = " ";
      const ingredients = filtervalues(
        event.target.value,
        getAllAppliance(recipes)
      );
      ingredients.forEach((ingredient) => {
        const a = document.createElement("a");
        a.className = "dropdown-item item-appliance";
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event));
        listIngredients.appendChild(a);
      });
    });

  // const elements = document.querySelectorAll('[id^="tag-list"]');
  // elements.forEach((element) => {
  //   element.addEventListener("click", (e) => createTag(e));
  // });

  // .addEventListener("click", (e) => createTag(e));
})();
