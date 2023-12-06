import { ServicioAnime } from "../../Servicio/ServicioAnime.js";
export class Navbar extends HTMLElement {
  #servicioAnime = new ServicioAnime();
  #imagen = sessionStorage.getItem("imagen");
  constructor() {
    super();
  }

  async #render(shadow) {
    try {
      const response = await fetch("./../assets/Navbar.html");
      const html = await response.text();
      shadow.innerHTML += html;
      this.#cargarImagen(shadow)
      this.#usuarioPremium()
      this.#addMenuBehavior(shadow);
      
    } catch (error) {
      console.error("Error loading HTML:", error);
    }
  }

  #cargarImagen(){
    const fotoPerfil = this.shadowRoot.getElementById('userImage');
    fotoPerfil.src = this.#imagen;
  }

  navLogin(){
    const div_buscar = this.shadowRoot.getElementById('divBusqueda')
    const div_search = this.shadowRoot.getElementById('searchInput')
    const div_menu = this.shadowRoot.getElementById('divMenu')
    const generos = this.shadowRoot.getElementById('generosDropdown')
    const logo = this.shadowRoot.getElementById('logo')
    const signo = this.shadowRoot.getElementById('menuToggle')
    generos.href = ""
    logo.href = ""
    signo.href = ""
    div_buscar.style.display = 'none'
    div_search.style.display = 'none'
    div_menu.style.display = 'none'
  }

  #usuarioPremium(){
    if(sessionStorage.getItem('suscrito')==="1"){
      this.actualizarFotoPremium()
    }
  }

  navNormal(){
    const div_buscar = this.shadowRoot.getElementById('divBusqueda')
    const div_search = this.shadowRoot.getElementById('searchInput')
    const div_menu = this.shadowRoot.getElementById('divMenu')
    const generos = this.shadowRoot.getElementById('generosDropdown')
    const logo = this.shadowRoot.getElementById('logo')
    const signo = this.shadowRoot.getElementById('menuToggle')
    generos.href = "/catalogo"
    logo.href = "/"
    signo.href = ""
    div_buscar.style.display = 'block'
    div_search.style.display = 'block'
    div_menu.style.display = 'block'
  }

  recibirImagen(imagen){
    this.#imagen = imagen
    this.#cargarImagen()
  }

  #addMenuBehavior(shadow) {
    const menuToggle = shadow.getElementById("menuToggle");
    const menuDropdown = shadow.getElementById("menuDropdown");
    const searchToggle = shadow.getElementById("searchToggle");
    const searchInput = shadow.getElementById("searchInput");
    const userToggle = shadow.getElementById("userToggle");
    const userMenu = shadow.getElementById("userMenu");

    menuToggle.addEventListener("click", () => {
      menuDropdown.classList.toggle("hidden");
    });

    /*     searchToggle.addEventListener("click", () => {
      searchInput.classList.toggle("hidden");
    }); */

    userToggle.addEventListener("click", () => {
      userMenu.classList.toggle("hidden");
    });

    shadow.addEventListener("click", (event) => {
      if (
        !menuToggle.contains(event.target) &&
        !menuDropdown.contains(event.target) &&
        !userToggle.contains(event.target)
      ) {
        menuDropdown.classList.add("hidden");
        userMenu.classList.add("hidden");
      }
    });

    searchInput.addEventListener("keyup", async (event) => {
      const query = event.target.value.toLowerCase();
      const container = this.shadowRoot.querySelector("#searchResults");

      if (query.trim() === "") {
        container.innerHTML = ""; // Limpia el contenedor si la consulta está vacía
        container.classList.add("hidden"); // Oculta el contenedor si la consulta está vacía
      } else {
        const results = await this.#servicioAnime.obtenerAnimes();
        const filteredResults = results.filter((anime) =>
          anime.nombre.toLowerCase().includes(query)
        );
        this.#mostrarResultados(filteredResults);
      }
    });
  }

  actualizarFotoPremium(){
    const fotoPerfil = this.shadowRoot.getElementById('userImage');
    fotoPerfil.className = 'fotoPremium'
    console.log(fotoPerfil.className)
  }

  #mostrarResultados(results) {
    const container = this.shadowRoot.querySelector("#searchResults");
    container.innerHTML = ""; // Borra el contenedor existente
    container.classList.remove("hidden"); // Muestra el contenedor

    results.forEach((anime) => {
      const listItem = document.createElement("li");
      listItem.className = "flex items-center space-x-4 p-2";

      const link = document.createElement("a");
      link.href = `/anime/${anime._id}`;

      const imagen = document.createElement("img");
      imagen.className = "w-8 h-8 object-cover";
      imagen.src = anime.imagenes.card;
      link.appendChild(imagen);

      listItem.appendChild(link);

      const nombre = document.createElement("h2");
      nombre.className = "font-bold text-black";
      nombre.textContent = anime.nombre;
      listItem.appendChild(nombre);

      container.appendChild(listItem);
    });
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
    
  }
}
customElements.define("navbar-comp", Navbar);
