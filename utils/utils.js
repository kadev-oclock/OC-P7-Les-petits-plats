/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable import/no-mutable-exports */
export let tags = [];
// eslint-disable-next-line import/prefer-default-export

export function createTag(input) {
  // eslint-disable-next-line no-unused-vars
  const value = input.srcElement.innerHTML;
  const indexTag = tags.findIndex(
    (tag) =>
      tag.type === input.srcElement.id.split("-")[2] && tag.value === value
  );
  if (indexTag === -1) {
    tags.push({ type: input.srcElement.id.split("-")[2], value });
    afficheTag();
  }
}

function afficheTag() {
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
        if (indexTag !== -1) {
          tags.splice(indexTag, 1);
          afficheTag();
        }
      });
      tagElement.innerHTML = tag.value;
      tagElement.appendChild(icone);
      divTag.appendChild(tagElement);
    });
  }
}
