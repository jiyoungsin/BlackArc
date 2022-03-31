


// initialize Leaflet
var map = L.map('map').setView([50.5, 30.5], 10);


L.geoJson()
// add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(map);

// show the scale bar on the lower left corner
L.control.scale({imperial: true, metric: true}).addTo(map);

const data = {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands",
    "description": "fooooo",
  },
};
L.geoJSON(data, {
  style: function (feature) {
      return {color: feature.properties.color};
  }
}).bindPopup(function (layer) {
  return layer.feature.properties.description;
}).addTo(map);


// show a marker on the map
L.marker([50.5, 30.5],{
  draggable : true,
  riseOnHover : true,
  title: "hover title",
}).bindPopup('The center of the world').addTo(map);
const ourCircle = L.circle([50.5, 30.5], {radius: 20000, color: "red", weight: 50}).addTo(map);

ourCircle.on('click',function (e) {
  console.log("GHEGERRERE")
  ourCircle.setLatLng([51.5, 31.5]);
});