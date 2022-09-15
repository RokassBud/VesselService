function getLidarLat(lat,distance,radius)
{
    differencesbetweenx = distance*Math.cos(getRadians(radius));
    latitude = lat + differencesbetweenx/11100000;
    return latitude;
}
function getLidarLng(lng,distance,radius)
{
    differencesbetweeny = distance*Math.sin(getRadians(radius));
    longitude = lng + differencesbetweeny/11132100;
    return longitude;
}

function getRadians(angle){
    return (Math.PI * angle) / 180
}

function getApproximatedDistanceNumber(lat1, lng1, lat2, lng2){
    return (lat1-lat2)^2 + (lng1-lng2)^2;
}


function getClosestCoords(coord, coordArray){
    let index = 0;
    let shortest = getApproximatedDistanceNumber(coord.lat, coord.lng, coordArray[0].lat, coordArray[0].lng);
    
    for(let i=1; i< coordArray.length; i++){
        let distance = getApproximatedDistanceNumber(coord.lat, coord.lng, coordArray[i].lat, coordArray[i].lng);
        if(shortest > distance) {
            shortest = distance;
            index = i;
        }
    }

    return coordArray[index];
}

function getCreatedBasedOnCoords(coords){
    return LastGPSArray.find(GPS => GPS.lat = coords.lat && GPS.lng == coords.lng).Created;
}