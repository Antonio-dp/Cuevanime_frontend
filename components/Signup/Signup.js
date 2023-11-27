export class Signup extends HTMLElement {
  constructor() {
    super();
  }
  async #render(shadow) {
    fetch("./assets/Signup.html")
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

customElements.define("signup-comp", Signup);
