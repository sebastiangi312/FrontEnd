import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify/verify.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { VerifyChargesComponent } from './verify-charges/verify-charges.component';
import { VerifiedListComponent } from './verified-list/verified-list.component';
import { FillScoreboardsComponent } from './fill-scoreboards/fill-scoreboards.component';


@NgModule({
  declarations: [
    VerifyComponent,
    VerifyChargesComponent,
    VerifiedListComponent,
    FillScoreboardsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AdminModule { }
