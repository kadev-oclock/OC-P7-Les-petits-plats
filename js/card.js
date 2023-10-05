/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
// card
// eslint-disable-next-line import/extensions, import/no-unresolved

// eslint-disable-next-line import/prefer-default-export
function cardTemplate(cardData) {
  const { image, name, servings, ingredients, description, time } = cardData;
  const picture = `assets/image/${image}`;

  function getCreateCard() {
    const cardContainer = document.createElement("div");
    cardContainer.className = "card";

    const cardImage = document.createElement("img");
    cardImage.src = picture;
    cardImage.className = "card-img-top";
    cardImage.alt = name;
    cardContainer.appendChild(cardImage);

    const sitcky = document.createElement("p");
    sitcky.className = "card__sticky";
    sitcky.textContent = ` ${time}min`;
    cardContainer.appendChild(sitcky);

    const cardContent = document.createElement("div");
    cardContent.className = "card_contain p-2";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card__title mt-3 mb-3 p-2";
    cardTitle.textContent = name;
    cardContent.appendChild(cardTitle);

    const cardSubtitle = document.createElement("h6");
    cardSubtitle.className = "card__subtitle mb-2 text-body-secondary p-2";
    cardSubtitle.textContent = "recette";
    cardContent.appendChild(cardSubtitle);

    const cardInfo = document.createElement("div");
    const cardText = document.createElement("p");
    cardText.className = "card__text-info";
    cardInfo.className = "card__text row text-left ";
    cardText.textContent = description;
    cardInfo.appendChild(cardText);

    const h6 = document.createElement("h6");
    h6.textContent = "ingredient";
    h6.className = "card__ingredient";
    cardInfo.appendChild(h6);

    const element = createIngredientsList(ingredients);
    cardInfo.appendChild(element);

    cardContent.appendChild(cardInfo);
    cardContainer.appendChild(cardContent);

    return cardContainer;
  }

  function createIngredientsList(ingredients) {
    const element = document.createElement("div");
    element.className = "card__element mt-2 ";
    ingredients.forEach((ingredient) => {
      const divIngredient = document.createElement("div");
      // divIngredient.className = "text-center";
      const ingredientName = document.createElement("p");
      ingredientName.className = "ingredient__name mb-0";
      ingredientName.textContent = ingredient.ingredient;
      divIngredient.appendChild(ingredientName);
      const ingredientAmount = document.createElement("p");
      ingredientAmount.className = "ingredient__amount";
      ingredientAmount.textContent = `${
        ingredient.quantity ? ingredient.quantity : " "
      }${ingredient.unit ? ingredient.unit : " "}`;
      element.appendChild(divIngredient);
      divIngredient.appendChild(ingredientAmount);

      return [ingredientName, ingredientAmount];
    });
    return element;
  }
  return {
    image,
    name,
    servings,
    ingredients,
    getCreateCard,
  };
}

cardTemplate();
