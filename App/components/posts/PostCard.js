export function PostsCard(props) {
  let { date, title, slug, _embedded } = props,
    dateFormat = new Date(date).toLocaleString(),
    urlImg = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "App/assets/kEnAi.svg";

  return /*html*/ `
    <article class="post-card">
      <img src="${urlImg}" alt="${title.rendered}">
      <h2>${title.rendered}</h2>
      <p>
        <time datetime="${date}">${dateFormat}</time>
        <a href="#/${slug}">Ver publicacion</a>
      </p>
    </article>
  `;
}
