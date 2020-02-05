import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { UserGuard } from '../core/guards/user.guard';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [UserGuard]
})
export class AuthModule { }
