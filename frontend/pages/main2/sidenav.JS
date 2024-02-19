var sideNavAberta = false;

function mudarSideNav() {
  // ESSE É O QUE FECHA
  if (sideNavAberta) {

    // Tamanho da caixa side-nav (DIMINUI)
    var elemento0 = document.querySelector("#side-nav");
    elemento0.style.width = "110px";

    // Esconde o texto do usuario
    var elemento01 = document.querySelector("#side-nav #user #div");
    elemento01.style.display = "none";

    // Esconde Box do usuario e tira efeitos
    var elemento02 = document.querySelector("#side-nav #user");
    elemento02.style.width = "80px";
    elemento02.style.background = "none";
    elemento02.style.backdropFilter = "none";

    //Esconde o icone Premium quando fechar a SideNav
    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "none";

    //Ajusta  a margin quando fechado
    var elemento04 = document.querySelector("#side-nav #user-img");
    elemento04.style.margin = "auto";

    //Esconde Textos dos mapas
    var elemento05 = document.querySelectorAll("#side-nav ul li p");
    elemento05.forEach(function (paragrafo) {
      paragrafo.style.display = "none";
    });

    // Ajusta margem da imagem
    var elemento06 = document.querySelectorAll("#side-nav ul li img");
    elemento06.forEach(function (imagem) {
      imagem.style.marginRight = "0px";
    });

    //Ajusta as linhas
    var elemento07 = document.querySelectorAll("#side-nav ul li");
    elemento07.forEach(function (linha) {
      linha.style.justifyContent = "unset";
    });

    // Esconde os mapas quando fechar
    var elemento08 = document.querySelectorAll(".mapas .map-container");
    elemento08.forEach(function (mapas) {
      mapas.style.display = "none";
    });


    // Mostra os icones do mapa quando fechar
    var elemento09 = document.querySelectorAll(".icones");
    elemento09.forEach(function (iconeMapas) {
      iconeMapas.style.display = "block";
      iconeMapas.style.margin = "65px 0px";
    });



    sideNavAberta = false; // Alterando o estado para fechado
    document.getElementById('abrir').classList.remove('open')

    // ESSE É O QUE ABRE
  } else {
    // Tamanho da caixa side-nav (AUMENTA)
    var elemento0 = document.querySelector("#side-nav");
    elemento0.style.width = "325px";

    // Mostra o texto do usuario
    var elemento01 = document.querySelector("#side-nav #user #div");
    elemento01.style.display = "block";

    // Mostra Box do usuario e tira efeitos
    var elemento02 = document.querySelector("#side-nav #user");
    elemento02.style.width = "100%";
    elemento02.style.background = "rgba(57, 107, 153, 0.2)";
    elemento02.style.backdropFilter = "blur(5px)";

    //Mostra o icone Premium quando abrir a SideNav
    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "block";

    //Ajusta  a margin quando abrir
    var elemento04 = document.querySelector("#side-nav #user-img");
    elemento04.style.margin = "0";

    //Mostra Textos dos mapas
    var elemento05 = document.querySelectorAll("#side-nav ul li p");
    elemento05.forEach(function (paragrafo) {
      paragrafo.style.display = "block";
    });

    // Ajusta margem da imagem
    var elemento06 = document.querySelectorAll("#side-nav ul li img");
    elemento06.forEach(function (imagem) {
      imagem.style.marginRight = "10px";
    });
    //Ajusta as linhas
    var elemento07 = document.querySelectorAll("#side-nav ul li");
    elemento07.forEach(function (linha) {
      linha.style.justifyContent = "flex-start";
    });

    // Mostra os mapas quando abrir
    var elemento08 = document.querySelectorAll(".mapas .map-container");
    elemento08.forEach(function (mapas) {
      mapas.style.display = "block";
      mapas.style.width = "100%";
    });

    //Esconde os icones do mapa quando abrir
    var elemento09 = document.querySelectorAll(".icones");
    elemento09.forEach(function (iconeMapas) {
      iconeMapas.style.display = "none";
    });



    
    // UL MAPAS E CONFIGURAÇÕES
    var elemento10 = document.querySelectorAll("ul");
    elemento10.forEach(function (mapas) {
      mapas.style.display = "block";
    });
    // UL MAPAS E CONFIGURAÇÕES
    var elemento11 = document.querySelectorAll(".Configuracoes");
    elemento11.forEach(function (config) {
      config.style.flexDirection = "row";
      config.style.display = "flex";

    });




    sideNavAberta = true; // Alterando o estado para aberto
    document.getElementById('abrir').classList.add('open')
  }
}
