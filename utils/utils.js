/* eslint-disable func-names */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/no-unresolved */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-mutable-exports */
import { getRecipes } from "../js/fetchRecipe.js";
import { cardTemplate } from "../js/card.js";
// eslint-disable-next-line import/no-cycle
import {
  filtervalues,
  getAllingredients,
  getAllUstensils,
  getAllAppliance,
} from "../js/inputFilter.js";

export let tags = [];
// eslint-disable-next-line import/prefer-default-export

export async function createTag(input, recipes) {
  // eslint-disable-next-line no-unused-vars
  const value = input.srcElement.innerHTML;
  const tagType = input.srcElement.id.split("-")[2];
  const indexTag = tags.findIndex(
    (tag) => tag.type === tagType && tag.value === value
  );
  if (indexTag === -1) {
    tags.push({ type: tagType, value });
    const receipeFiltred = await searchTwoStep(recipes);
    displayData(receipeFiltred);
    afficheTag(recipes);
    // console.log(recipes);
  }
}

function afficheTag(recipes) {
  // parcours le tableau et création des tags
  const divTag = document.querySelector("#div-tag");
  divTag.innerHTML = " ";
  if (tags.length > 0) {
    tags.forEach((tag) => {
      const icone = document.createElement("i");
      const tagElement = document.createElement("span");
      tagElement.classList.add("badge");
      tagElement.classList.add("text-dark");
      tagElement.classList.add("mx-2");
      if (tag.type === "ingredients") {
        tagElement.classList.add("bg-warning");
      } else if (tag.type === "ustensils") {
        tagElement.classList.add("bg-info");
      } else {
        tagElement.classList.add("bg-light");
      }
      icone.className = "bi bi-x";
      // ajout id avec nom du tag
      tagElement.id = `tag-${tag.type}-${tag.value}`;
      tagElement.style.fontSize = "1em";
      icone.addEventListener("click", async () => {
        const indexTag = tags.findIndex(
          (tag) =>
            tag.type === tagElement.id.split("-")[1] &&
            tag.value === tagElement.id.split("-")[2]
        );
        if (indexTag !== -1) {
          tags.splice(indexTag, 1);
          const receipeFiltred = await searchTwoStep(recipes);
          displayData(receipeFiltred);
          afficheTag(recipes);
        }
      });
      tagElement.innerHTML = tag.value;
      tagElement.appendChild(icone);
      divTag.appendChild(tagElement);
    });
  }
}

export async function searchTwoStep() {
  let recipeFilterInput;
  let recipeFilterTags;
  const filtreInput = document.getElementById("input_search");
  const { recipes } = await getRecipes();
  // phase 1 algo
  if (filtreInput.value.length >= 3) {
    recipeFilterInput = filterByInput(recipes);
  } else {
    recipeFilterInput = [...recipes];
  }
  // phase 2 algo
  recipeFilterTags = [...recipeFilterInput];

  for (let i = 0; i < tags.length; i += 1) {
    recipeFilterTags = filterByTag(recipeFilterTags, tags[i]);
  }
  document
    .querySelector("#input-ingredients")
    .addEventListener("input", majFiltreIngredient(recipeFilterTags));
  document
    .querySelector("#input-ustensils")
    .addEventListener("input", majFiltreUstensils(recipeFilterTags));
  document
    .querySelector("#input-appliance")
    .addEventListener("input", majFiltreAppareils(recipeFilterTags));
  const e = { target: { value: "" } };
  majFiltreIngredient(recipeFilterTags)(e);
  majFiltreAppareils(recipeFilterTags)(e);
  majFiltreUstensils(recipeFilterTags)(e);
  return recipeFilterTags;
}
// filtre dans la saisie
function filterByInput(recipes) {
  let filtred = [...recipes];
  const filtreInput = document.getElementById("input_search");
  // code pour filtrer
  filtred = filtred.filter(
    (recipe) =>
      // i = insensible à la casse
      recipe.name.match(new RegExp(filtreInput.value, "i")) ||
      recipe.description.match(new RegExp(filtreInput.value, "i"))
  );

  return filtred;
}

