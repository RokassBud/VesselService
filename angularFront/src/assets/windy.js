const options = {
    key:'',
    lat: 55.674057082209714,
    lon: 21.163686662512095,
    zoom: 8,
  }

var data;

  windyInit(options, windyAPI => {
    var x = document.getElementById("windy");
    x.style.display = "none";
});



function windyMapDisappear(){
    var x = document.getElementById("windy");
    var y = document.getElementById("windybutton");
    document.getElementsByTagName("link")[1].disabled = false;

    x.style.display = "none";
    y.style.display = "block";
}
function windyMapAppear(){
    var x = document.getElementById("windy");
    var y = document.getElementById("windybutton");
    document.getElementsByTagName("link")[1].disabled = true;
    x.style.display = "block";
    y.style.display = "none";

    leafletMapDisappear();
    heatMapDisappear();
    lidarChartDisappear();
    sliderDisappear();
}
