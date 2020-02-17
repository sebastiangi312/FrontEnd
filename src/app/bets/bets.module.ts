import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetsListComponent } from './bets-list/bets-list.component';
import { BetsRoutingModule } from './bets-routing.module';
import { MaterialModule  } from '../material/material.module';
import { MatTableModule } from '@angular/material';

@NgModule({
  declarations: [BetsListComponent],
  imports: [
    CommonModule,
    BetsRoutingModule,
    MaterialModule,
    MatTableModule
  ]
})
export class BetsModule { }
