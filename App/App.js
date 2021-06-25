import { Header } from "./components/header/Header.js";
import { Loader } from "./components/Loader.js";
import { Posts } from "./components/posts/Posts.js";
import { PostsCard } from "./components/posts/components/PostCard.js";
import wp_api from "./helpers/wp_api.js";
import { ajax } from "./helpers/ajax.js";

export function App() {
  const d = document,
    $root = d.getElementById("root");

  $root.appendChild(Header());
  $root.appendChild(Posts());
  $root.appendChild(Loader());

  ajax({
    url: wp_api.POSTS,
    success: (posts) => {
      console.log(posts);
      let html = "";
      posts.forEach((post) => (html += PostsCard(post)));
      d.getElementById("posts").innerHTML = html;
      d.querySelector(".loader").style.display = "none";
    },
  });
}
