import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
export class AnimeBackground extends HTMLElement {
  #servicioAnime = new ServicioAnime();
  constructor() {
    super();
  }

  async #render(shadow) {
    fetch("./../assets/Banner.html")
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
    console.log(id);
    const animeData = await this.#servicioAnime.obtenerAnime(id);
    const bannerImage = shadow.querySelector(".banner-image");
    bannerImage.src = animeData.imagenes.card;

    bannerImage.style.width = "100%"; // Ajusta el ancho al 100%
    bannerImage.style.height = "300px"; // Ajusta la altura automáticamente para mantener la proporción
    bannerImage.style.objectFit = "cover";
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("animebackground-comp", AnimeBackground);
