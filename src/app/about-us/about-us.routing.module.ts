import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutUsComponent } from './about-us.component';

const LandingRoutes: Routes = [
    {
        path: '',
        component: AboutUsComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(LandingRoutes) ],
    exports: [ RouterModule ]
})
export class AboutUsRoutingModule {}
