import { ServicioAnime } from "../../Servicio/ServicioAnime.js";

export class MediaCaps extends HTMLElement {
  #servicioAnime = new ServicioAnime();

  constructor() {
    super();
    this.attachShadow({ mode: "open" }); 
   }

  async #render() {
    const response = await fetch("./../assets/Catalogo.html");
    const html = await response.text();
    this.shadowRoot.innerHTML = html;
    this.#addCatalogoBehavior();
  }

  async #addCatalogoBehavior() {
    const url = window.location.pathname;
    const id = url.split("/").at(-1);
    const animeData = await this.#servicioAnime.obtenerAnime(id);
    console.log(animeData);
    const listaDeCapitulos = await this.#servicioAnime.obtenerCapitulos(id);
    const listaDeTemporadas = await this.#servicioAnime.obtenerTemporadas();
    const temporadaSeleccionada = 'Temporada 1';

    this.#mostrarCapitulos(listaDeCapitulos);
  }

  #mostrarCapitulos(listaDeCapitulos) {
    const container = this.shadowRoot.querySelector("#animeContainer")// Cambia a 6 filas
    container.innerHTML = '';
    listaDeCapitulos.forEach((capitulo) => {
      const card = document.createElement("div");
      card.className = "p-0"; // Reducido el padding

      const enlace = document.createElement("a");
      enlace.href = `/watch/${capitulo._id}`;
      enlace.className =
        "inline-block shadow-md hover:shadow-xl overflow-hidden";

      const contenidoDiv = document.createElement("div"); // Nuevo contenedor
      contenidoDiv.className = "p-4";

      const imagenDiv = document.createElement("div");
      const imagen = document.createElement("img");
      imagen.className = "object-cover";
      imagen.src = animeData.imagenes.card;
      imagen.width = 300;
      imagen.height = 300;
      imagenDiv.appendChild(imagen);

      const nombreDiv = document.createElement("div");
      const nombre = document.createElement("h2");
      nombre.className = "mt-2 mb-2 font-bold text-center text-white";
      console.log(capitulo.title);
      nombre.textContent = capitulo.title;
      nombreDiv.appendChild(nombre);

      enlace.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = enlace.href;
      });

      // Construir la estructura de la card
      contenidoDiv.appendChild(imagenDiv);
      contenidoDiv.appendChild(nombreDiv);
      enlace.appendChild(contenidoDiv);
      card.appendChild(enlace);
      container.appendChild(card);
    });
  }


  connectedCallback() {
    this.#render();
  }
}

customElements.define("mediainfo-comp", MediaCaps);
