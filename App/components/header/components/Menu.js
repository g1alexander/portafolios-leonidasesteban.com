export function Menu() {
  const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = /*html*/ `
    <a href="#/">Home</a>
    <a href="#/search">Busqueda</a>
    <a href="#/contact">Contacto</a>
    <a href="https://aprendejavascript.org" target="_blank" rel="noopener">Aprende JS con el profe Jon</a>
  `;
  return $menu;
}
