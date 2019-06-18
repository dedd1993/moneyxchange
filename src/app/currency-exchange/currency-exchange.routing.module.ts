import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyExchangeComponent } from './currency-exchange.component';

const Routes: Routes = [
    {
        path: 'currency-exchange',
        component: CurrencyExchangeComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(Routes) ],
    exports: [ RouterModule ]
})
export class CurrencyExchangeRoutingModule {}
