import "../components/Navbar/navbar.js";
import "../components/Footer/footer.js";
import "../components/Catalogo/catalogo.js";
import "../components/PeliculaCards/peliculacards.js";
import "../components/Card-Carousel/cardCarousel.js";
import "../components/Banner/banner.js";
import "../components/Carousel/carousel.js";
import "../components/Banner/animebackground.js";
import "../components/MediaInfo/mediainfo.js";
import "../components/Filter/filter.js";
import "../components/VideoPlayer/videoPlayer.js";
import "../components/PlanPago/planpago.js";
import "../components/Login/Login.js"
import "../components/Signup/Signup.js"
import page from "page";
page("/", async () => {
  const response = await fetch("/pages/Home.html");
  const html = await response.text();
  document.getElementById("main").innerHTML = html;
});

page("/login", async () => {
  const response = await fetch("/pages/login.html");
  const html = await response.text();
  document.getElementById("main").innerHTML = html;
})

page("/signup", async () => {
  const response = await fetch("/pages/Signup.html");
  const html = await response.text();
  document.getElementById("main").innerHTML = html;
})

page("/catalogo", async () => {
  const response = await fetch("/pages/CatalogoPrincipal.html");
  const html = await response.text();
  document.getElementById("main").innerHTML = html;
});

page("/anime/:id", async (context) => {
  try {
    const response = await fetch("/pages/MediaContent.html");
    const html = await response.text();
    document.getElementById("main").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
});

page("/watch/:id", async () => {
  try {
    const response = await fetch("/pages/Reproductor.html");
    const html = await response.text();
    document.getElementById("main").innerHTML = html;
  } catch (error) {
    console.log(error);
  }
});
page("*", async () => {
  document.getElementById("main").innerHTML = "no se encontro la ruta";
});

page();
