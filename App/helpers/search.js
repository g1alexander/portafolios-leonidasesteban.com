import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { SearchCard } from "../components/posts/SearchCard.js";
import { scroll } from "./scroll.js";

export async function Search() {
  let query = localStorage.getItem("wp_search"),
    page = 1,
    perPage = 5;

  if (!query) {
    document.querySelector(".loader").style.display = "none";
    return false;
  }

  await ajax({
    url: `${wp_api.SEARCH}${query}&page=${page}&per_page=${perPage}`,
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

  scroll(page, perPage, wp_api.SEARCH, SearchCard, "#/search");
}
