import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const LandingRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LandingRoutes) ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {}
