import { NgStyle } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { goalService } from './goal/goal.service';
import { LidarApiService } from './lidar/lidar-api.service';
import { LocationApiService} from './location/location-api.service';
import { WaterSensorApiService } from './watersensor/watersensor-api.service'

declare var leafletMapInit: any;
declare var heatMapInit: any;
declare var chartInit: any;
declare var sliderInit: any;
declare var lidarInit:any;
declare var lidarUpdateData:any;
declare var chartUpdate: any;
declare var addLocationLea:any;
declare var addTrack:any;
declare var alertFunction:any;
declare var getTimeArray:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'angularFront';
  locationListSubs: Subscription;
  locationList: any;
  lidarList: any;
  speedValue: any;
  data: any;
  lat:any;
  lng:any;
  lastVal: any;
  dataJSON: any = [];
  chartPosition: any;
  speedArray: any = [];
  addTrack: any;
  timeList: any;
  waterList: any;
  

  constructor(private locationApi: LocationApiService, private addGoalServ: goalService
    ,private lidarApi: LidarApiService, private waterApi: WaterSensorApiService){
  } 
    ngOnInit(): void {
      lidarInit();
      heatMapInit();
      leafletMapInit();
      chartInit();
      sliderInit();

      let refreshLidar= () => {
        this.lidarApi
        .getLidar()
        .subscribe(res => {
            this.lidarList = res;
  
            if(this.lidarList.length > 0)
            {
              this.lastVal=this.lidarList[this.lidarList.length-1];
              lidarUpdateData(this.lastVal);
            }
          },
          console.error
        )};
      
        refreshLidar();

        setInterval(refreshLidar, 2*1000);

        let checkWaterLevel= () => {
          this.waterApi
          .getWaterLevel()
          .subscribe(res => {
              alertFunction(res);
            },
            console.error
        )};

        checkWaterLevel();

        setInterval(checkWaterLevel, 10*1000);
    

    let addToLeaflet = () => {
      this.locationListSubs = this.locationApi
          .getLocation()
          .subscribe(res => {
            this.dataJSON = res;
            addLocationLea(this.dataJSON[this.dataJSON.length-1]);
            addTrack(this.dataJSON);
          },
          console.error
          );
    }
    addToLeaflet;

    setInterval(addToLeaflet, 2*1000);

    
    let addToChart = () => {
      this.locationApi
          .getLocation()
          .subscribe(res => {
              this.speedValue = res;
              if(this.speedValue.length > 0)
              { 
                chartUpdate(this.speedValue);
              }
            },
            console.error
          ); 
    }

    this.chartPosition = addToChart();
    setInterval(addToChart, 2*1000);

    let addToDots = () => {
      this.locationApi.
      getLocation()
        .subscribe(res => {
          this.timeList = res;
          if(this.timeList.length > 0)
          { 
            getTimeArray(this.timeList);
          }
        },
        console.error
        );
  }
  }
    
    ngOnDestroy(): void {
      this.locationListSubs.unsubscribe();
    }

    //Duomenys nustatyti tikslui
    //@ts-ignore
    onSubmit(data){
      this.addGoalServ.addGoal(data)
      .subscribe((result)=>{
      });
      this.lat = data.lat;
      this.lng = data.lng;
      leafletMapInit(this.lat,this.lng,1);
    }
    
  }
