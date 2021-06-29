export function FormContact() {
  const d = document,
    $form = d.createElement("form"),
    $styles = d.getElementById("styles");

  $form.classList.add("form");
  $form.id = "form-contact";

  $styles.innerHTML = /*css*/ `
    .form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form input[type="text"],
    .form input[type="email"],
    .form textarea {
      border: 0.5px solid #c4c4c4;
      padding: 1rem;
      border-radius: 4px;
      resize: none;
    }
    .form input[type="text"]:focus,
    .form input[type="email"],
    .form textarea:focus {
      outline: none;
    }
    .form input[type="submit"] {
      width: 50%;
      margin: 0 auto;
      border: none;
      background: #e79141;
      padding: 0.7rem;
      border-radius: 5px;
      cursor: pointer;
    }
    .form input[type="submit"]:hover {
      background: #cf8037;
    }
    .submit-ok {
      text-align: center;
      font-size: 20px;
      margin-top: 1rem;
    }
    .form-error {
      background: #ff5a66;
      padding: 1rem;
      text-align: center;
      color: white;
    }
    .hidden {
      display: none;
    }
  `;

  $form.innerHTML = /*html*/ `
    <input
      type="text"
      name="nombre"
      placeholder="escribe tu nombre"
      title="el nombre solo acepta letras y espacios"
      pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
      required
    />
    <input
      type="email"
      name="correo"
      placeholder="escribe tu email"
      title="email incorrecto"
      pattern="^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$"
      required
    />
    <input
      type="text"
      name="asunto"
      placeholder="escribe tu asunto"
      title="asunto no puede ir vacio"
      required
    />

    <textarea
      name="comentarios"
      cols="50"
      rows="5"
      placeholder="escribe tus comentarios"
      title="Los comentarios solo deben tener max 255 caracteres"
      data-pattern="^.{1,255}$"
      required
    ></textarea>

    <input type="submit" value="enviar" />
    
    <div id="loader" class="hidden">
      <img src="App/assets/loader.svg" width="70" height="70" />
    </div>

    <p id="submitOk" class="submit-ok hidden"></p>
  `;

  function validationsForm() {
    const $inputs = d.querySelectorAll("#form-contact [required]");

    $inputs.forEach((input) => {
      const $span = d.createElement("span");
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add("form-error", "hidden");
      input.insertAdjacentElement("afterend", $span);
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches("#form-contact [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.remove("hidden")
            : d.getElementById($input.name).classList.add("hidden");
        }

        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.remove("hidden")
            : d.getElementById($input.name).classList.add("hidden");
        }
      }
    });

    const formSubmit = async (form) => {
      const $loader = d.getElementById("loader"),
        $submitOk = d.getElementById("submitOk");

      $loader.classList.remove("hidden");
      $loader.style.margin = "0 auto";
      try {
        const res = await fetch(
          "https://formsubmit.co/ajax/alexlds26@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: form.nombre.value,
              email: form.correo.value,
              asunto: form.asunto.value,
              message: form.comentarios.value,
            }),
          }
        );
        const json = await res.json();

        $submitOk.classList.remove("hidden");
        $submitOk.textContent = json.message;

        if (!res.ok) throw { status: res.success, statusText: res.message };
      } catch (err) {
        console.error(err);
      }
      $loader.classList.add("hidden");
      setTimeout(() => {
        $submitOk.classList.add("hidden");
        form.reset();
      }, 2000);
    };

    d.addEventListener("submit", (e) => {
      if (e.target.matches("#form-contact")) {
        e.preventDefault();

        formSubmit(e.target);
      }
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}
