var mapLea;
var baseLayer;
var addMarker = this;
var addLocationtoMap = this;
var trackArray = [];
var lidarDataArray = [];

leafletMapInit = () => {
    if(!mapLea){
        var y = document.getElementById("leafletbutton");
        y.style.display = "none";
        mapLea = L.map('mapLea').setView([55.678042, 21.145089], 15);
        baseLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: ''
        }).addTo(mapLea);
    }
}

let LastGPSArray =[];

function addLocationLea(LocationObject){
    mapLea.removeLayer(addMarker);
    addMarker = L.marker([LocationObject.lat,LocationObject.lng]).addTo(mapLea);
    // mapLea.panTo(new L.LatLng(LocationObject.lat,LocationObject.lng));
}

const ColorArray = ['green', 'red', 'blue', 'white', 'yellow', 'pink', 'burlywood', 'cyan', 'purple', 'brown'];

const getColor = (index) => {
    return ColorArray[index % ColorArray.length];
}

function addTrack(LocationObject){
    LastGPSArray = LocationObject;
    let PathsBasedOnSession = [];
    let SinglePathArray = [];
    for(let i =0 ; i<LocationObject.length; i++)
    {
        let LatLong = [LocationObject[i].lat,LocationObject[i].lng]
        if(SinglePathArray.length == 0) {
            SinglePathArray.push(LatLong)
            continue;
        }

        if(LocationObject[i].SessionID == LocationObject[i-1].SessionID){
            SinglePathArray.push(LatLong);
        }
        else{
            PathsBasedOnSession.push(SinglePathArray);
            SinglePathArray = [];
            SinglePathArray.push(LatLong);
        }

    }
    PathsBasedOnSession.push(SinglePathArray);

    for(let i = 0; i < PathsBasedOnSession.length; i++){
        let polyline = L.polyline(PathsBasedOnSession[i], {color: getColor(i)}).bindPopup('...').addTo(mapLea);
        polyline.on('popupopen', function (e) {
            var popup = e.popup;
            popup.setContent('Coordinates: ' +  popup.getLatLng().lat + ' / ' + popup.getLatLng().lng);
            let time = getCreatedBasedOnCoords(getClosestCoords(popup.getLatLng(), popup._source._latlngs));
            console.log(getCreatedBasedOnCoords(getClosestCoords(popup.getLatLng(), popup._source._latlngs)));
            getFlask(time,
                (LidarObject)=>
                {lidarToDots(LidarObject, getClosestCoords(popup.getLatLng(), popup._source._latlngs))}
                );
            });
    }
}

function lidarToDots(LidarValues,coords){

    lidarDataArray = JSON.parse(LidarValues.Lidar);
    console.log(lidarDataArray);
    let LidarLocations =[];
    for(var i=0; i<360; i++){
        if(lidarDataArray[i] > 0){
            let LidarLat = getLidarLat(coords.lat,lidarDataArray[i],i);
            let LidarLng = getLidarLng(coords.lng,lidarDataArray[i],i);
            LidarLocations.push([LidarLat,LidarLng]);
            LidarLocations.push([LidarLat,LidarLng]);
            L.polyline(LidarLocations, { color: 'black'}).addTo(mapLea);
            LidarLocations = [];
        }
    }

}

function getTimeArray(timeObject){
    let coordinates = [];
    for(var i=0; i<=timeObject.length; i++){
        coordinates.push([timeObject[i].lat,timeObject[i].lng])
        getFlask(timeObject[i].Created,
            (LidarObject)=>
            {lidarToDots(LidarObject, coordinates)}
            );
        coordinates = [];
    }
}


function getFlask(time, callback){
    fetch('http://localhost:5000/date_time?date='+time)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            callback(data[0]);
        })
}


function leafletMapDisappear(){
    var x = document.getElementById("mapLea");
    var y = document.getElementById("leafletbutton");

    x.style.display = "none";
    y.style.display = "block";
}
function leafletMapAppear(){
    var x = document.getElementById("mapLea");
    var y = document.getElementById("leafletbutton");

    x.style.display = "block";
    y.style.display = "none";

    lidarChartDisappear();
    windyMapDisappear();
    heatMapDisappear();
    sliderDisappear();
}

