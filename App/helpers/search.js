import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { SearchCard } from "../components/posts/SearchCard.js";

export async function Search() {
  let query = localStorage.getItem("wp_search");
  if (!query) {
    document.querySelector(".loader").style.display = "none";
    return false;
  }

  await ajax({
    url: `${wp_api.SEARCH}${query}`,
    success: (search) => {
      let html = "";
      if (search.length === 0) {
        html = /*html*/ `
          <p class="error">
            No hay resultados de busqueda para "${query}"
          </p>
        `;
      }
      search.forEach((post) => (html += SearchCard(post)));
      document.getElementById("main").innerHTML = html;
    },
  });
}
