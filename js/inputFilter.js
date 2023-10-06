// eslint-disable-next-line import/prefer-default-export
export function initInputFilter(inputName, recipes) {
  // div contenant les filtres.
  const divDropdownContain = document.querySelector("#dropdown__contain");
  // div contenant le boutton de recherche et les data

  const divDropdown = document.createElement("div");
  divDropdown.className = "dropdown";

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

  // menu dropdown

  const divDropdownMenu = document.createElement("div");
  divDropdownMenu.className = "dropdown-menu";
  divDropdownMenu.setAttribute("aria-labelledby", `${inputName}`);
  // menu item dropdown
  const divDropdownItem = document.createElement("div");
  divDropdownItem.className = "dropdown-item p-2";
  const divInputGroup = document.createElement("div");
  divInputGroup.className = "input-group p-0";

  // menu input

  const input = document.createElement("input");
  input.className = "search form-control";
  input.setAttribute("type", "text");
  input.setAttribute("name", "search");
  input.setAttribute("placeholder", "Search..");

  // span icon

  const spanIcon = document.createElement("span");
  spanIcon.className = "icon";
  const icon = document.createElement("i");
  icon.className = "fas fa-search";

  // ajout des items
  const items = [];
  recipes.forEach((recipe) => {
    if (inputName === "ingredients") {
      // parcourirs les ingrédients et retourner le nom de l'ingrédient
      recipe.ingredients.forEach((ingredient) =>
        items.push(ingredient.ingredient)
      );
    }
    if (inputName === "appliance") {
      // return l'appareil
      items.push(recipe.appliance);
    }
    if (inputName === "ustensils") {
      // parcourirs les ustensils et retourner l'ustensil

      recipe.ustensils.forEach((ustensil) => items.push(ustensil));
    }
  });

  // ajout data item dans le menu

  divInputGroup.appendChild(input);
  divDropdownItem.appendChild(divInputGroup);

  spanIcon.appendChild(icon);
  divDropdownItem.appendChild(spanIcon);

  divDropdownMenu.appendChild(divDropdownItem);
  const divItems = document.createElement("div");
  divItems.className = "div_items";

  // tri des items en fonction de l'input de recherche du filtre
  // récuprère la chaine de caractère de l'input
  // boucle for sur les items
  // dans la boucle for comparer item avecla valeur de l'input

  items.forEach((item) => {
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.innerHTML = item;
    divItems.appendChild(a);
  });

  divDropdownMenu.appendChild(divItems);
  divDropdown.appendChild(button);
  divDropdown.appendChild(divDropdownMenu);

  divDropdownContain.appendChild(divDropdown);
}
