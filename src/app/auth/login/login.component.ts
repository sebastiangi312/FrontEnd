import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

// If this component is calling by routing the selector can be eliminated
@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})

export class LoginComponent {
  isLoading = false;

  onLogin(form: NgForm) {
    console.log(form.value); // TODO When the sign up works, erase this line. It is a security lack.
  }
}
