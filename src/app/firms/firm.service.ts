import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Firm } from '../common/models/Firm';

@Injectable({
  providedIn: 'root'
})
export class FirmService {
//   baseUrl = 'http://localhost/api';
  baseUrl = 'http://api.tmp/';
  firms: Firm[];

constructor(private http: HttpClient) { }

  getAll(): Observable<Firm[]> {
    return this.http.get(`${this.baseUrl}/firm/list`).pipe(
      map((res) => {
        this.firms = res['data'];
        return this.firms;
    }),
    catchError(this.handleError));
  }

  store(firm: Firm): Observable<Firm[]> {
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // };

    // const requestOptions = {
    //   headers: new Headers(headerDict),
    // };


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    const options = { headers: headers };
    console.log(firm);

    return this.http.post(`${this.baseUrl}firm/store`, { data: firm })
      .pipe(map((res) => {
        // this.firms.push(res['data']);
        console.log(res['data']);
        return this.firms;
      }),
      catchError(this.handleError));
  }

//   update(car: Firm): Observable<Firm[]> {
//     return this.http.put(`${this.baseUrl}/firm/update`, { data: car })
//       .pipe(map((res) => {
//         const theCar = this.firms.find((item) => {
//           return +item['id'] === +car['id'];
//         });
//         if (theCar) {
//           theCar['price'] = +car['price'];
//           theCar['model'] = car['model'];
//         }
//         return this.firms;
//       }),
//       catchError(this.handleError));
//   }

//   delete(id: number): Observable<Firm[]> {
//     const params = new HttpParams()
//       .set('id', id.toString());

//     return this.http.delete(`${this.baseUrl}/firm/delete`, { params: params })
//       .pipe(map(res => {
//         const filteredCars = this.firms.filter((car) => {
//           return +car['id'] !== +id;
//         });
//         return this.firms = filteredCars;
//       }),
//       catchError(this.handleError));
//   }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Грашка! Нещо се обърка. :-(');
  }
}
