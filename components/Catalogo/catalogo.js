import { list } from "postcss";

import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
import page from "page";
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
    this.addCatalogoBehavior();
  }

  async addCatalogoBehavior() {
    const listaDeAnimes = await this.#consultarAnimes();
    this.#mostrarAnimes(listaDeAnimes);
    
  }
  #mostrarAnimes(listaDeAnimes){
    const container = this.shadowRoot.querySelector("#animeContainer"); // Cambia a 6 filas
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos animes
    listaDeAnimes.forEach((anime) => {
      const card = document.createElement("div");
      card.className = "p-0 border-solid relative"; // Reducido el padding
      const enlace = document.createElement("a");
      const divBueno = document.createElement("div");
      divBueno.className = "w-full h-full blur-sm absolute opacity-30 bg-[#4338ca] top-0 left-0 "
      enlace.href = `/anime/${anime._id}`;
      enlace.className =
        "inline-block shadow-md hover:shadow-xl";

      const contenidoDiv = document.createElement("div"); // Nuevo contenedor
      contenidoDiv.className = ("p-4 ")
      contenidoDiv.style.boxShadow = "0 25px 50px -12px rgb(0 0 0 / 0.25)"
      contenidoDiv.style.border = "4px"
      contenidoDiv.style.borderRadius = "5px"
      //contenidoDiv.style.backgroundColor ="rgba(176, 28, 255,0.2)"
      contenidoDiv.style.backdropFilter = "blur(100px)"

      const imagenDiv = document.createElement("div");
      const imagen = document.createElement("img");
      imagen.className = "object-cover";
      imagen.src = anime.imagenes.card;
      imagen.width = 300;
      imagen.height = 300;
      imagenDiv.appendChild(imagen);

      const nombreDiv = document.createElement("div");
      const nombre = document.createElement("h2");
      nombre.className = "mt-2 mb-2 font-bold text-center text-white";
      nombre.textContent = anime.nombre;
      nombreDiv.appendChild(nombre);

      enlace.addEventListener("click", (e) => {
        e.preventDefault();
        location.href = enlace.href;
      });

      // Construir la estructura de la card
      card.appendChild(divBueno)
      contenidoDiv.appendChild(imagenDiv);
      contenidoDiv.appendChild(nombreDiv);
      enlace.appendChild(contenidoDiv);
      card.appendChild(enlace);
      container.appendChild(card);
    });
  }

  async filtrarPorGenero(genero) {
    console.log(genero);
    if(genero == "showall"){
      this.addCatalogoBehavior();
      return;
    }
    const listaDeAnimes = await this.#consultarAnimes();
    const animesFiltrados = new Array();
    listaDeAnimes.forEach(anime => {
      if(anime.genero == genero){
        animesFiltrados.push(anime)
      }
    })
    this.#mostrarAnimes(animesFiltrados);
  }
  #consultarAnimes() {
    return this.#servicioAnime.obtenerAnimes();
  }

  connectedCallback() {
    this.#render();
  }
}

customElements.define("catalogo-comp", Catalogo);
