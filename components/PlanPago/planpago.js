export class Plan extends HTMLElement {
    constructor() {
      super();
      //const shadow = this.attachShadow({ mode: 'open' })
      //shadow.appendChild(template.content.cloneNode(true))
    }
    async #render(shadow) {
      fetch("./../assets/PlanPago.html")
        .then((response) => response.text())
        .then((html) => {
          shadow.innerHTML += html;
        })
        .catch((error) => console.error("error loading HTML: " + error));
    }
    connectedCallback() {
      const shadow = this.attachShadow({ mode: "open" });
      this.#render(shadow);
    }
  }
  
  customElements.define("plan-comp", Plan);