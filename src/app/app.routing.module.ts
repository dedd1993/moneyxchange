import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './core/layouts/not-found/not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'currency-exchange', // wrapped in main.js, check currency-exchange module
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    },
    {
        path: 'insights',
        loadChildren: () => import('./insights/insights.module').then(m => m.InsightsModule),
    },
    {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule),
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
