export class Carousel extends HTMLElement {
  constructor() {
    super();
  }

  async #render(shadow) {
    try {
      const response = await fetch("./../assets/Carousel.html");
      const html = await response.text();
      shadow.innerHTML += html;
      this.#addCarouselBehavior(shadow);
    } catch (error) {
      console.error("Error loading HTML:", error);
    }
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }

  #addCarouselBehavior(shadow) {
    const carousel = shadow.querySelector(".flex");
    let currentIndex = 0;

    function showSlide(index) {
      const transformValue = `translateX(${-index * 100}%)`;
      carousel.style.transform = transformValue;
    }

    window.nextSlide = function () {
      currentIndex = (currentIndex + 1) % 3;
      showSlide(currentIndex);
    };

    window.prevSlide = function () {
      currentIndex = (currentIndex - 1 + 3) % 3;
      showSlide(currentIndex);
    };
  }
}

customElements.define("carousel-comp", Carousel);
