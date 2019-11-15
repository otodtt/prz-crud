import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Substance } from '../common/models/Substance';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SubstanceService {
  baseUrl = 'http://api/';

  firms: Substance[];

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FirmServices');
  }

  getSubstances (): Observable<Substance[]> {
    return this.http
              .get<Substance[]>(`${this.baseUrl}substances/list`)
              .pipe(catchError(this.handleError('getSubstances', [])));
  }


  addSubstance ( firm: Substance ): Observable<Substance> {
    return this.http
              .post<Substance>(`${this.baseUrl}substance/store`, firm)
              .pipe(catchError(this.handleError('addSubstance', firm)));
  }

  showSubstance(id: number): Observable<Substance> {
    return this.http
      .get<Substance>(`${this.baseUrl}substances/show/${id}`)
      .pipe(catchError(this.handleError('showSubstance', id)));
  }

  // deleteFirm (id: number ): Observable<{}> {
  //   const url = `${this.baseUrl}/firm/${id}`;
  //   return this.http
  //             .delete(url)
  //             .pipe(catchError(this.handleError('deleteFirm')));
  // }

  updateSubstance (id: number, firm: Substance[] ): Observable<Substance> {
    return this.http
      .put<Substance>(`${this.baseUrl}substances/update/${id}`, firm)
      .pipe(catchError(this.handleError('updateSubstance', firm)));
  }

  /////////////// FIRST TEST



  private handleErrorFirst(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Грашка! Нещо се обърка. :-(');
  }
}
