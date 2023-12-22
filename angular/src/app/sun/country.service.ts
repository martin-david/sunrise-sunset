import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import Country from './country';
import LoggerService from '../logger.service';
import countriesData from '../../assets/countries.json';

@Injectable({
  providedIn: 'root',
})
export default class CountryService {
  constructor(private logger: LoggerService) {}

  getCountries(): Observable<Country[]> {
    const countries = countriesData as Country[];
    return of(countries).pipe(
      tap(() => this.logger.log('fetched countries')),
      catchError(this.handleError('getCountries'))
    ) as Observable<Country[]>;
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
