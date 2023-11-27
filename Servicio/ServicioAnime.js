export class ServicioAnime {
  #urlService = "http://localhost:3000/api/";
  #urlAnimes = this.#urlService + "animes/";
  #urlCapitulos = this.#urlService + "mediaContents/";
  #urlUsuarios = this.#urlService + "usuarios/";

  async login(usuario) {
    let response = await fetch(this.#urlUsuarios + "login", {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
}
