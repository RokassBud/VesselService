import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL5 } from '../env';


@Injectable()
export class WaterSensorApiService {

  constructor(private http: HttpClient, ) {
  }

  public static handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  getWaterLevel() {
    return this.http.get(`${API_URL5}`)
    .pipe
    (catchError(WaterSensorApiService.handleError));
  }
  
}