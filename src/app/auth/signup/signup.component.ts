import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const { name, id, email, password, phone, birthdate } = form.value;
    this.authService.createUser(id, name, email, password, birthdate, phone);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
