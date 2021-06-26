## Estructura de una SPA

- Para trabajar en una estructura de proyecto de una SPA se pueden trabajar de muchas maneras
- Si tarbajas con **frameworks** o **librerias** ellos te proporcionan una cierta estructura a la hora de trabajar (algunos son restrictivos otros no)
- En el curso el profe Jon da una estructura que a él se le hace muy como trabajar. Esto no significa que sea la forma correcta o incorrecta (en la programacion se puede trabajar de muchas maneras)
- Si bien se pueden trabajar en la estrcutura del proyecto de muchas maneras, hay unos archivos que son indispensables, estos son:

  - **index.html:** el archivo principal donde cargara toda la aplicación
  - **carpeta principal de trabajo:** en ella estara todos los archivos que modificaremos o crearemos
  - **carpeta components:** en ella estara todos los componentes (partes **UI** de la aplicacion) de la aplicacion
  - **carpeta assets:** almacenara todos los archivos estaticos (imagenes, hojas de estilos, videos, etc...)
  - **componente principal App.js** (varia dependiendo del framework): En el se cargara toda la información de los componentes que printaremos en la aplicacion
  - **index.js o main.js:** este el archivo que se importa en el **html** y donde cargara toda la logica del cliente.

- ejemplos de estructura de carpetas de un framework (**vue js**):

  <img src="https://lenguajejs.com/vuejs/introduccion/estructura-carpetas/vue-estructura-carpetas.png"/>

---

#### Notas - SPA: Helper de conexión a API REST y peticiones AJAX

- En la carpeta **helpers** se ubica toda la logica del cliente que no tendra nada visual para el usuario, pero si tiene mucha importancia para el funcionamiento de la aplicacion, entre ellas se encuentran:
  - Peticiones AJAX (la idea es hace una peticion general y luego reutilizarla)
  - funciones en general de js que no tengan contenido UI

---

#### Notas - SPA: Componentes UI y renderizado dinamico

- Los componentes de UI son funciones JS que tienen interaccion directa con el **DOM**
- Hay componentes que pueden tener **logica** o sencillamente no tenerla
- Para crear un componente de utiza las tecnicas creacion de elementos de **HTML** por medio de **JS** (**innerHTML**, **createElement()** o combinar tecnicas)
- Para crear los elemetos del **DOM** tener en cuenta declararlos con **"$"**
- Una de las mejores cosas de trabajar con componentes es que puedes dividir la aplicacion tanto como desees y eso conlleva que la aplicacion sea muy reutilizable y tambien muy legible
- Una de las tecnicas para el renderizado dinanico es pasarle los parametros atraves de la funcion del componente y dentro del componente a renderizar hacer un destructurin de la respuesta de la api

  - ejemplo tomado del ejercicio SPA del curso de JON (la api empleada es la de wordpress)

  ```js
  import { Loader } from "./components/Loader.js";
  import { Posts } from "./components/posts/Posts.js"; //componente padre
  import { PostsCard } from "./components/posts/components/PostCard.js"; //componente hijo
  import wp_api from "./helpers/wp_api.js"; //informacion api
  import { ajax } from "./helpers/ajax.js"; //peticion fetch

  export function App() {
    const d = document,
      $root = d.getElementById("root");

    $root.appendChild(Posts());

    ajax({
      url: wp_api.POSTS,
      success: (posts) => {
        console.log(posts);
        let html = "";
        posts.forEach((post) => (html += PostsCard(post))); //renderizado dinamico
        d.getElementById("posts").innerHTML = html;
        d.querySelector(".loader").style.display = "none";
      },
    });
  }
  ```

  ```js
  //renderizado dinamico
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
  ```

---

#### Notas - SPA: Enrutamiento (Router) y Asincronismo del Router

- Suena muy loco, pero mejore el codigo del profe Jon (jjjj) en el **router** el profe utilizo el **if else** para el funcionamiento del **router**, para una mejor optimizacion del codigo preferi utilizar un objecto. Me base en el video de [Midudev](https://www.youtube.com/watch?v=0NlsJuwFsrQ). Lo mas loco fue que con este metodo el **Router** quedo muy similar al del framework **Vue js**

- Para generar un **router** con **vanilla js** se utiliza la propiedad **Location.hash** de **javascript**. que hace esta propiedad?

  - los cambios de pagina se hacen atraves de las etiquetas <a href="#/..."></a> (siempre debe ir el hash para evitar recargar la pagina)
  - con la referencia el **href** de los enlaces ponemos ocupar el objeto **Location.hash** y comprobar en que ruta nos encontramos
  - Teniendo la ruta atraves del **Location.hash** podemos ejecutar una o otra accion y cambiar el contenido de nuestra aplicacion
  - Para saber en que ruta estamos podemos hacerlo de muchas maneras, el profe Jon ocupo los **if else**, pero tambien se pueden ocupar los objetos (queda un poco mejor)

- **NOTA IMPORTANTE:** las SPA son por lo general asicronas esto quiere decir que debemos manejar por medio de **async** - **await** las peticones y **router**, debido a que si no se hace asi el contenido estactico cargara muy rapidamente y del contenido dinamico se quedara esperando hasta que obtenga respuesta (lo cual quedaria la aplicacion en blanco). El manejo asicronico del Router ademas permitira que cuando se haga una peticon **Ajax** podamos manejar de mejor manera un esperador (**Loader**) para indicarle al usuario que se esta cargando el contenido

---

#### Notas - SPA: refactorizacion

- **NOTAS IMPORTANTES:**
  - Cuando creamos una aplicacion es importante que a medida que avazas en el desarrollo de ella, en cierto momentos claves debes detenerte y estructurar de mejor manera la aplicación, para permitir que puedas escalar de mejor manera en el desarrollo
  - esto puede ser como: restructurar carpetas, quitar duplicados, modular mejor la aplicacion, reajustar estilos, cambiar estructura semantica del proyecto (HTML), etc ...
  - Jon nos dice que conforme vayas estando en mas proyectos vas ganando mas experiencia en este aspecto

#### Notas - SPA: vista dinamica

- Para generar una vista dinamica es importante tener el identificador de la vista individual que vamos a buscar 
- para tener este identificador nos puede ayudar el **localstorage** y los **data-attribute** de HTML, porque nos permite tener la facilidad para consultarlo en cualquier parte de nuestra aplicacion