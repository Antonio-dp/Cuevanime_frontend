import { ServicioAnime } from "../../Servicio/ServicioAnime.js";

export class SeasonSelector extends HTMLElement {
  #servicioAnime = new ServicioAnime();
    constructor() {
      super();
    }
  
    async #render(shadow) {
      const url = window.location.pathname;
      const id = url.split("/").at(-1);
      const listaDeCapitulos = await this.#servicioAnime.obtenerCapitulos(id);
      const listaDeTemporadas = await this.#servicioAnime.obtenerTemporadas();
      
      const mapaDeTemporadas = new Map(listaDeTemporadas.map(temporada => [temporada._id, temporada]));

      fetch("./../assets/SeasonSelector.html")
        .then((response) => response.text())
        .then((html) => {
          shadow.innerHTML += html;
          const temporadasDelAnime = new Set(listaDeCapitulos.map(capitulo => capitulo.temporada));
      
          const seasonSelect = shadow.querySelector('#seasonSelect');
          temporadasDelAnime.forEach(idTemporada => {
            const temporada = mapaDeTemporadas.get(idTemporada);
            if (temporada) {
              const option = document.createElement('option');
              option.value = temporada._id;
              option.textContent = temporada.title;
              seasonSelect.appendChild(option);
            }
          });
          this.#addEventListeners(shadow);

          const changeEvent = new Event('change');
          seasonSelect.dispatchEvent(changeEvent);
        })
        .catch((error) => console.error("error loading HTML: " + error));
    }
  
    #addEventListeners(shadow) {
      const seasonSelect = shadow.querySelector('#seasonSelect');
      seasonSelect.addEventListener('change', this.#handleSeasonChange.bind(this));
    }

    #handleSeasonChange(event) {
      const mediaInfo = document.querySelector('mediainfo-comp');
      const seasonSelect = event.target

      const season = seasonSelect.value;
      console.log(`Temporada seleccionada: ${season}`);
      
      if(mediaInfo) {
        const customEvent = new CustomEvent('seasonSelected', { detail: season });
        mediaInfo.handleSeasonSelected(customEvent);
      }
    }
  
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      this.#render(shadow)
      }
      
    }
  
  customElements.define("season-selector", SeasonSelector);