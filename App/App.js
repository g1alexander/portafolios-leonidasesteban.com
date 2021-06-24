import { HelloWorld } from "./components/HelloWorld.js";
import wp_api from "./helpers/wp_api.js";
import { ajax } from "./helpers/ajax.js";

export function App() {
  document.getElementById(
    "root"
  ).innerHTML = /*html*/ `<h1>${HelloWorld()}</h1>`;

  console.log(wp_api);
  ajax({
    url: wp_api.POSTS,
    success: (posts) => {
      console.log(posts);
    },
  });
  ajax({
    url: wp_api.CATEGORIES,
    success: (categories) => {
      console.log(categories);
    },
  });
}
