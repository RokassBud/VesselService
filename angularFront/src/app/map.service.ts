import {Injectable} from '@angular/core';

@Injectable()
export class mapService {
    locationList: any;
    map: any;
    heatmap: any;
    buttonclick = true;
    mapInit(){
        var location = { lat: 55.67780959021172, lng: 21.149729009802574 };
        this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            zoom: 15,
            center: location,
        });
        
        const centerControlDiv = document.createElement("div");
        this.CenterControl(centerControlDiv);
        this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
        
        this.locationList.forEach((element:any) => {
            console.log(element);
            new google.maps.Marker({
                position: { lat: Number(element.lat), lng: Number(element.lng) },
                map: this.map,
                });
        });
    }
    initHeatMap(){
        var heatmaplayer;
        var location = { lat: 55.67780959021172, lng: 21.149729009802574 };
        var heatmapData = [
            new google.maps.LatLng(37.782, -122.447)
        ];
        this.heatmap = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            zoom: 15,
            center: location,
        });
        heatmaplayer = new google.maps.visualization.HeatmapLayer({
            data: heatmapData
        });   
        heatmaplayer.setMap(this.heatmap);
        
        const centerControlDiv = document.createElement("div");
        this.CenterControl(centerControlDiv);
        this.heatmap.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
    }
    CenterControl(controlDiv: any) {
            const controlUI = document.createElement("div");
          
            controlUI.style.backgroundColor = "#fff";
            controlUI.style.border = "2px solid #fff";
            controlUI.style.borderRadius = "3px";
            controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
            controlUI.style.cursor = "pointer";
            controlUI.style.marginTop = "8px";
            controlUI.style.marginBottom = "22px";
            controlUI.style.textAlign = "center";
            controlUI.title = "Paspauskite norėdami pakeisti žemėlapį.";
            controlDiv.appendChild(controlUI);
          
            const controlText = document.createElement("div");
          
            controlText.style.color = "rgb(25,25,25)";
            controlText.style.fontFamily = "Roboto,Arial,sans-serif";
            controlText.style.fontSize = "16px";
            controlText.style.lineHeight = "38px";
            controlText.style.paddingLeft = "5px";
            controlText.style.paddingRight = "5px";
            controlText.innerHTML = "Pakeisti žemėlapį";
            controlUI.appendChild(controlText);
            controlUI.addEventListener("click", () => {
                console.log(this.buttonclick);
              if(this.buttonclick) this.initHeatMap();
              else this.mapInit();
              this.buttonclick = !this.buttonclick;
            });
          }
      }