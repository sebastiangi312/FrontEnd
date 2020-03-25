import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBetsRoutingModule } from './my-bets-routing.module';
import { MyBetsComponent } from './my-bets.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [MyBetsComponent],
  imports: [
    CommonModule,
    MyBetsRoutingModule,
    MaterialModule
  ]
})
export class MyBetsModule { }
