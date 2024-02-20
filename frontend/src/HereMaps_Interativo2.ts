// ESTE DOCUMENTO FAZ ALTERAÇÕES NO MAPA PRINCIPAL

import { benchmark } from "./apiBenchmark";
import "@here/maps-api-for-javascript";

/**
 * Cria um marcador capaz de receber eventos DOM e adiciona-o ao mapa.
 *
 * @param  {H.Map} MapaZero      Uma instância do mapa HERE dentro da aplicação
 *
 */
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

  //   function addMarkerToGroup(group: any, coordinate: any, html: any) {
  //     var marker = new H.map.Marker(coordinate);
  //     // add custom data to the marker
  //     marker.setData(html);
  //     group.addObject(marker);
  //   }

  //   /**
  //    * Add two markers showing the position of Liverpool and Manchester City football clubs.
  //    * Clicking on a marker opens an infobubble which holds HTML content related to the marker.
  //    * @param {H.Map} map A HERE Map instance within the application
  //    */
  //   function addInfoBubble(map) {
  //     var group = new H.map.Group();

  //     map.addObject(group);

  //     // add 'tap' event listener, that opens info bubble, to the group
  //     group.addEventListener('tap', function (evt: any) {
  //       // event target is the marker itself, group is a parent event target
  //       // for all objects that it contains
  //       var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
  //         // read custom data
  //         content: evt.target.getData()
  //       });
  //       // show info bubble
  //       ui.addBubble(bubble);
  //     }, false);

  //     addMarkerToGroup(group, {lat: 53.439, lng: -2.221},
  //       '<div><a href="https://www.mcfc.co.uk" target="_blank">Manchester City</a></div>' +
  //       '<div>City of Manchester Stadium<br />Capacity: 55,097</div>');

  //     addMarkerToGroup(group, {lat: 53.430, lng: -2.961},
  //       '<div><a href="https://www.liverpoolfc.tv" target="_blank">Liverpool</a></div>' +
  //       '<div>Anfield<br />Capacity: 54,074</div>');
  //   }

// GRUPO

var group = new H.map.Group();

  map.addObject(group);


  // MARCADORES
  group.addEventListener(
    "tap",
    function (evt: any) {
        console.log(evt.target.getData());
        
      // event target is the marker itself, group is a parent event target
      // for all objects that it contains
      var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
        // read custom data
        content: evt.target.getData(),
      });
      // show info bubble
      ui.addBubble(bubble);
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
    newBenchmark.setData(
     `<div style="width: 250px"><h2>Rua: ${street}</h2></br><h3>Cota de enchente: ${floodLevel}m</h3><p>Latitude: ${latitude}</p><p>Longitude: ${longitude}</p><div>COLOCAR BOTÕES AQUI</div></div>`
    );
    group.addObject(newBenchmark);
  });

  // var MarechalFlorianoPeixoto_1056 = new H.map.DomMarker(
  //   { lat: -26.82806, lng: -49.28573 },
  //   {
  //     icon: DOM_Icon,
  //   }
  // );
  // MapaZero.addObject(MarechalFlorianoPeixoto_1056);

  // var Esquina_Haiti_BarãoDoRioBranco = new H.map.DomMarker(
  //   { lat: -26.81929, lng: -49.26677 },
  //   {
  //     icon: DOM_Icon,
  //   }
  // );
  // MapaZero.addObject(Esquina_Haiti_BarãoDoRioBranco);
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

// initMap('mapa0', { lat: -26.834362812206653, lng: -49.284916286293544 }, 12);
