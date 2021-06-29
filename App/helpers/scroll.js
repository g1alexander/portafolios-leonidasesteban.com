import { ajax } from "../helpers/ajax.js";

export async function scroll(page, perPage, url, card, hash) {
  const d = document;

  window.addEventListener("scroll", async (e) => {
    const { scrollTop, clientHeight, scrollHeight } = d.documentElement;

    if (
      scrollTop + clientHeight >= scrollHeight &&
      (hash.includes("search")
        ? location.hash.includes(hash)
        : location.hash === hash || !location.hash)
    ) {
      d.querySelector(".loader").style.display = "block";
      page++;
      await ajax({
        url: `${url}&page=${page}&per_page=${perPage}`,
        success: (response) => {
          let html = "";
          response.forEach((res) => (html += card(res)));
          d.getElementById("main").innerHTML += html;
        },
      });
      d.querySelector(".loader").style.display = "none";
    }
  });
}
