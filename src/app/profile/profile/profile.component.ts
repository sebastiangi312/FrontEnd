import { Component, OnInit } from '@angular/core';

import { ProfileData } from 'src/app/core/models/';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: ProfileData;
  form: FormGroup;
  isLoading = false;
  private authStatusSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      id: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      balance: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.min(0),] }),
      birthdate: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      password: new FormControl(null),
      newPassword: new FormControl(null)
    });
    this.authService.getUser().subscribe(profileData => {
      this.isLoading = false;
      this.userData = {
        id: profileData.id,
        name: profileData.name,
        email: profileData.email,
        birthdate: profileData.birthdate,
        phone: profileData.phone,
        balance: profileData.balance
      };
      this.form.setValue({
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        birthdate: this.userData.birthdate,
        phone: this.userData.phone,
        balance: this.userData.balance,
        password: '',
        newPassword: ''
      });
    });
  }

  onEditProfile() {
    this.authService.editUser(
      this.form.value.email,
      this.form.value.phone,
      this.form.value.password,
      this.form.value.newPassword
    );
  }

}
