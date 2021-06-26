import { PostsCard } from "../components/posts/PostCard.js";
import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";

export async function Home() {
  const d = document;
  d.getElementById("main").innerHTML = null;
  await ajax({
    url: wp_api.POSTS,
    success: (posts) => {
      let html = "";
      posts.forEach((post) => (html += PostsCard(post)));
      d.getElementById("main").innerHTML = html;
    },
  });
}
