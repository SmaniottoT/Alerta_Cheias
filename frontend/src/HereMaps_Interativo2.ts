// ESTE DOCUMENTO FAZ ALTERAÇÕES NO MAPA PRINCIPAL

import { benchmark } from "./apiBenchmark";
import "@here/maps-api-for-javascript";
import { user } from "./apiUser";
import axios from "axios";

/**
 * Cria um marcador capaz de receber eventos DOM e adiciona-o ao mapa.
 *
 * @param  {H.Map} MapaZero      Uma instância do mapa HERE dentro da aplicação
 *
 */

// execução dos mapas fixos

function initMap(center: any, zoom: any, id: any) {
  var defaultLayers = platform.createDefaultLayers({
    // Cria camadas padrão usando a plataforma HERE Maps
    lg: "POR", // Define o idioma para Português
    static: true, // Adicione a opção static para remover o termo de uso
  } as any) as any;
  var mapa1 = document.getElementById("mapa1").firstElementChild;
  var mapa2 = document.getElementById("mapa2").firstElementChild;
  var mapa3 = document.getElementById("mapa3").firstElementChild;
  var mapId = "mapa1";
  if (mapa1 && mapa2 && mapa3) {
    window.alert(
      "Os três mapas estão selecionados. Exclua um mapa antes de adicionar seu próximo ponto de interesse. Ou assine nosso plano Premium para adicionar pontos de interesse ilimitados."
    );
    // colocar aqui um window alert para que a pessoa delete primeiro para depois add
  } else if (mapa1 && mapa2) {
    mapId = "mapa3";
  } else if (mapa1) {
    mapId = "mapa2";
  }

  document.getElementById(mapId).dataset.id = id;

  var map = new H.Map(
    document.getElementById(mapId), // Obtém o elemento HTML para o mapa
    defaultLayers.vector.normal.map, // Usa a camada normal do mapa
    {
      zoom: 16, // Define o nível de zoom inicial
      center: center, // Define o centro do mapa com base nas coordenadas fornecidas
    }
  );

  var marker = new H.map.Marker(center); // Adicionar um marcador ao mapa
  map.addObject(marker);
  window.addEventListener("resize", () => map.getViewPort().resize());
}

// Chamadas para inicializar mapa geral

