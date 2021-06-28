import { Home } from "../helpers/home.js";
import { PostView } from "../helpers/post_view.js";
import { Search } from "../helpers/search.js";

export async function Router() {
  const $main = document.getElementById("main");
  let { hash } = location;

  const routes = {
    "": () => Home(),
    "#/": () => Home(),
    "#/search": () => Search(),
    "#/contact": () =>
      ($main.innerHTML = /*html*/ `<h2>Seccion de contact</h2>`),
  };

  const DinamicView = () => PostView();

  routes[hash]
    ? await routes[hash]()
    : hash.includes("#/search")
    ? await routes["#/search"]()
    : await DinamicView();

  document.querySelector(".loader").style.display = "none";
}
