export class Video extends HTMLElement {
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

  #addVideoPlayerBehavior(shadow) {
    const button1 = shadow.querySelector("#btnServer1");
    const button2 = shadow.querySelector("#btnServer2");
    const videoIframe = shadow.querySelector("#videoIframe");

    button1.addEventListener("click", () => {
      this.#cambiarServidor(
        videoIframe,
        "https://www.yourupload.com/embed/EgDcu0DcDxqg"
      );
    });

    button2.addEventListener("click", () => {
      this.#cambiarServidor(
        videoIframe,
        "https://www.otro-servidor.com/embed/video123"
      );
    });
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
