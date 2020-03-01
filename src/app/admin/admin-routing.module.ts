import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyComponent } from './verify/verify.component';
import { VerifyChargesComponent } from './verify-charges/verify-charges.component';

const routes: Routes = [
  { path: 'verifyUser', component: VerifyComponent},
  { path: 'verifyCharges', component: VerifyChargesComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
