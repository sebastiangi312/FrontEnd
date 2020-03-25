import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProfileData } from 'src/app/core/models/';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: ProfileData;
  form: FormGroup;
  isLoading = false;
  private userSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.userSub = this.authService.getUser()
      .subscribe(user => {
        this.userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          birthdate: user.birthdate,
          phone: user.phone,
          balance: user.balance,
          roles: user.roles
        };

        this.form = new FormGroup({
          name: new FormControl({ value: this.userData.name, disabled: true },
            { validators: [Validators.required] }),
          id: new FormControl({ value: this.userData.name, disabled: true },
            { validators: [Validators.required] }),
          email: new FormControl({ value: this.userData.email, disabled: true },
            { validators: [Validators.required, Validators.email] }),
          phone: new FormControl(this.userData.phone, { validators: [Validators.required] }),
          balance: new FormControl({ value: this.userData.balance, disabled: true },
            { validators: [Validators.required, Validators.min(0)] }),
          birthdate: new FormControl({ value: this.userData.birthdate, disabled: true },
            { validators: [Validators.required] }),
          password: new FormControl(null),
          newPassword: new FormControl(null)
        });
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
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
