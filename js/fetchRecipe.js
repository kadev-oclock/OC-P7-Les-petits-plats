// fetch le json

// eslint-disable-next-line import/prefer-default-export
export async function getRecipes() {
  const reponse = await fetch("./data/recipes.json");
  try {
    if (!reponse.ok) {
      throw new Error("pas de données json");
    }
    const data = await reponse.json();
    return data;
  } catch (error) {
    return [];
  }
}
