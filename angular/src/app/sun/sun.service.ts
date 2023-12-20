import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, map } from 'rxjs';
import LoggerService from '../logger.service';
import SunResponse from './sun';

@Injectable({
  providedIn: 'root',
})
export class SunService {
  constructor(private logger: LoggerService, private httpClient: HttpClient) {}

  getSun(
    date: Date,
    latitude: number,
    longitude: number
  ): Observable<SunResponse> {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
    const url = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&timezone=UTC&date=${dateString}`; // https://api.sunrisesunset.io/json?lat=49.817492&lng=15.472962&timezone=UTC&date=2023-12-20
    return this.httpClient.get<any>(url).pipe(
      map((rawResponse) => {
        const status = rawResponse.status;
        if (status !== 'OK') {
          throw new Error(`API call failed with response: ${rawResponse}`);
        }

        // const dateParts = rawResponse.results.date.split('-');

        return {
          //   date: new Date(dateParts[0], dateParts[1] - 1, dateParts[2]), // month is 0-based, that's why we need dataParts[1] - 1
          date: new Date(`${rawResponse.results.date}T00:00:00`),
          sunrise: rawResponse.results.sunrise,
          sunset: rawResponse.results.sunset,
          timezone: rawResponse.results.timezone,
          utc_offset: rawResponse.results.utc_offset,
        } as SunResponse;
      }),
      tap((sun) => this.logger.log('fetched sun')),
      catchError(this.handleError('getSun'))
    ) as Observable<SunResponse>;
  }

  private handleError<T>(operation = 'operation') {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      this.logger.error(error); // log to console instead

      // If a native error is caught, do not transform it. We only want to
      // transform response errors that are not wrapped in an `Error`.
      if (error.error instanceof Event) {
        throw error.error;
      }

      const message = `server returned code ${error.status} with body "${error.error}"`;
      // TODO: better job of transforming error for user consumption
      throw new Error(`${operation} failed: ${message}`);
    };
  }
}