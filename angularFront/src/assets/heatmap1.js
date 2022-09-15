var heatMap;
heatMapInit = () => {

    var x = document.getElementById("heatMap");
    x.style.display = "none";

    baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: ''
    })
    addToHeatMap();
}

function addToHeatMap(){

  var testData = {
    max: 10,
    data: [{lat:55.71749468901508, lng: 21.093907237416836, count: 1},{lat: 55.717388383340236,lng:21.09394099113328, count: 5},
      {lat: 55.71739056705315, lng: 21.093900112767855, count: 7},{lat: 55.717759828018176, lng: 21.093934472807614, count: 6},
      {lat: 55.7172574820674, lng:21.093959234402433, count: 4},
      {lat: 55.71753562797628, lng:21.093965255810968, count: 9}]
  };
  var cfg = {
    "radius": 0.0001,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // "useLocalExtrema": true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  };

  var heatmapLayer = new HeatmapOverlay(cfg);

  heatMap = new L.Map('heatMap', {
    center: new L.LatLng(55.71526412660462, 21.098053501450323),
    zoom: 15,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.setData(testData);

}


function heatMapDisappear(){
    var x = document.getElementById("heatMap");
    var y = document.getElementById("heatmapbutton");

    x.style.display = "none";
    y.style.display = "block";
}
function heatMapAppear(){
    var x = document.getElementById("heatMap");
    var y = document.getElementById("heatmapbutton");

    x.style.display = "block";
    y.style.display = "none";

    leafletMapDisappear();
    sliderDisappear();
    windyMapDisappear();
    leafletMapDisappear();
}