/**
 * The function `filterByTag` filters an array of recipes based on a given tag.
 * @param recipes - An array of recipe objects. Each recipe object has the following properties:
 * @param tag - The `tag` parameter is an object that represents the tag to filter the recipes by. It
 * has two properties:
 * @returns a filtered array of recipes that match the specified tag.
 */
function filterByTag(recipes, tag) {
  // Créez une copie du tableau de recettes pour éviter de modifier l'original
  let filtered = [...recipes];

  // Utilisez la méthode filter() pour filtrer les recettes

  filtered = filtered.filter((recipe) => {
    // Vérifiez si le tag est présent dans les ingrédients, les ustensiles ou l'appareil
    if (tag.type === "ingredients") {
      return recipe.ingredients.some(
        (ingredient) =>
          ingredient.ingredient.toLowerCase() === tag.value.toLowerCase()
      );
    }
    if (tag.type === "ustensils") {
      return recipe.ustensils.some(
        (ustensil) => ustensil.toLowerCase() === tag.value.toLowerCase()
      );
    }
    if (tag.type === "appliance") {
      return recipe.appliance.toLowerCase() === tag.value.toLowerCase();
    }
  });

  return filtered;
}
// eslint-disable-next-line import/prefer-default-export
export function displayData(recipes) {
  const cardSection = document.getElementById("card__section");
  cardSection.innerHTML = "";
  recipes.forEach((recipe) => {
    // eslint-disable-next-line no-undef
    const cardModel = cardTemplate(recipe);
    const createCard = cardModel.getCreateCard();
    cardSection.appendChild(createCard);
  });
}
export function majFiltreIngredient(recipeFiltred) {
  return function (event) {
    const listIngredients = document.querySelector("#list-ingredients");
    // vide de ligne list
    listIngredients.innerHTML = " ";
    const ingredients = filtervalues(
      event.target.value,
      getAllingredients(recipeFiltred)
    );
    ingredients.forEach((ingredient, index) => {
      if (
        !tags.some(
          (tag) => tag.type === "ingredients" && tag.value === ingredient
        )
      ) {
        // console.log(ingredient);
        const a = document.createElement("a");
        a.className = "dropdown-item item-ingredients";
        a.setAttribute("id", `tag-list-ingredients-${index}`);
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event, recipeFiltred));
        listIngredients.appendChild(a);
      }
    });
  };
}

export function majFiltreUstensils(recipeFiltred) {
  return function (event) {
    const listIngredients = document.querySelector("#list-ustensils");
    // vide de ligne list
    listIngredients.innerHTML = " ";
    const ingredients = filtervalues(
      event.target.value,
      getAllUstensils(recipeFiltred)
    );
    ingredients.forEach((ingredient, index) => {
      if (
        !tags.some(
          (tag) => tag.type === "ustensils" && tag.value === ingredient
        )
      ) {
        const a = document.createElement("a");
        a.className = "dropdown-item item-ustensils";
        a.setAttribute("id", `tag-list-ustensils-${index}`);
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event, recipeFiltred));
        listIngredients.appendChild(a);
      }
    });
  };
}

export function majFiltreAppareils(recipeFiltred) {
  return function (event) {
    const listIngredients = document.querySelector("#list-appliance");
    // vide de ligne list
    listIngredients.innerHTML = " ";
    const ingredients = filtervalues(
      event.target.value,
      getAllAppliance(recipeFiltred)
    );
    ingredients.forEach((ingredient, index) => {
      if (
        !tags.some(
          (tag) => tag.type === "appliance" && tag.value === ingredient
        )
      ) {
        const a = document.createElement("a");
        a.className = "dropdown-item item-appliance";
        a.setAttribute("id", `tag-list-appliance-${index}`);
        a.innerHTML = ingredient;
        a.addEventListener("click", (event) => createTag(event, recipeFiltred));
        listIngredients.appendChild(a);
      }
    });
  };
}
