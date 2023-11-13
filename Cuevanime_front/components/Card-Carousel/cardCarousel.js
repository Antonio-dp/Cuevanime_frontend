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
  #addCardsBehavior(shadow) {
    const cardCarousel = shadow.getElementById("cardCarousel");
    let currentIndex = 0;

    function showCard(index) {
      const transformValue = `translateX(${-index * 20}rem)`;
      cardCarousel.style.transform = transformValue;
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % cardCarousel.children.length;
      showCard(currentIndex);
    }

    function prevCard() {
      currentIndex =
        (currentIndex - 1 + cardCarousel.children.length) %
        cardCarousel.children.length;
      showCard(currentIndex);
    }

    // Agrega lógica para mostrar/ocultar los botones según sea necesario
    function updateButtons() {
      const prevButton = document.getElementById("prevButton");
      const nextButton = document.getElementById("nextButton");
      prevButton.disabled = currentIndex === 0;
      nextButton.disabled = currentIndex === cardCarousel.children.length - 1;
    }

    document.getElementById("prevButton").addEventListener("click", () => {
      prevCard();
      updateButtons();
    });

    document.getElementById("nextButton").addEventListener("click", () => {
      nextCard();
      updateButtons();
    });

    // Inicializa el carrusel
    showCard(currentIndex);
    updateButtons();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("card-carousel-comp", CardCarousel);
