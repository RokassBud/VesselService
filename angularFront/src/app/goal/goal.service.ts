import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Goal } from './goal.models'
import { API_URL2 } from '../env';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class goalService {
    ngForm: FormGroup;

  constructor(private http: HttpClient) {
   }
  
  public static handleError(err: HttpErrorResponse | any) {
    return throwError(err.message || 'Error: Unable to complete request.');
  }

  
  addGoal(goal: Goal){
    return this.http.post<Goal>(`${API_URL2}`, goal)
    .pipe
    (catchError(goalService.handleError));
    }
 //catchError(GoalService.handleError));
}