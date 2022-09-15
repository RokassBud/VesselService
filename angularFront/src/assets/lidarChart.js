
var lidarChartElement; 
var LidarChart;

function lidarInit(){
    x = document.getElementById("lidarDiv");
    x.style.display = "none";
    lidarChartElement = document.getElementById("lidarChart");

    var labelArray = [];

    for(var i =0; i< 360;i++){
        if(i%10 !=0) labelArray.push('');
        else labelArray.push(i + '°');
    }

    var dataArray = []

    for(var i =0; i<360; i++){
        dataArray.push(Math.floor(Math.random() * 4000))
    }
   

    const data = {
    labels: labelArray,
    datasets: getLidarDataSets(dataArray)
    };


    const config = {
        type: 'radar',
        data: data,
        options: {
          elements: {
            line: {
              borderWidth: 1
            }
          },  scales: {
              r: {
                  angleLines: {
                      display: false
                  },
              }
          }, maintainAspectRatio: false,
        },
      };

      LidarChart = new Chart(
        lidarChartElement,
        config
      );
}

let maxLidar = 1000;
lidarUpdateData = (LidarObject) =>{
    dataArray = JSON.parse(LidarObject.Lidar);
    for(var i = 0; i<360; i++){
        if(dataArray[i] > maxLidar || dataArray[i] == 0)
            dataArray[i] = maxLidar; 
    }

    LidarChart.data.datasets = getLidarDataSets(dataArray);

    LidarChart.update();

}

getLidarDataSets = (dataArray) =>{
    return [{
        label: 'Lidar',
        data: dataArray,
        fill: true,
        backgroundColor: 'rgba(255,255,255)',
        borderColor: 'rgba(255,255,255)', 
        pointBackgroundColor: 'rgba(255,255,255)',  
        pointBorderColor: '#FF0000', 
        pointHoverBackgroundColor: '#fff',
        // pointHoverBorderColor: 'rgb(255, 99, 132)',
    }]
}


function lidarChartDisappear(){
    var x = document.getElementById("lidarDiv");
    var y = document.getElementById("lidarbutton");
    x.style.display = "none";
    y.style.display = "block";

    var x = document.getElementById("chart");
    x.style.display = "block";
}
function lidarChartAppear(){
    var x = document.getElementById("lidarDiv");
    var y = document.getElementById("lidarbutton");
    x.style.display = "block";
    y.style.display = "none";

    var x = document.getElementById("chart");
    x.style.display = "none";


    sliderAppear();
    windyMapDisappear();
    leafletMapDisappear();
    heatMapDisappear();
}