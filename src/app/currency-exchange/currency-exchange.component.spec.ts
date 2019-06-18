import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EMPTY, throwError, of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CurrencyExchangeComponent } from './currency-exchange.component';
import { CurrencyExchangeService } from './currency-exchange.service';
import { FakeCurrencyExchangeService } from '../../testing/fakes.spec';

describe('CurrencyExchangeComponent', () => {
  let component: CurrencyExchangeComponent;
  let fixture: ComponentFixture<CurrencyExchangeComponent>;
  let currencyExchangeService: CurrencyExchangeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ],
      providers: [
        { provide: CurrencyExchangeService, useClass: FakeCurrencyExchangeService },
      ],
      declarations: [ CurrencyExchangeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currencyExchangeService = TestBed.get(CurrencyExchangeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#initFormBuilder', () => {
    it('should create a form with euro and dollar controls', () => {
      expect(component.exchangeForm.contains('euroInput')).toBeDefined();
      expect(component.exchangeForm.contains('dollarInput')).toBeDefined();
    });

    it('should make the euro control required', () => {
      const control = component.exchangeForm.get('euroInput');
      control.setValue('');
      expect(control.valid).toBeFalsy();
    });

    it('should validate that euro control is a valid number', () => {
      const control = component.exchangeForm.get('euroInput');
      control.setValue('345.6789');
      expect(control.valid).toBeTruthy();
    });

    it('should validate that euro control is not valid if has more than 4 decimals', () => {
      const control = component.exchangeForm.get('euroInput');
      control.setValue('345.678943434');
      expect(control.valid).toBeFalsy();
    });
  });

  describe('#onCalculate', () => {
    it('should call the service with euro control value as a parameter to get the dollar value', () => {
      const spy = spyOn(currencyExchangeService, 'getDollarEquivalent').and.returnValue(EMPTY);
      const euroValue = component.exchangeForm.get('euroInput').value;

      component.onCalculate();
      expect(spy).toHaveBeenCalledWith(Number(euroValue));
    });

    it('should change the dollar control value when service response successfully', () => {
      spyOn(currencyExchangeService, 'getDollarEquivalent').and.returnValue(of(1.120953));
      const previousValue = component.exchangeForm.get('dollarInput').value;

      component.onCalculate();

      expect(component.exchangeForm.get('dollarInput').value).not.toEqual(previousValue);
    });

    it('should format the dollar value (0\'000,0000) when service response successfully', () => {
      spyOn(currencyExchangeService, 'getDollarEquivalent').and.returnValue(of(1121.75559));

      component.onCalculate();

      expect(component.exchangeForm.get('dollarInput').value).toEqual('1,121.7556');
    });

    it('should reset dollar control if service response with an error', () => {
      spyOn(currencyExchangeService, 'getDollarEquivalent').and.returnValue(throwError(null));

      component.onCalculate();

      expect(component.exchangeForm.get('dollarInput').value).toBeNull();
    });
  });
});
