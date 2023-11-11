// card-carousel.js
export class CardCarousel extends HTMLElement {
  constructor() {
    super();
  }

  async #render(shadow) {
    try {
      const response = await fetch("./../assets/CardCarousel.html");
      const html = await response.text();
      // Crear un nuevo div en el sombreado
      const container = document.createElement("div");
      container.innerHTML = html;
      shadow.appendChild(container);

      this.#addCarouselBehavior(shadow);
    } catch (error) {
      console.error("Error loading HTML:", error);
    }
  }

  #addCarouselBehavior(shadow) {
    const cardContainer = shadow.getElementById("cardContainer");
    const prevButton = shadow.getElementById("prevButton");
    const nextButton = shadow.getElementById("nextButton");

    let currentIndex = 0;

    function showCard(index) {
      const transformValue = `translateX(${-index * 100}%)`;
      cardContainer.style.transform = transformValue;
    }

    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % cardContainer.children.length;
      showCard(currentIndex);
    });

    prevButton.addEventListener("click", () => {
      currentIndex =
        (currentIndex - 1 + cardContainer.children.length) %
        cardContainer.children.length;
      showCard(currentIndex);
    });

    // Agrega lógica adicional según sea necesario
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.addEventListener("load", () => {
      this.#render(shadow);
    });
  }
}

customElements.define("card-carousel", CardCarousel);
