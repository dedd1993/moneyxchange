import { Observable, of } from 'rxjs';

export class FakeCurrencyExchangeService {
  getDollarEquivalent(): Observable<number> {
      return of(100);
  }

}
