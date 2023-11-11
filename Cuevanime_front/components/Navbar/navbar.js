export class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    async #render(shadow) {
        try {
            const response = await fetch('./../assets/Navbar.html');
            const html = await response.text();
            shadow.innerHTML += html;
            this.#addMenuBehavior(shadow);
        } catch (error) {
            console.error('Error loading HTML:', error);
        }
    }

    #addMenuBehavior(shadow) {
        const menuToggle = shadow.getElementById('menuToggle');
        const menuDropdown = shadow.getElementById('menuDropdown');
        const generosDropdown = shadow.getElementById('generosDropdown');
        const generosMenu = shadow.getElementById('generosMenu');
        const searchToggle = shadow.getElementById('searchToggle')
        const searchInput = shadow.getElementById('searchInput')
        const userToggle = shadow.getElementById('userToggle');
        const userMenu = shadow.getElementById('userMenu');
      
        menuToggle.addEventListener('click', () => {
          menuDropdown.classList.toggle('hidden');
        });

        searchToggle.addEventListener('click', () => {
          searchInput.classList.toggle('hidden');
        });
      
        // Agregamos la lógica para mostrar/ocultar el menú de "Géneros" en dispositivos móviles
        generosDropdown.addEventListener('click', () => {
          generosMenu.classList.toggle('hidden');
        });

        userToggle.addEventListener('click', () => {
          userMenu.classList.toggle('hidden');
      });
      
        shadow.addEventListener('click', (event) => {
          if (!menuToggle.contains(event.target) && !menuDropdown.contains(event.target) && !generosDropdown.contains(event.target) && !userToggle.contains(event.target)) {
            menuDropdown.classList.add('hidden');
            generosMenu.classList.add('hidden');
            userMenu.classList.add('hidden');
          }
        });
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#render(shadow);
    }
}

customElements.define('navbar-comp', Navbar);
