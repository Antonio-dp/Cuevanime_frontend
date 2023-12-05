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
        this.navLogin()
        this.#addLoginBehavior(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }

  navLogin(){
    const navbar = document.querySelector('navbar-comp')
        if(navbar){
          navbar.navLogin()
        }
  }

  navNormal(){
    const navbar = document.querySelector('navbar-comp')
        if(navbar){
          navbar.navNormal()
        }
  }

  #addLoginBehavior(shadow) {
    const button = shadow.getElementById('formLogin')

    button.addEventListener("submit", async (e) => {
      e.preventDefault();
      const login = await this.#login(shadow)
      console.log(login)

      if (!login.message) {
        window.location.href = '/'
        navNormal()
      } else {
        this.showToast(shadow)
      }
    })
  }

  async #login(shadow) {
    const nickname = shadow.getElementById('nickname').value
    const password = shadow.getElementById('password').value

    const user = { 'nickname': nickname, 'password': password }

    console.log(user)
    try {
      const response = await this.#servicioAnime.login(user)

      return response
    } catch (e) {
      console.log("Error al intentar iniciar sesión")
      const response = {message: e.message}
      return response
    }
  }

  showToast(shadow) {
    const toastBox = shadow.querySelector('#toastBox')
    let toast = document.createElement('div')
    toast.classList.add('toast')
    const msg = '<i class="fa-solid fa-circle-exclamation"></i> Nickname or password incorrect'
    toast.innerHTML = msg
    toastBox.appendChild(toast)

    setTimeout(()=>{
      toast.remove()
    },4000)
  }
}


customElements.define("login-comp", Login);