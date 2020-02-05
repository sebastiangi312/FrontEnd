import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MAT_DATE_LOCALE,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class MaterialModule { }
