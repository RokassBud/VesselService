import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL, API_URL4 } from '../env';
declare var getTimeArray:any;


@Injectable()
export class LocationApiService {
  timeList: any;

  constructor(private http: HttpClient, ) {
    // const exportFunction = {
    //   addToDots: this.addToDots.bind(this)
    // };
    // //@ts-ignore
    // window['ngLib']['locationApiService'] = exportFunction;
  }

  

  public static handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  getLocation() {
    return this.http.get(`${API_URL}`)
    .pipe
    (catchError(LocationApiService.handleError));
  }
  
  //@ts-ignore
  getDate(date){
    return this.http.get(`${API_URL4}${date}`)
  }

  
}