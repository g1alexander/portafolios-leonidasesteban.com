export function PostsCard(props) {
  let { id, date, title, slug, _embedded } = props,
    dateFormat = new Date(date).toLocaleString(),
    urlImg = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "App/assets/kEnAi.svg";

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".post-card a")) return false;

    localStorage.setItem("wpApi-postId", e.target.dataset.id);
  });

  return /*html*/ `
    <article class="post-card">
      <img src="${urlImg}" alt="${title.rendered}">
      <h2>${title.rendered}</h2>
      <p>
        <time datetime="${date}">${dateFormat}</time>
        <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
      </p>
    </article>
  `;
}
