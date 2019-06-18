import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '../shared/shared.module';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { FooterComponent, HeaderComponent, NavbarComponent } from './layouts';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  providers: [],
  exports: [
    FlexLayoutModule,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent
  ],
})
export class CoreModule { }
