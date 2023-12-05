import { ServicioAnime } from "../../Servicio/ServicioAnime";
export class Perfil extends HTMLElement {
  #fotoPerfil
  #servicioAnime = new ServicioAnime();

  constructor() {
    super();
    this.#fotoPerfil = sessionStorage.getItem('imagen')
    console.log(this.#fotoPerfil)
    // const shadow = this.attachShadow({ mode: 'open' })
    // shadow.appendChild(template.content.cloneNode(true))
  }

  async #render(shadow) {
    fetch("./../assets/Perfil.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#editarPerfil(shadow)
        this.#precargarDatos(shadow)
        this.#editarImagen(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);

  }

  #precargarDatos(shadow) {
    const nombre = shadow.getElementById('nombre')
    const emailReset = shadow.getElementById('email');
    const usernameReset = shadow.getElementById('username');
    const fotoPerfil = shadow.getElementById('imagenPerfil');
    fotoPerfil.src = sessionStorage.getItem('imagen');
    nombre.textContent = sessionStorage.getItem('nickname')
    usernameReset.value = sessionStorage.getItem('nickname')
    emailReset.value = sessionStorage.getItem('email')
  }

  #editarPerfil(shadow) {
    const updateButton = shadow.getElementById('updateButton');
    const cancelButton = shadow.getElementById('cancelButton');

    function actualizarPerfil() {
      const ids = ['email', 'username', 'password', 'password2'];
      const btn1 = shadow.getElementById('btn1');
      const btn2 = shadow.getElementById('btn2');
      const btn3 = shadow.getElementById('btn3');
      const btn4 = shadow.getElementById('btn4');
      const btn5 = shadow.getElementById('btn5');
      btn1.disabled = false;
      btn2.disabled = false;
      btn3.disabled = false;
      btn4.disabled = false;
      btn5.disabled = false;
      updateButton.innerText = 'Confirmar cambios';
      cancelButton.style.display = 'inline-block';
      ids.forEach((id) => {
        const element = shadow.getElementById(id);
        element.disabled = false;

      });
    }

    const confirmarCambios = async () => {
      const ids = ['email', 'username', 'password', 'password2'];
      const emailInput = shadow.getElementById('email').value
      const usernameInput = shadow.getElementById('username').value;
      const passwordInput = shadow.getElementById('password').value;
      const password2Input = shadow.getElementById('password2').value;
      const imagen = this.#fotoPerfil
      console.log(imagen)

      if (passwordInput !== password2Input) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      } else if (passwordInput === password2Input && passwordInput != "" || usernameInput != "") {

        const user = {
          "id": sessionStorage.getItem('id'),
          "email": emailInput,
          "nickname": usernameInput,
          "password": password2Input,
          "imagen": imagen

        }

        try {
          if (await this.#servicioAnime.UpdateUser(user)) {
            alert('Perfil actualizado con éxito');
            cancelButton.style.display = 'none';
            updateButton.innerText = 'Actualizar perfil';
            ids.forEach((id) => {
              const element = shadow.getElementById(id);
              element.disabled = true;
            })
            const nombre = shadow.getElementById('nombre')
            const emailReset = shadow.getElementById('email');
            const usernameReset = shadow.getElementById('username');
            const passwordReset = shadow.getElementById('password');
            const password2Reset = shadow.getElementById('password2');
            const btn1 = shadow.getElementById('btn1');
            const btn2 = shadow.getElementById('btn2');
            const btn3 = shadow.getElementById('btn3');
            const btn4 = shadow.getElementById('btn4');
            const btn5 = shadow.getElementById('btn5');
            btn1.disabled = true;
            btn2.disabled = true;
            btn3.disabled = true;
            btn4.disabled = true;
            btn5.disabled = true;
            nombre.textContent = usernameInput
            usernameReset.value = usernameInput
            emailReset.value = emailInput
            passwordReset.value = ""
            password2Reset.value = ""
            usernameReset.placeholder = 'Username'
            passwordReset.placeholder = 'Password'
            password2Reset.placeholder = 'Confirm password'
          }
        } catch (e) {
          console.log(e.message)
        }
      }
    }

    cancelButton.addEventListener('click', () => {
      alert('Cancelado');
      cancelButton.style.display = 'none';
      const ids = ['email', 'username', 'password', 'password2'];
      updateButton.innerText = 'Actualizar perfil';
      ids.forEach((id) => {
        const element = shadow.getElementById(id);
        element.disabled = true;
        element.classList.add("placeholder-gray-400");
      })
      const emailReset = shadow.getElementById('email');
      const usernameReset = shadow.getElementById('username');
      const passwordReset = shadow.getElementById('password');
      const password2Reset = shadow.getElementById('password2');
      emailReset.value = ""
      usernameReset.value = ""
      passwordReset.value = ""
      password2Reset.value = ""
      usernameReset.placeholder = 'Username'
      passwordReset.placeholder = 'Password'
      password2Reset.placeholder = 'Confirm password'
    })

    updateButton.addEventListener('click', () => {
      if (updateButton.innerText === 'Actualizar perfil') {
        actualizarPerfil();

      } else if (updateButton.innerText === 'Confirmar cambios') {
        confirmarCambios();
        const navbar = document.querySelector('navbar-comp')
        if(navbar){
          navbar.recibirImagen(this.#fotoPerfil)
        }
      }
    });
  }

  #editarImagen(shadow) {
    const contenedorBotones = shadow.getElementById('contenedorBotones');
    const buttons = contenedorBotones.querySelectorAll('.flex');
    const imagenPerfil = shadow.getElementById('imagenPerfil');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const url = button.querySelector('img').src;
        const nuevaUrl = url.replace('http://localhost:5173/', '');
        this.#fotoPerfil = nuevaUrl
        imagenPerfil.src = this.#fotoPerfil;
        console.log(this.#fotoPerfil)
        sessionStorage.getItem("id")
      });
    });
  }

}

customElements.define("perfil-comp", Perfil);