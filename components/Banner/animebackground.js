import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
export class AnimeBackground extends HTMLElement {
  #servicioAnime = new ServicioAnime();
  constructor() {
    super();
  }

  async #render(shadow) {
    fetch("./../assets/AnimeBackground.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#addBannerBehavior(shadow);
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  async #addBannerBehavior(shadow) {
    const url = window.location.pathname;
    const id = url.split("/").at(-1);
    const animeData = await this.#servicioAnime.obtenerAnime(id);
    const bannerImage = shadow.querySelector(".banner-image");
    bannerImage.src = animeData.imagenes.bannerHorizontal;

    bannerImage.style.width = "100%"; // Ajusta el ancho al 100%
    bannerImage.style.height = "495px"; // Ajusta la altura automáticamente para mantener la proporción
    bannerImage.style.objectFit = "cover";

    const smallerImage = shadow.querySelector(".smaller-image");
    smallerImage.src = animeData.imagenes.bannerHorizontal; // Ajusta el ancho al 100%
    smallerImage.style.height = "500px";
    smallerImage.style.boxShadow = "0 0 20px 10px rgba(0, 0, 0, 0.5)"; // Ajusta la altura automáticamente para mantener la proporción

    const synopsisComponent = shadow.querySelector(".sinopsis-anime");
    const sinopsis = document.createElement('p');
    sinopsis.className = 'justify-items-start mx-16'
    sinopsis.textContent = animeData.sinopsis;
    synopsisComponent.appendChild(sinopsis);
    shadow.appendChild(synopsisComponent);
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("animebackground-comp", AnimeBackground);
