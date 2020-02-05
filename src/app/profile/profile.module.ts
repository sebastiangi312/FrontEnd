import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
