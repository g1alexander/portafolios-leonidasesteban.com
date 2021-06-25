import wp_api from "../../../helpers/wp_api.js";

export function Title() {
  const $h1 = document.createElement("h1");
  $h1.innerHTML = /*html*/ `
    <a href="${
      wp_api.DOMAIN
    }" target="_blank" rel="noopener">${wp_api.NAME.toUpperCase()}</a>
  `;
  return $h1;
}
