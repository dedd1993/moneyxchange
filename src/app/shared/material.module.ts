import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  // StyleModule
} from '@angular/material';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule
  ]
})
export class MaterialModule {}
