export class Perfil extends HTMLElement {
  constructor() {
    super();
    // const shadow = this.attachShadow({ mode: 'open' })
    // shadow.appendChild(template.content.cloneNode(true))
  }

  async #render(shadow) {
    fetch("./../assets/Perfil.html")
      .then((response) => response.text())
      .then((html) => {
        shadow.innerHTML += html;
        this.#editarPerfil(shadow)
        this.#editarImagen(shadow)
      })
      .catch((error) => console.error("error loading HTML: " + error));
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);

  }

  #editarPerfil(shadow) {
    const updateButton = shadow.getElementById('updateButton');
    const cancelButton = shadow.getElementById('cancelButton');

    function actualizarPerfil() {
      const ids = ['username', 'password', 'password2'];
      updateButton.innerText = 'Confirmar cambios';
      cancelButton.style.display = 'inline-block';
      ids.forEach((id) => {
        const element = shadow.getElementById(id);
        element.disabled = false;

      });
    }

    function confirmarCambios() {
      const ids = ['username', 'password', 'password2'];
      const usernameInput = shadow.getElementById('username');
      const passwordInput = shadow.getElementById('password');
      const password2Input = shadow.getElementById('password2');
      const passwordValue = passwordInput.value;
      const password2Value = password2Input.value;
      const usernameValue = usernameInput.value;


      if (passwordValue !== password2Value) {
        alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      } else if (passwordValue === password2Value && passwordValue != "" || usernameValue!="") {
        cancelButton.style.display = 'none';
        updateButton.innerText = 'Actualizar perfil';
        ids.forEach((id) => {
          const element = shadow.getElementById(id);
          element.disabled = true;
        })
        const usernameReset = shadow.getElementById('username');
        const passwordReset = shadow.getElementById('password');
        const password2Reset = shadow.getElementById('password2');
        usernameReset.value=""
        passwordReset.value=""
        password2Reset.value=""
        usernameReset.placeholder= 'Username'
        passwordReset.placeholder = 'Password'
        password2Reset.placeholder= 'Confirm password'
        alert('Perfil actualizado con éxito');
      } 
    }

    cancelButton.addEventListener('click', () => {
      alert('Cancelado');
      cancelButton.style.display = 'none';
      const ids = ['username', 'password', 'password2'];
      updateButton.innerText = 'Actualizar perfil';
      ids.forEach((id) => {
        const element = shadow.getElementById(id);
        element.disabled = true;
        element.classList.add("placeholder-gray-400");
      })
      const usernameReset = shadow.getElementById('username');
        const passwordReset = shadow.getElementById('password');
        const password2Reset = shadow.getElementById('password2');
        usernameReset.value=""
        passwordReset.value=""
        password2Reset.value=""
        usernameReset.placeholder= 'Username'
        passwordReset.placeholder = 'Password'
        password2Reset.placeholder= 'Confirm password'
    })

    updateButton.addEventListener('click', () => {
      if (updateButton.innerText === 'Actualizar perfil') {
        actualizarPerfil();

      } else if (updateButton.innerText === 'Confirmar cambios') {
        confirmarCambios();
      }
    });
  }

  #editarImagen(shadow) {
    const contenedorBotones = shadow.getElementById('contenedorBotones');
    const buttons = contenedorBotones.querySelectorAll('.flex');
    const imagenPerfil = shadow.getElementById('imagenPerfil');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const newImageSrc = button.querySelector('img').src;
        imagenPerfil.src = newImageSrc;
      });
    });
  }

}

customElements.define("perfil-comp", Perfil);