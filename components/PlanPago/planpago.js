import { ServicioAnime } from "../../Servicio/ServicioAnime";
export class Plan extends HTMLElement {
  #servicioAnime = new ServicioAnime();
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
        this.#validarSuscriptor()
        this.#suscribirse(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
  }

  #validarSuscriptor(){
    if(sessionStorage.getItem('suscrito')==="1"){
      const boton = this.shadowRoot.getElementById('suscribirse')
      boton.innerText = "Ya estas suscrito"
      boton.disabled = true
    }
  }

  #suscribirse(shadow) {
    const boton = shadow.getElementById('suscribirse')
    const modal = shadow.getElementById('modal');
    const btnCerrar = shadow.getElementById('close-btn');

    boton.addEventListener('click', async () => {
      try{
        const user = await this.#servicioAnime.obtenerUsuario(sessionStorage.getItem('id'))
        console.log(user)
        const suscrito = await this.#servicioAnime.suscribirUser(user)
        if(!suscrito.message){
          modal.style.display = 'block';
          modal.classList.add('active');
        }
        else{
          alert('No se pudo suscribir intente más tarde');
        }

        const navbar = document.querySelector('navbar-comp')
        if(navbar){
          navbar.actualizarFotoPremium()
        }
      }catch(e){
        console.log("trono")
      }
    })

    btnCerrar.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.classList.remove('active');
    })
  }
}

customElements.define("plan-comp", Plan);