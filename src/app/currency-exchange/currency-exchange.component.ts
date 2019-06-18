import { Component, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { CurrencyExchangeService } from './currency-exchange.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss']
})
export class CurrencyExchangeComponent implements OnDestroy {
  exchangeForm: FormGroup;
  exchangeLoading = false;
  private exchangeSuscription: Subscription;

  constructor(
    private currencyExchangeService: CurrencyExchangeService,
    private decimalPipe: DecimalPipe
  ) {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.exchangeForm = new FormGroup({
      euroInput: new FormControl({ value: '', disabled: false }, Validators.compose([
        Validators.required,
        Validators.pattern(/^\d+\.?\d{0,4}$/)
      ])),
      dollarInput: new FormControl({ value: '', disabled: true })
    });
  }

  onCalculate(): void {
    this.exchangeLoading = true;
    const amountToExchange = Number(this.exchangeForm.get('euroInput').value);

    this.exchangeSuscription = this.currencyExchangeService
      .getDollarEquivalent(amountToExchange)
      .subscribe(amount => {
        const amountFixed = this.decimalPipe.transform(amount, '1.0-4');
        this.exchangeForm.get('dollarInput').setValue(amountFixed);

      }, error => {
        this.exchangeForm.get('dollarInput').reset();

      }, () => {
        this.exchangeLoading = false;
      });
  }

  ngOnDestroy(): void {
    if (this.exchangeSuscription) {
      this.exchangeSuscription.unsubscribe();
    }
  }

}
