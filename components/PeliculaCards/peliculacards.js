import { ServicioAnime } from "../../Servicio/ServicioAnime.js";

export class MovieCard extends HTMLElement {
  #servicioAnime = new ServicioAnime();
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async #render() {
    const response = await fetch("./../assets/PeliculaCards.html");
    const html = await response.text();
    this.shadowRoot.innerHTML = html;
    this.#addMovieCardBehavior();
  }

  async #addMovieCardBehavior() {
    const listaDeAnimes = await this.#consultarAnimes();

    // Iterar sobre los primeros dos animes y agregar las cards
    listaDeAnimes.slice(0, 2).forEach((anime) => {
      const movieCard = this.#createMovieCard(anime); // Crear la tarjeta de película
      this.shadowRoot.appendChild(movieCard); // Añadir la tarjeta de película al shadow root
    });
  }

  #createMovieCard(anime) {
    // Crear el contenedor de la película con una disposición de flexbox
    const movieDiv = document.createElement("div");
    movieDiv.className = "flex"; 
    // Crear el contenedor para la imagen y aplicarle un ancho fijo
    const imgDiv = document.createElement("div");
    imgDiv.className = "w-1/3";
    const movieImg = document.createElement("img");
    movieImg.className = "w-full";
    movieImg.style.width = "601px"; // Set the width
    movieImg.style.height = "336px"; // Set the height
    movieImg.src = anime.imagenes.bannerHorizontal;
    movieImg.alt = anime.nombre;
    imgDiv.appendChild(movieImg);
    movieDiv.appendChild(imgDiv); // Añadir la imagen directamente al contenedor de la película

    // Crear el contenedor de texto de la película y hacer que ocupe el espacio restante
    const textDiv = document.createElement("div");
    textDiv.className = "px-6 py-4 flex-1 flex flex-col justify-center"; // Added flex and justify-center

    // Crear el título de la película
    const movieTitle = document.createElement("div");
    movieTitle.className = "font-bold text-xl text-white mb-2 text-center"; // Added text-center
    movieTitle.textContent = anime.nombre;

    // Crear la sinopsis de la película
    const movieSynopsis = document.createElement("p");
    movieSynopsis.className = "text-white text-base text-center"; // Added text-center
    movieSynopsis.textContent = anime.sinopsis;

    const movieButton = document.createElement("a");
    movieButton.href = `/anime/${anime._id}`;
    movieButton.className =
      "bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded block mx-auto text-center"; // Added block, mx-auto, and text-center
    movieButton.style.backgroundColor = "#3B82F6"; // Added explicit background color
    movieButton.textContent = "Ver Anime";

    // Añadir el título, la sinopsis y el botón al contenedor de texto
    textDiv.appendChild(movieTitle);
    textDiv.appendChild(movieSynopsis);
    textDiv.appendChild(movieButton);

    // Añadir el contenedor de texto al contenedor de la película
    movieDiv.appendChild(textDiv);

    return movieDiv;
  }

  #consultarAnimes() {
    return this.#servicioAnime.obtenerAnimes();
  }

  connectedCallback() {
    this.#render();
  }
}

customElements.define("moviecard-comp", MovieCard);
