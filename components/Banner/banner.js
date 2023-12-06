export class Banner extends HTMLElement {
  constructor() {
    super();
    this.imgUrl =
      "https://static.crunchyroll.com/fms/desktop_large/1350x450/56bc6ebd-6532-48ba-9a50-3a244c9cc5a3.png"; // Añade la URL de tu imagen aquí
  }

  async #render(shadow) {
    fetch("./../assets/Banner.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        const bannerImage = shadow.querySelector(".banner-image");
        bannerImage.src = this.imgUrl;

      const link = document.createElement('a');
      link.href = '/anime/656e9f876ffe5482136c83dd'; // Reemplaza esto con la URL a la que deseas redireccionar

      // Envolver la imagen del banner en el elemento 'a'
      bannerImage.parentNode.insertBefore(link, bannerImage);
      link.appendChild(bannerImage);
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("banner-comp", Banner);
