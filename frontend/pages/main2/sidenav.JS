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
    elemento02.style.marginBottom = "155px";


    //Esconde o icone Premium quando fechar a SideNav
    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "none";

    //Ajusta  a margin quando fechado
    var elemento04 = document.querySelector("#side-nav #userPhoto");
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

    //Diminuir margin dos icones ao fechar
    var elemento10 = document.querySelectorAll(".icones");
    elemento10.forEach(function (icone) {
      icone.style.margin = "30px 0px";
    });

    //Remove a visualização do icone Logo
    var elemento11 = document.querySelectorAll("#Logo");
    elemento11.forEach(function (LogoIcone) {
      LogoIcone.style.display = "none";
      LogoIcone.style.width = "0px";
      LogoIcone.style.height = "0px";
    });

    //Aumenta o tamanho do mapa quando aberto
    var elemento13 = document.querySelectorAll(".mapas");
    elemento13.forEach(function (ListaMapas) {
      ListaMapas.style.width = "0px";
      ListaMapas.style.height = "0px";
    });

    //Remover visualização dos icones de Alerta
    var elemento14 = document.querySelectorAll("#Box_BotoesMapas");
    elemento14.forEach(function (BoxBotoes) {
      BoxBotoes.style.display = "none";
    });

    //Ajustar #abrir
    var elemento14 = document.querySelectorAll("#abrir");
    elemento14.forEach(function (AbrirSideNav) {
      AbrirSideNav.style.marginLeft = "24px";
    });



    sideNavAberta = false; // Alterando o estado para fechado
    document.getElementById("abrir").classList.remove("open");

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
    elemento02.style.height = "100px";
    elemento02.style.background = "rgba(57, 107, 153, 0.2)";
    elemento02.style.backdropFilter = "blur(5px)";
    elemento02.style.marginBottom = "0px";

    //Mostra o icone Premium quando abrir a SideNav
    var elemento03 = document.querySelector("#side-nav #Premium");
    elemento03.style.display = "block";

    //Ajusta  a margin quando abrir
    var elemento04 = document.querySelector("#side-nav #userPhoto");
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

    //Alinhar itens da Lista Configurações
    var elemento11 = document.querySelectorAll(".Configuracoes");
    elemento11.forEach(function (config) {
      config.style.width = "100%";
      config.style.display = "flex";
      config.style.flexDirection = "row";

    });


    //Centralizar itens da #ListaMapas
    var elemento12 = document.querySelectorAll("#ListaMapas");
    elemento12.forEach(function (ListaMapas) {
      ListaMapas.style.display = "flex";
      ListaMapas.style.flexDirection = "column";
    });

    //Aumenta o tamanho do mapa quando aberto
    var elemento13 = document.querySelectorAll(".mapas");
    elemento13.forEach(function (ListaMapas) {
      ListaMapas.style.width = "100%";
      ListaMapas.style.height = "100%";
    });

    //Alinhar Itens  #ListaConfiguracoes
    var elemento14 = document.querySelectorAll("#ListaConfiguracoes");
    elemento14.forEach(function (ListaConfig) {
      ListaConfig.style.display = "flex";
      ListaConfig.style.flexDirection = "column";
      ListaConfig.style.paddingBottom  = "15px";
    });



    //Alinhar itens da Lista Configurações
    var elemento15 = document.querySelectorAll(".LiConfig");
    elemento15.forEach(function (LiConfig) {
      LiConfig.style.width = "100%";
      LiConfig.style.margin = "5px 0px";
    });



    //Adiciona a visualização do icone Logo
    var elemento16 = document.querySelectorAll("#Logo");
    elemento16.forEach(function (LogoIcone) {
      LogoIcone.style.display = "block";
      LogoIcone.style.width = "110px";
      LogoIcone.style.height = "65px";

      LogoIcone.style.marginLeft = "95px";
    });

    //Alinha Div Botao
    var elemento17 = document.querySelectorAll("#Div_Botao");
    elemento17.forEach(function (LogoIcone) {
      LogoIcone.style.display = "flex";
      LogoIcone.style.flexDirection = "row";
      LogoIcone.style.justifyContent = "space-between";
      LogoIcone.style.alignItems = "center";
    });

    //Adiciona visualização dos icones de Alerta
    var elemento18 = document.querySelectorAll("#Box_BotoesMapas");
    elemento18.forEach(function (BoxBotoes) {
      BoxBotoes.style.display = "flex";
    });

    //Mantem inativo a visualização dos icones de Alerta
    var elemento19 = document.querySelectorAll(".Div_Alerta");
    elemento19.forEach(function (alerta) {
      alerta.style.display = "none";
    });



    sideNavAberta = true; // Alterando o estado para aberto
    document.getElementById("abrir").classList.add("open");
  }
}
