import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL3 } from '../env';


@Injectable()
export class LidarApiService {

  constructor(private http: HttpClient) {
  }

  public static handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  getLidar() {
    return this.http.get(`${API_URL3}`)
    .pipe
    (catchError(LidarApiService.handleError));
  }
}