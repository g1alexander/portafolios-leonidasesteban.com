import { HelloWorld } from "./components/HelloWorld.js";
import { FormatDate } from "./helpers/format_date.js";

export function App() {
  document.getElementById(
    "root"
  ).innerHTML = `${HelloWorld()} -- ${FormatDate()}`;
}
