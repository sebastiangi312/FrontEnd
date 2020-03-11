import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListService } from './services/bets-list.service';
import { SportService } from './services/sport.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [BetsListService, SportService]
})
export class CoreModule { }
