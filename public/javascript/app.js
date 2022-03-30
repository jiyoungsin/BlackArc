// import Map from 'ol/Map';
// import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
let map;
function initialize_map() {
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
          source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([-79.52,43.70]),
      zoom: 12
    })
  });
};

function add_map_point(lat, lng) {
  var vectorLayer = new ol.layer.Vector({
    source:new ol.source.Vector({
      features: [new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([parseFloat(-79.52), parseFloat(43.70)], 'EPSG:4326', 'EPSG:3857')),
        })]
    }),
    style: new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 0.5],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        src: "https://upload.wikimedia.org/wikipedia/commons/e/ec/RedDot.svg"
      })
    })
  });
  map.addLayer(vectorLayer); 
}