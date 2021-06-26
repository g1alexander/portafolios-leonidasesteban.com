import { Header } from "./components/header/Header.js";
import { Main } from "./components/Main.js";
import { Loader } from "./components/Loader.js";
import { Router } from "./router/index.js";

export function App() {
  const $app = document.getElementById("app");

  $app.innerHTML = null;

  $app.appendChild(Header());
  $app.appendChild(Main());
  $app.appendChild(Loader());

  Router();
}
