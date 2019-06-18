import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, flatMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const MINUTES_FOR_CACHE = 10;

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  lastRequestDate: Date;
  euroToDollarExchangeValue: number;

  constructor(private http: HttpClient) { }

  getDollarEquivalent(euroAmount: number): Observable<number> {
    if ( this.isRequestRequired(this.lastRequestDate, new Date()) ) {

      return this.requestForExchangeRates()
        .pipe(
          flatMap(() => of(euroAmount * this.euroToDollarExchangeValue)
        ));

    }

    return of(euroAmount * this.euroToDollarExchangeValue);
  }

  private isRequestRequired(lastRequestDate, currentDate): boolean {
    if ( lastRequestDate === undefined ) {
      return true;
    }

    const milisecondsOfLastRequest = currentDate.getTime() - lastRequestDate.getTime();
    const minutesOfLastRequest = milisecondsOfLastRequest / 60000;

    return minutesOfLastRequest >= MINUTES_FOR_CACHE ? true : false;
  }

  private requestForExchangeRates(): Observable<any> {
    let params = new HttpParams();
    params = params.append('access_key', environment.currencyExchange.access_key);

    return this.http
      .get(environment.currencyExchange.api, { params })
      .pipe(
        tap((response: any) => {
          this.lastRequestDate = new Date();
          this.euroToDollarExchangeValue = response.rates.USD;
        })
      );
  }

}
