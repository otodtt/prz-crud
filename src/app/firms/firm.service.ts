import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Firm } from '../common/models/Firm';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class FirmService {
  baseUrl = 'http://api/';
  firms: Firm[];

  private handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FirmServices');
  }

  getFirms (): Observable<Firm[]> {
    return this.http
              .get<Firm[]>(`${this.baseUrl}firms/list`)
              .pipe(catchError(this.handleError('getFirms', [])));
  }


  addFirm ( firm: Firm ): Observable<Firm> {
    return this.http
              .post<Firm>(`${this.baseUrl}firm/store`, firm)
              .pipe(catchError(this.handleError('addFirm', firm)));
  }

  showFirm(id: number): Observable<Firm> {
    return this.http
      .get<Firm>(`${this.baseUrl}firm/show/${id}`)
      .pipe(catchError(this.handleError('showFirm', id)));
  }

  // deleteFirm (id: number ): Observable<{}> {
  //   const url = `${this.baseUrl}/firm/${id}`;
  //   return this.http
  //             .delete(url)
  //             .pipe(catchError(this.handleError('deleteFirm')));
  // }

  updateFirm (id: number, firm: Firm[] ): Observable<Firm> {
    return this.http
      .put<Firm>(`${this.baseUrl}firm/update/${id}`, firm)
      .pipe(catchError(this.handleError('updateFirm', firm)));
  }

  /////////////// FIRST TEST






  // getAll(): Observable<Firm[]> {
  //   return this.http.get(`${this.baseUrl}firm/list`).pipe(
  //     map((res) => {
  //       this.firms = res['data'];
  //       return this.firms;
  //   }),
  //   catchError(this.handleErrorFirst));
  // }
  // getAll(): Observable<Firm[]> {
  //   return this.http.get(`${this.baseUrl}firm/list`).pipe(
  //     map((res) => {
  //       this.firms = res['data'];
  //       return this.firms;
  //   }),
  //   catchError(this.handleErrorFirst));
  // }

//   store(car: Firm): Observable<Firm[]> {
//     return this.http.post(`${this.baseUrl}firm/store`, { data: car })
//       .pipe(map((res) => {
//         this.firms.push(res['data']);
//         // this.firms.push(res['data']);
//         return this.firms;
//       }),
//       catchError(this.handleErrorFirst));
//   }

// //   update(car: Firm): Observable<Firm[]> {
// //     return this.http.put(`${this.baseUrl}/firm/update`, { data: car })
// //       .pipe(map((res) => {
// //         const theCar = this.firms.find((item) => {
// //           return +item['id'] === +car['id'];
// //         });
// //         if (theCar) {
// //           theCar['price'] = +car['price'];
// //           theCar['model'] = car['model'];
// //         }
// //         return this.firms;
// //       }),
// //       catchError(this.handleErrorFirst));
// //   }

// //   delete(id: number): Observable<Firm[]> {
// //     const params = new HttpParams()
// //       .set('id', id.toString());

// //     return this.http.delete(`${this.baseUrl}/firm/delete`, { params: params })
// //       .pipe(map(res => {
// //         const filteredCars = this.firms.filter((car) => {
// //           return +car['id'] !== +id;
// //         });
// //         return this.firms = filteredCars;
// //       }),
// //       catchError(this.handleErrorFirst));
// //   }

  private handleErrorFirst(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Грашка! Нещо се обърка. :-(');
  }
}
