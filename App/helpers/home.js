import { PostsCard } from "../components/posts/PostCard.js";
import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { scroll } from "./scroll.js";

export async function Home() {
  const d = document;
  let page = 1,
    perPage = 5;
  d.getElementById("main").innerHTML = null;

  await ajax({
    url: `${wp_api.POSTS}&page=${page}&per_page=${perPage}`,
    success: (posts) => {
      let html = "";
      posts.forEach((post) => (html += PostsCard(post)));
      d.getElementById("main").innerHTML = html;
    },
  });

  scroll(page, perPage, wp_api.POSTS, PostsCard, "#/");
}
