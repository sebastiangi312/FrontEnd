import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
