import { ServicioAnime } from "../../Servicio/ServicioAnime";

export class Signup extends HTMLElement {
  #servicioAnime = new ServicioAnime();

  constructor() {
    super();
  }
  async #render(shadow) {
    fetch("./assets/Signup.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.navSignup()
        this.#addSignUpBehavior(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }

  navSignup(){
    const navbar = document.querySelector('navbar-comp')
        if(navbar){
          navbar.navLogin()
        }
  }

  #addSignUpBehavior(shadow) {
    const button = shadow.getElementById('formRegistro')

    button.addEventListener("submit", async (e) => {
      e.preventDefault();
      const registro = await this.#registro(shadow)
      console.log(registro)

      if (registro) {
        window.location.href = '/login'
      } 
      else{
        this.showToast(shadow)
      }
    })
  }

  async #registro(shadow) {
    const email = shadow.getElementById('email').value
    const nickname = shadow.getElementById('nickname').value
    const password = shadow.getElementById('password').value
    const password2 = shadow.getElementById('password2').value

    if(email == '' || nickname == '' || password == '' || password2 == ''){
      return false
    }

    if(password != password2){
      return false
    }

    const user = { 'nickname': nickname, 'password': password, 'email':email, 'imagen': 'icons/padorusage.jpg', 'idSuscripcion': '0' }

    console.log(user)
    try {
      const response = await this.#servicioAnime.registro(user)
      console.log(response)
      if (!response.message) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log("Error al intentar iniciar sesión")
      return false
    }
  }

  showToast(shadow) {
    const toastBox = shadow.querySelector('#toastBox')
    let toast = document.createElement('div')
    toast.classList.add('toast')
    const msg = '<i class="fa-solid fa-circle-exclamation"></i> Rellene todos los datos correctamente'
    toast.innerHTML = msg
    toastBox.appendChild(toast)

    setTimeout(()=>{
      toast.remove()
    },4000)
  }
}

customElements.define("signup-comp", Signup);
