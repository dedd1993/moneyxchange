import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsightsComponent } from './insights.component';

const LandingRoutes: Routes = [
    {
        path: '',
        component: InsightsComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LandingRoutes) ],
    exports: [ RouterModule ]
})
export class InsightsRoutingModule {}
