import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialogModule } from "@angular/material";
import { ChargeMoneyComponent } from './charge-money/charge-money.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavbarComponent, ChargeMoneyComponent],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    MatDialogModule,
    FormsModule
  ],
  entryComponents: [
    ChargeMoneyComponent
  ],
  exports: [
    NavbarComponent
  ]
})
export class SharedModule { }
