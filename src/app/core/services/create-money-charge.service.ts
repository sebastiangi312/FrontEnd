import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/transaction/";

@Injectable({
  providedIn: "root"
})
export class CreateMoneyChargeService {
  constructor(private http: HttpClient, private router: Router) { }

  createTransaction(_idUser: string, userName: string, amount: number) {
    const data = { amount, _idUser, userName };
    this.http.post(BACKEND_URL, data).subscribe(result => {
      console.log(result);
    });
  }
}
