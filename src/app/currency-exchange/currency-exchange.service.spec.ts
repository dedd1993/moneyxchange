import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CurrencyExchangeService } from './currency-exchange.service';
import { FakeExchangeRatesResponse } from '../../testing/fakes.data.spec';

import { environment } from '../../environments/environment';

describe('CurrencyExchangeService', () => {
  let service: CurrencyExchangeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(CurrencyExchangeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getDollarEquivalent', () => {
    let requestForExchangeRatesSpy;

    beforeEach(() => {
      jasmine.clock().install();
      requestForExchangeRatesSpy = spyOn((service as any), 'requestForExchangeRates').and.returnValue(of(FakeExchangeRatesResponse));
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should make an API request when is the first exchange', () => {
      service.getDollarEquivalent(1);

      expect(requestForExchangeRatesSpy).toHaveBeenCalled();
    });

    it('should make an API request to get exchage rate when 10 minutes or more have passed', () => {
      jasmine.clock().mockDate(new Date('Tue Feb 13 2018 12:10:00 GMT+0200 (EET)'));
      service.lastRequestDate = new Date('Tue Feb 13 2018 12:00:00 GMT+0200 (EET)');

      service.getDollarEquivalent(1);

      expect(requestForExchangeRatesSpy).toHaveBeenCalled();
    });

    it('should perform the operation with rate exchange stored in memory when less than 10 minutes have passed', () => {
      jasmine.clock().mockDate(new Date('Tue Feb 13 2018 12:09:59 GMT+0200 (EET)'));
      service.lastRequestDate = new Date('Tue Feb 13 2018 12:00:00 GMT+0200 (EET)');

      service.getDollarEquivalent(1);

      expect(requestForExchangeRatesSpy).not.toHaveBeenCalled();
    });
  });

  describe('#requestForExchangeRates', () => {
    it('should return dollar exchange value from API', () => {
      (service as any).requestForExchangeRates()
        .subscribe(response => {
          expect(response.rates.USD).toBeDefined();
        });

      const url = `${environment.currencyExchange.api}?access_key=${environment.currencyExchange.access_key}`;
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(FakeExchangeRatesResponse);
      httpTestingController.verify();
    });
  });
});
