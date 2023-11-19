export class Banner extends HTMLElement {
  constructor() {
    super();
    this.imgUrl =
      "https://static.crunchyroll.com/fms/desktop_large/1350x450/2bda67a8-4e33-4be2-ab6f-41d0acebf298.png"; // Añade la URL de tu imagen aquí
  }

  async #render(shadow) {
    fetch("./../assets/Banner.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        const bannerImage = shadow.querySelector(".banner-image");
        bannerImage.src = this.imgUrl;
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("banner-comp", Banner);
