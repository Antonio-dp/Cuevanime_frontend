export class CardCarousel extends HTMLElement {
  constructor() {
    super();
    //const shadow = this.attachShadow({ mode: 'open' })
    //shadow.appendChild(template.content.cloneNode(true))
  }
  async #render(shadow) {
    fetch("./../assets/CardCarousel.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#addCardsBehavior(shadow);
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }
  #addCardsBehavior(shadow) {}
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("card-carousel-comp", CardCarousel);
