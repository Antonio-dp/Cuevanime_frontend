import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
export class Video extends HTMLElement {
  #servicioAnime = new ServicioAnime();
  constructor() {
    super();
  }

  async #render(shadow) {
    fetch("./../assets/VideoPlayer.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#addVideoPlayerBehavior(shadow);
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  async #addVideoPlayerBehavior(shadow) {
    const params = new URLSearchParams(window.location.search);
    const mediaContentId = params.get("mediacontent");
    const capituloData = await this.#servicioAnime.obtenerCapitulo(
      mediaContentId
    );

    const button1 = shadow.querySelector("#btnServer1");
    const button2 = shadow.querySelector("#btnServer2");
    const videoIframe = shadow.querySelector("#videoIframe");

    button1.addEventListener("click", () => {
      this.#cambiarServidor(videoIframe, capituloData.url[0]);
    });

    button2.addEventListener("click", () => {
      this.#cambiarServidor(videoIframe, capituloData.url[1]);
    });

    // Crear o seleccionar los elementos para el título y la descripción
    const tituloElement = shadow.querySelector("#titulo");
    const descripcionElement = shadow.querySelector("#descripcion");

    // Asignar el título y la descripción a los elementos
    tituloElement.textContent = capituloData.title;
    descripcionElement.textContent = capituloData.descripcion;
  }

  #cambiarServidor(videoIframe, src) {
    videoIframe.src = src;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("videoplayer-comp", Video);
