import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

export type HandleError = <T>(
  operation?: string,
  result?: T
) => ( error: HttpErrorResponse ) => Observable<T>;


@Injectable({
  providedIn: 'root'
})

export class HttpErrorHandler {
  constructor ( private messageService: MessageService) {}

  createHandleError = ( serviceName = '' ) => <T> (
    operation = 'operation',
    result = {} as T
  ) => this.handleError(serviceName, operation, result)

  handleError<T> ( serviceName= '', operation= 'operation', result= {} as T ) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);

      const message =
          error.error instanceof ErrorEvent
              ? error.error.message
              : `server return code ${error.status} with body ${error.error}`;

      this.messageService.add(`${error.status}: ${operation} failed: ${message}`);

      return of(result);
    };
  }
}
