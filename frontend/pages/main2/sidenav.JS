var sideNavAberta = false;

function mudarSideNav() {
  // ESSE É O QUE FECHA
  if (sideNavAberta) {
    // Tamanho da caixa side-nav
    var elemento0 = document.querySelector("#side-nav");
    elemento0.style.width = "110px";

    // Display
    var elemento01 = document.querySelector("#side-nav #user #div");
    elemento01.style.display = "none";

    var elemento02 = document.querySelector("#side-nav #user");
    elemento02.style.width = "80px";
    elemento02.style.background = "none";
    elemento02.style.backdropFilter = "none";

    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "none";

    var elemento04 = document.querySelector("#side-nav #user-img");
    elemento04.style.margin = "auto";

    var elemento05 = document.querySelectorAll("#side-nav ul li p");
    elemento05.forEach(function (paragrafo) {
      paragrafo.style.display = "none";
    });

    var elemento06 = document.querySelectorAll("#side-nav ul li img");
    elemento06.forEach(function (imagem) {
      imagem.style.marginRight = "0px";
    });

    var elemento07 = document.querySelectorAll("#side-nav ul li");
    elemento07.forEach(function (linha) {
      linha.style.justifyContent = "unset";
    });

    // MAPAS
    var elemento08 = document.querySelectorAll(".mapas .map-container");
    elemento08.forEach(function (mapas) {
      mapas.style.display = "none";
    });


    // ICONE MAPAS
    var elemento09 = document.querySelectorAll(".icones");
    elemento09.forEach(function (iconeMapas) {
      iconeMapas.style.display = "block";
      iconeMapas.style.margin = "65px 0px";
    });

   

    sideNavAberta = false; // Alterando o estado para fechado
    document.getElementById('abrir').classList.remove('open')

    // ESSE É O QUE ABRE
  } else {
    // Tamanho da caixa side-nav
    var elemento0 = document.querySelector("#side-nav");
    elemento0.style.width = "300px";

    // Display
    var elemento01 = document.querySelector("#side-nav #user #div");
    elemento01.style.display = "block";

    var elemento02 = document.querySelector("#side-nav #user");
    elemento02.style.width = "100%";
    elemento02.style.background = "rgba(57, 107, 153, 0.2)";
    elemento02.style.backdropFilter = "blur(5px)";

    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "block";

    var elemento04 = document.querySelector("#side-nav #user-img");
    elemento04.style.margin = "0";

    var elemento05 = document.querySelectorAll("#side-nav ul li p");
    elemento05.forEach(function (paragrafo) {
      paragrafo.style.display = "block";
    });

    var elemento06 = document.querySelectorAll("#side-nav ul li img");
    elemento06.forEach(function (imagem) {
      imagem.style.marginRight = "10px";
    });

    var elemento07 = document.querySelectorAll("#side-nav ul li");
    elemento07.forEach(function (linha) {
      linha.style.justifyContent = "flex-start";
    });

    // MAPAS
    var elemento08 = document.querySelectorAll(".mapas .map-container");
    elemento08.forEach(function (mapas) {
      mapas.style.display = "block";
    });


    // ICONE MAPAS
    var elemento09 = document.querySelectorAll(".icones");
    elemento09.forEach(function (iconeMapas) {
      iconeMapas.style.display = "none";
    });

    // MAPA E ICONES CENTRALIZAR
    var elemento10 = document.querySelectorAll("ul");
    elemento10.forEach(function (mapas) {
      mapas.style.display = "block";
    });


    sideNavAberta = true; // Alterando o estado para aberto
    document.getElementById('abrir').classList.add('open')
  }
}
