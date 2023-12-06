export class Filter extends HTMLElement {
  constructor() {
    super();
  }
  async #render(shadow) {
    fetch("./../assets/Filters.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#addDropdownBehavior(shadow);
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }
  #addDropdownBehavior(shadow) {
    const button = shadow.querySelector("#options-menu");
    const dropdown = shadow.querySelector("#options");
  
    button.addEventListener("click", () => {
      dropdown.classList.toggle("hidden");
    });
  
    dropdown.addEventListener("change", () => {
      const selectedGenre = dropdown.querySelector('input[name="genre"]:checked').value;
      this.#filterCatalogueByGenres(selectedGenre);
    });
    
    document.body.addEventListener('mouseup', function(event) {
      var isClickInsideButton = button.contains(event.target);
      var isClickInsideDropdown = dropdown.contains(event.target);
  
      if (!isClickInsideButton && !isClickInsideDropdown) {
        // El clic fue fuera del botón y del menú de opciones, cierra el menú
        dropdown.classList.add('hidden');
      }
    });
  }

  #filterCatalogueByGenres(genero) {
    const catalogue = document.querySelector('catalogo-comp');
    if (catalogue) {
      catalogue.filtrarPorGenero(genero);
    }
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }
}

customElements.define("filter-comp", Filter);
