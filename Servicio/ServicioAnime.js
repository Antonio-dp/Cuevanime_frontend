export class ServicioAnime {
  #urlService = "http://localhost:3000/api/";
  #urlAnimes = this.#urlService + "animes/";
  #urlCapitulos = this.#urlService + "mediaContents/";
  #urlUsuarios = this.#urlService + "usuarios/";
  #urlTemporadas = this.#urlService + "temporadas/";

  async login(usuario) {
    let response = await fetch(this.#urlUsuarios + "login", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json"
      },
    });
    let {user:json} = await response.json();
    console.log(json);
    sessionStorage.setItem('id', json._id)
    sessionStorage.setItem('nickname', json.nickname)
    sessionStorage.setItem('email', json.email)
    sessionStorage.setItem('imagen', json.imagen)
    sessionStorage.setItem('suscrito', json.idSuscripcion)
    return json;
  }

  async UpdateUser(usuario) {
    let response = await fetch(this.#urlUsuarios + `${sessionStorage.getItem('id')}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let {user:json} = await response.json();
    console.log(json)
    sessionStorage.setItem('nickname', json.nickname)
    sessionStorage.setItem('email', json.email)
    sessionStorage.setItem('imagen', json.imagen)
    return json;
  }

  async registro(usuario) {
    let response = await fetch(this.#urlUsuarios , {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    return json;
  }

  async suscribirUser(usuario) {
    usuario.idSuscripcion = '1'
    let response = await fetch(this.#urlUsuarios + "suscripcion/" +`${sessionStorage.getItem('id')}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let {user:json} = await response.json();
    console.log(json)
    sessionStorage.setItem('nickname', json.nickname)
    sessionStorage.setItem('email', json.email)
    sessionStorage.setItem('imagen', json.imagen)
    sessionStorage.setItem('suscrito', json.idSuscripcion)
    return json;
  }

  async obtenerUsuario(idUsuario){
    let response = await fetch(this.#urlUsuarios + idUsuario, {});
    let json = await response.json();
    return json;
  }

  async obtenerAnimes() {
    let response = await fetch(this.#urlAnimes, {});
    let json = await response.json();
    return json;
  }

  async obtenerAnime(idAnime) {
    let response = await fetch(this.#urlAnimes + idAnime, {});
    let json = await response.json();
    return json;
  }

  async obtenerCapitulos(idAnime) {
    let response = await fetch(this.#urlCapitulos + "/anime/" + idAnime, {});
    let json = await response.json();
    return json;
  }

  async obtenerCapitulo(idCapitulo) {
    let response = await fetch(this.#urlCapitulos + idCapitulo, {});
    let json = await response.json();
    return json;
  }

  async obtenerTemporadas() {
    let response = await fetch(this.#urlTemporadas, {});
    let json = await response.json();
    return json;
  }
}
