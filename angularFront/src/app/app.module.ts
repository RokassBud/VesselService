import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { AppComponent } from './app.component';
import { LocationApiService } from './location/location-api.service';
import { mapService } from './map.service';
import { GoalComponent } from './goal/goal.component';
import { LidarApiService } from './lidar/lidar-api.service';
import { WaterSensorApiService } from './watersensor/watersensor-api.service';


@NgModule({
  declarations: [
    AppComponent,
    GoalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [LocationApiService , mapService, LidarApiService, WaterSensorApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
