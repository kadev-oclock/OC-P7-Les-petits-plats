/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/extensions
import { createTag } from "../utils/utils.js";

export const handleClose = (input) => {
  // 1. aller chercher l'input correspondant
  // 2. définir la valeur de l'input = ''
  // 3. détruire (removeChild) la div jaune et le bouton "X"
  // 4. actualiser la liste des recettes
};

export const clickHandler = (listIngredient) => {
  // 1.définir la valeur de l'input = listIngredient
  // 2. créer une div jaune contenant le mot listIngredient
  // 3. append la div jaune sous le sélecteur
  // 4. créer un bouton "X" pour déselectionner
  // 5. poser un écouteur sur le bouton "X" => handleClose
};

export const filtervalues = (input, values) => {
  const filteredIngredients = values.filter((value) =>
    value.match(new RegExp(input))
  );
  return filteredIngredients;
};

// cree les buttons
function createButton(inputName) {
  // boutton de recherche
  const button = document.createElement("button");
  button.setAttribute("data-bs-toggle", "dropdown");
  Object.assign(button, {
    className: "btn btn-secondary custom__btn dropdown-toggle",
    type: "button",
    id: `${inputName}`,
    ariaExpanded: "false",
    value: `${inputName}`,
  });
  button.innerHTML = `${inputName}`;

  return button;
}

export function getAllingredients(recipes) {
  const ingredients = {};
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      ingredients[ingredient.ingredient.toLowerCase()] = ingredient.ingredient;
    });
  });
  return Object.keys(ingredients).sort((a, b) => a.localeCompare(b));
}

export function getAllUstensils(recipes) {
  const ustensils = {};
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      ustensils[ustensil.toLowerCase()] = ustensil;
    });
  });
  return Object.keys(ustensils).sort((a, b) => a.localeCompare(b));
}

export function getAllAppliance(recipes) {
  const appliances = {};
  recipes.forEach((recipe) => {
    appliances[recipe.appliance.toLowerCase()] = recipe.appliance;
  });
  return Object.keys(appliances).sort((a, b) => a.localeCompare(b));
}

function createInput(inputName) {
  const input = document.createElement("input");
  input.className = "search form-control";
  input.setAttribute("type", "text");
  input.setAttribute("name", "search");
  input.setAttribute("placeholder", "Search..");
  input.setAttribute("id", `input-${inputName}`);
  input.setAttribute("data-type", `${inputName}`);

  return input;
}

function createDropdownMenu(inputName) {
  const divDropdownMenu = document.createElement("div");
  divDropdownMenu.className = "dropdown-menu";
  divDropdownMenu.setAttribute("aria-labelledby", `dropdown-${inputName}`);
  divDropdownMenu.setAttribute("data-type", `${inputName}`);

  return divDropdownMenu;
}

// eslint-disable-line import/prefer-default-export
// eslint-disable-next-line import/prefer-default-export
export function initInputFilter(inputName, recipes) {
  // div contenant les filtres.
  const divDropdownContain = document.querySelector("#dropdown__contain");
  // div contenant le boutton de recherche et les data

  const divDropdown = document.createElement("div");
  divDropdown.className = "dropdown";
  divDropdownContain.setAttribute("data-type", `${inputName}`);

  // boutton de recherche
  const button = createButton(inputName);

  // menu dropdown

  const divDropdownMenu = createDropdownMenu(inputName);
  // menu item dropdown
  const divDropdownItem = document.createElement("div");
  divDropdownItem.className = "dropdown-item p-2";
  const divInputGroup = document.createElement("div");
  divInputGroup.className = "input-group p-0";

  // menu input

  const input = createInput(inputName);

  // span icon

  const spanIcon = document.createElement("span");
  spanIcon.className = "icon";
  const icon = document.createElement("i");
  icon.className = "fas fa-search";
  icon.setAttribute("id", `icon-search-${inputName}`);

  // ajout des items
  let items = [];
  let numeroIdelement = 0;
  if (inputName === "ingredients") {
    // parcourirs les ingrédients et retourner le nom de l'ingrédient
    items = getAllingredients(recipes);
  }
  if (inputName === "appliance") {
    // return l'appareil
    items = getAllAppliance(recipes);
  }
  if (inputName === "ustensils") {
    // parcourirs les ustensils et retourner l'ustensil
    items = getAllUstensils(recipes);
  }

  // faire function event

  // ajout data item dans le menu

  divInputGroup.appendChild(input);
  divDropdownItem.appendChild(divInputGroup);

  spanIcon.appendChild(icon);
  divDropdownItem.appendChild(spanIcon);

  divDropdownMenu.appendChild(divDropdownItem);
  const divItems = document.createElement("div");
  divItems.className = "div_items";
  divItems.setAttribute("id", `list-${inputName}`);

  // tri des items en fonction de l'input de recherche du filtre
  // récuprère la chaine de caractère de l'input
  // boucle for sur les items
  // dans la boucle for comparer item avecla valeur de l'input

  items.forEach((item) => {
    const a = document.createElement("a");
    a.setAttribute("id", `tag-list-${inputName}-${numeroIdelement}`);
    a.className = `dropdown-item item-${inputName}`;
    a.innerHTML = item;
    a.addEventListener("click", (event) => createTag(event));
    divItems.appendChild(a);
    numeroIdelement += 1;
  });
  // Initialisation de la recherche

  divDropdownMenu.appendChild(divItems);
  divDropdown.appendChild(button);
  divDropdown.appendChild(divDropdownMenu);
  divDropdownContain.appendChild(divDropdown);
}
