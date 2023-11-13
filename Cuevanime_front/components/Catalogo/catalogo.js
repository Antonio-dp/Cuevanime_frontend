import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
export class Catalogo extends HTMLElement {
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
    const listaDeAnimes = await this.#consultarAnimes();

    // Función para agregar una card al contenedor
    function agregarCard(anime) {
      const container = this.shadowRoot.querySelector("#animeContainer");

      const card = document.createElement("div");
      card.className = "w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4";

      const enlace = document.createElement("a");
      enlace.href = anime.enlace;
      enlace.className =
        "block bg-white shadow-md hover:shadow-xl overflow-hidden";
      const forma = document.createElement("div");
      forma.className = "relative pb-48 overflow-hidden";

      const imagen = document.createElement("img");
      imagen.className = "absolute inset-0 h-full w-full object-cover";
      imagen.src = anime.imagenes.card;
      imagen.alt = `Imagen de ${anime.nombre}`;

      const contenido = document.createElement("div");
      contenido.className =
        "p-4 flex flex-col items-center justify-center bg-brand";

      const nombre = document.createElement("h2");
      nombre.className = "mt-2 mb-2 font-bold text-center text-white";
      nombre.textContent = anime.nombre;

      // Construir la estructura de la card
      contenido.appendChild(nombre);
      forma.appendChild(imagen);
      enlace.appendChild(forma);
      enlace.appendChild(contenido);
      card.appendChild(enlace);
      container.appendChild(card);
    }

    // Iterar sobre la lista de animes y agregar las cards
    listaDeAnimes.forEach((anime) => {
      agregarCard.call(this, anime); // Usamos call para establecer el contexto correcto
    });
  }

  #consultarAnimes() {
    return this.#servicioAnime.obtenerAnimes();
  }

  connectedCallback() {
    this.#render();
  }
}

customElements.define("catalogo-comp", Catalogo);
