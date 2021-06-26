import { PostsCard } from "../components/posts/PostCard.js";
import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";

export async function Home() {
  document.getElementById("main").innerHTML = null;
  await ajax({
    url: wp_api.POSTS,
    success: (posts) => {
      let html = "";
      posts.forEach((post) => (html += PostsCard(post)));
      document.getElementById("main").innerHTML = html;
    },
  });
}
