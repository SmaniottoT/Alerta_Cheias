
import "@here/maps-api-for-javascript";

// ESTE DOCUMENTO FAZ ALTERAÇÕES NOS 4 MAPAS SUPERIORES 

// Cria uma nova instancia da plataforma HereMaps 
var platform = new H.service.Platform({
    'apikey': 'OFV9bslywT8eoJN8RHd9n5sicXiLzMC-70-MY8BMXsM'  // Nossa API KEY do HereMaps
});

function initMap(mapId: any, center: any, zoom: any) {
    var defaultLayers = platform.createDefaultLayers({ // Cria camadas padrão usando a plataforma HERE Maps
        lg: 'POR',   // Define o idioma para Português
        static: true // Adicione a opção static para remover o termo de uso
    } as any) as any;

    var map = new H.Map(
        document.getElementById(mapId),  // Obtém o elemento HTML para o mapa
        defaultLayers.vector.normal.map, // Usa a camada normal do mapa
        {
            zoom: 16,  // Define o nível de zoom inicial
            center: center  // Define o centro do mapa com base nas coordenadas fornecidas
        },
    );

    var marker = new H.map.Marker(center);   // Adicionar um marcador ao mapa
    map.addObject(marker);
    window.addEventListener('resize', () => map.getViewPort().resize());
}

// Chamadas para inicializar cada mapa

initMap('mapa1', { lat: -26.834362812206653, lng: -49.284916286293544 }, 12);
initMap('mapa2', { lat: -26.819828898022735, lng: -49.27276907398615 }, 12);
initMap('mapa3', { lat: -26.819570490416126, lng: -49.27809137815955 }, 12);

