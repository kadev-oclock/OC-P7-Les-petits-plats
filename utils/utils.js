/* eslint-disable import/extensions */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-mutable-exports */
import { cardTemplate } from "../js/card.js";

export let tags = [];
// eslint-disable-next-line import/prefer-default-export

export function createTag(input, recipes) {
  // eslint-disable-next-line no-unused-vars
  const value = input.srcElement.innerHTML;
  const indexTag = tags.findIndex(
    (tag) =>
      tag.type === input.srcElement.id.split("-")[2] && tag.value === value
  );
  if (indexTag === -1) {
    tags.push({ type: input.srcElement.id.split("-")[2], value });
    const receipeFiltred = searchTwoStep(recipes);
    displayData(receipeFiltred);
    afficheTag(recipes);
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
      icone.addEventListener("click", () => {
        const indexTag = tags.findIndex(
          (tag) =>
            tag.type === tagElement.id.split("-")[1] &&
            tag.value === tagElement.id.split("-")[2]
        );
        console.log(tag);
        if (indexTag !== -1) {
          tags.splice(indexTag, 1);
          const receipeFiltred = searchTwoStep(recipes);
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

export function searchTwoStep(recipes) {
  let recipeFilterInput;
  let recipeFilterTags;
  const filtreInput = document.getElementById("input_search");
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

function filterByTag(recipes, tag) {
  // Créez une copie du tableau de recettes pour éviter de modifier l'original
  let filtered = [...recipes];

  // Utilisez la méthode filter() pour filtrer les recettes
  filtered = filtered.filter(
    (recipe) =>
      // Vérifiez si le tag est présent dans les ingrédients, les ustensiles ou l'appareil
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(tag.value)
      ) ||
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(tag.value)
      ) ||
      recipe.appliance.toLowerCase().includes(tag.value)
  );

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
