import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CurrencyExchangeRoutingModule } from './currency-exchange.routing.module';
import { CurrencyExchangeComponent } from './currency-exchange.component';

@NgModule({
  declarations: [
    CurrencyExchangeComponent
  ],
  imports: [
    CommonModule,
    CurrencyExchangeRoutingModule,
    SharedModule
  ]
})
export class CurrencyExchangeModule { }
