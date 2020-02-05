import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsRoutingModule } from './bets-routing.module';


@NgModule({
  declarations: [BetsListComponent],
  imports: [
    CommonModule,
    BetsRoutingModule
  ]
})
export class BetsModule { }
