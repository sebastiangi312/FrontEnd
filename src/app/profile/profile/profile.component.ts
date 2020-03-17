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
    this.isLoading = true;

    this.form = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      id: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      email: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl(null, { validators: [Validators.required] }),
      balance: new FormControl({ value: '', disabled: true }, { validators: [Validators.required, Validators.min(0),] }),
      birthdate: new FormControl({ value: '', disabled: true }, { validators: [Validators.required] }),
      password: new FormControl(null),
      newPassword: new FormControl(null)
    });

    this.userData = {
      id: this.authService.getUserCedula(),
      name: this.authService.getUserName(),
      email: this.authService.getUserEmail(),
      birthdate: this.authService.getUserBirthdate(),
      phone: this.authService.getUserPhone(),
      balance: this.authService.getUserBalance(),
      roles: this.authService.getUserRoles()
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
    this.isLoading = false;
  }

  onEditProfile() {
    if (this.form.valid) {
      this.authService.editUser(
        this.form.value.email,
        this.form.value.phone,
        this.form.value.password,
        this.form.value.newPassword
      );
    }
  }

}
