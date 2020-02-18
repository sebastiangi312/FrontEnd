import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { MaterialElevationDirective } from '../material/material-elevation.directive'
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent, MaterialElevationDirective],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
