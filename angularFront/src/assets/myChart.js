var myChart;
var myChartElement;
var speedArray = [];


function chartInit(){

    myChartElement = document.getElementById('myChart');

    var chartLabel = [];

    for(var i=0; i<=30; i++){
        chartLabel.push(i);
    }

    for(var i=0; i<30; i++){
        speedArray.push(Math.floor(Math.random() * 8))
    }

    const data = {
        labels: chartLabel,
        datasets: getChartDataSets(speedArray)
    };
    
    const config = {
        type: 'line',
        data: data,
            options: {
                responsive: true,
                legend:{
                    display: false
            }, maintainAspectRatio: false,
        },
        animations: {
            tension: {
                duration: 20000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x: {
                        ticks: {
                            display: false
                        }
                    }
                }
    }

    myChart = new Chart(
        myChartElement, 
        config
        ); 
}

chartUpdate = (SpeedObject) => {
    for(var i = 0 ; i<31; i++)
    {
        speedArray[30-i] = SpeedObject[SpeedObject.length-i-1].speed;
    }
    myChart.data.datasets = getChartDataSets(speedArray);
    myChart.update();
}

getChartDataSets = (speedArray) => {
    return [{
        label: 'Greitis (m/s)',
        data: speedArray,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        tension: 0.1
    }]
}



