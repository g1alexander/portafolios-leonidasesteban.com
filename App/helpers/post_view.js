import { Post } from "../components/posts/Post.js";
import wp_api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";

export async function PostView() {
  document.getElementById("main").innerHTML = null;
  await ajax({
    url: `${wp_api.POST}/${localStorage.getItem("wpApi-postId")}`,
    success: (post) => {
      document.getElementById("main").innerHTML = Post(post);
    },
  });
}
