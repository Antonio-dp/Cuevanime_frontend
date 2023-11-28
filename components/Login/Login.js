import { ServicioAnime } from "../../Servicio/ServicioAnime";

export class Login extends HTMLElement {
  #servicioAnime = new ServicioAnime();

  constructor() {
    super();
    //const shadow = this.attachShadow({ mode: 'open' })
    //shadow.appendChild(template.content.cloneNode(true))
  }
  async #render(shadow) {
    fetch("./../assets/Login.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#addLoginBehavior(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    
    this.#render(shadow);
    
  }

  #addLoginBehavior(shadow) {
    const button = shadow.getElementById('formLogin')

    button.addEventListener("submit", async (e) => {
      e.preventDefault();
      const login = await this.#login(shadow)
      console.log(login)

      if(!login.message){
        window.location.href = '/'
      }else{
        console.log(login.message)
      }
    })
  }

  async #login(shadow) {
    console.log("sadadadadas")
    const nickname = shadow.getElementById('nickname').value
    const password = shadow.getElementById('password').value

    const user = { 'nickname': nickname, 'password': password }

    console.log(user)
    try {
      const response = await this.#servicioAnime.login(user)

      return response
    } catch (e) {
      console.log("Error al intentar iniciar sesión")
      return false
    }
  }
}


customElements.define("login-comp", Login);