async function addDomMarker(MapaZero: any) {
  var outerElement = document.createElement("div");

  outerElement.style.userSelect = "none";
  outerElement.style.webkitUserSelect = "none";
  outerElement.style.cursor = "default";

  // Criando o elemento SVG
  var innerElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  innerElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  innerElement.setAttribute("width", "40"); // Aumentando o tamanho para 32x32
  innerElement.setAttribute("height", "40"); // Aumentando o tamanho
  innerElement.setAttribute("fill", "rgba(75, 125, 176, 0.9)"); // Definindo a cor com RGBA
  innerElement.setAttribute("class", "bi bi-droplet-fill");
  innerElement.setAttribute("viewBox", "0 0 16 16");

  // Criando o elemento path dentro do SVG
  var pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"
  );
  pathElement.style.stroke = "rgba(43, 50, 76, 0.9)"; // Adicionando a cor da borda
  pathElement.style.strokeWidth = "1"; // Definindo a largura da borda

  // Adicionando o path ao SVG
  innerElement.appendChild(pathElement);

  // Adicionando o SVG ao elemento externo
  outerElement.appendChild(innerElement);

  // Estilizando o elemento externo
  outerElement.style.width = "32px"; // Definindo a largura para 32px
  outerElement.style.height = "32px"; // Definindo a altura para 32px
  outerElement.style.marginTop = "-16px"; // Ajustando a margem superior
  outerElement.style.marginLeft = "-16px"; // Ajustando a margem esquerda

  function changeOpacity(evt: any) {
    evt.target.style.opacity = 0.6;
  }

  function changeOpacityToOne(evt: any) {
    evt.target.style.opacity = 1;
  }

  // Cria ícone DOM e adiciona/remove ouvintes de opacidade
  var DOM_Icon = new H.map.DomIcon(outerElement, {
    // A função é chamada toda vez que o marcador entra na viewport
    onAttach: function (clonedElement: any, domIcon: any, domMarker: any) {
      clonedElement.addEventListener("mouseover", changeOpacity);
      clonedElement.addEventListener("mouseout", changeOpacityToOne);
    },
    // A função é chamada toda vez que o marcador sai da viewport
    onDetach: function (clonedElement: any, domIcon: any, domMarker: any) {
      clonedElement.removeEventListener("mouseover", changeOpacity);
      clonedElement.removeEventListener("mouseout", changeOpacityToOne);
    },
  });

  // GRUPO

  var group = new H.map.Group();

  map.addObject(group);

  // MARCADORES
  group.addEventListener(
    "tap",
    function (evt: any) {
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        // read custom data
        content: evt.target.getData().html,
      });
      // show info bubble
      ui.addBubble(bubble);

      const verificadores = document.getElementsByClassName("adicionarMapa");

      async function adicionarMapaClickHandler() {
        const token = localStorage.getItem("token");
        console.log(token);
        var mapa1 = document.getElementById("mapa1").firstElementChild;
        var mapa2 = document.getElementById("mapa2").firstElementChild;
        var mapa3 = document.getElementById("mapa3").firstElementChild;
        if (mapa1 && mapa2 && mapa3) {
          window.alert(
            "Os três mapas estão selecionados. Exclua um mapa antes de adicionar seu próximo ponto de interesse. Ou assine nosso plano Premium para adicionar pontos de interesse ilimitados."
          );
          return;
          // colocar aqui um window alert para que a pessoa delete primeiro para depois add
        } 
        const response = await axios.post(
          "http://localhost:3000/user/benchmarks",
          {
            benchmarkId: evt.target.getData().benchmarkId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        initMap(
          {
            lat: evt.target.getData().latitude,
            lng: evt.target.getData().longitude,
          },
          12,
          evt.target.getData().benchmarkId
        );
      }

      if (verificadores instanceof HTMLCollection) {
        for (let i = 0; i < verificadores.length; i++) {
          // Remove any existing click event listeners
          verificadores[i].removeEventListener(
            "click",
            adicionarMapaClickHandler
          );

          // Add a new click event listener with a unique identifier
          verificadores[i].addEventListener("click", adicionarMapaClickHandler);
        }
      }
    },
    false
  );

  const benchmarks = await benchmark.get("/benchmarks");

  benchmarks.data.forEach((benchmark: any) => {
    const street = benchmark.street;
    const floodLevel = benchmark.floodLevel;
    const latitude = benchmark.lat;
    const longitude = benchmark.long;

    const newBenchmark = new H.map.DomMarker(
      { lat: latitude, lng: longitude },
      {
        icon: DOM_Icon,
      } as any
    );
    newBenchmark.setData({
      html: `<div style="width: 250px">
      <button class="adicionarMapa">
      <img src="/Alerta_Cheias/frontend/assets/icones_main2/icon_add.png"> 
     </button>
     <h2>Rua: ${street}</h2>
     </br>
     <h3>Cota de enchente: ${floodLevel}m</h3>
     <p>Latitude: ${latitude}</p>
     <p>Longitude: ${longitude}</p>
     <div>

    </div>
    </div>`,
      latitude,
      longitude,
      benchmarkId: benchmark.id,
    });

    group.addObject(newBenchmark);
  });
}

/**
 * Código de inicialização do mapa começa abaixo:
 */

// Passo 1: inicializa a comunicação com a plataforma
// No seu próprio código, substitua a variável window.apikey pelo seu próprio apikey
var platform = new H.service.Platform({
  apikey: "OFV9bslywT8eoJN8RHd9n5sicXiLzMC-70-MY8BMXsM", // Nossa API KEY do HereMaps
});
var defaultLayers = platform.createDefaultLayers() as any;

// Passo 2: inicializa um mapa - este mapa está centrado sobre o centro Geografico do Brasil.
var map = new H.Map(
  document.getElementById("mapa0"),
  defaultLayers.vector.normal.map,
  {
    center: { lat: -26.821, lng: -49.2692 },
    zoom: 14,
    pixelRatio: window.devicePixelRatio || 1,
  }
);
// adicione um ouvinte de redimensionamento para garantir que o mapa ocupe todo o contêiner
window.addEventListener("resize", () => map.getViewPort().resize());

// Passo 3: torne o mapa interativo
// MapEvents habilita o sistema de eventos
// Behavior implementa interações padrão para pan/zoom (também em ambientes de toque móvel)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// create default UI with layers provided by the platform
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Agora use o mapa conforme necessário...
addDomMarker(map);

async function loadUserMaps() {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/user/benchmarks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  response.data.forEach((userBenchmark: any) => {
    initMap(
      {
        lat: userBenchmark.benchmark.lat,
        lng: userBenchmark.benchmark.long,
      },
      12,
      userBenchmark.benchmark.id
    );
  });
}

loadUserMaps();

async function removerMapa(id:any) {
  console.log(id);
  const mapa = document.getElementById(`mapa${id}`);
  const token = localStorage.getItem("token");
  const response = await axios.delete(`http://localhost:3000/user/benchmarks/${mapa.dataset.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  window.location.reload();
}

document.getElementById("Botao_Remover1").addEventListener("click", () => removerMapa(1));
document.getElementById("Botao_Remover2").addEventListener("click", () => removerMapa(2));
document.getElementById("Botao_Remover3").addEventListener("click", () => removerMapa(3));