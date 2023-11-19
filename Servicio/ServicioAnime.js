export class ServicioAnime {
  #urlService = "http://localhost:3000/api/";
  #urlAnimes = this.#urlService + "animes/";
  #urlCapitulos = this.#urlService + "mediaContents/";

  async obtenerAnimes() {
    let response = await fetch(this.#urlAnimes, {
      headers: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IkNhcmxvcyIsImlhdCI6MTY5OTczNTExNywiZXhwIjoxNjk5NzM4NzE3fQ.E0ROPlSx78r3kQEvaygVn9tu-F_9eouOPBdyfm1IOfQ`,
      },
    });
    let json = await response.json();
    return json;
  }

  async obtenerCapitulos(idAnime) {
    let response = await fetch(this.#urlCapitulos + idAnime, {
      headers: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6IkNhcmxvcyIsImlhdCI6MTY5OTczNTExNywiZXhwIjoxNjk5NzM4NzE3fQ.E0ROPlSx78r3kQEvaygVn9tu-F_9eouOPBdyfm1IOfQ`,
      },
    });
    let json = await response.json();
    return json;
  }
}
