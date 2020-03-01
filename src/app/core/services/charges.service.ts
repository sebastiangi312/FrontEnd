import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Charge } from '../models/charge.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerifyChargeData } from '../models/verify-charge-data.model';
import { AdminData } from '../models/admin-data.model';


const BACKEND_URL = environment.apiUrl + '/charge/';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  private charges: Charge[] = [];
  private chargesUpdated = new Subject<{ charges: Charge[]; chargeCount: number }>();
  private chargeId: string;

  constructor(private http: HttpClient, private router: Router) { }

  getChargeId() {
    return this.chargeId;
  }

  getCharges(chargesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${chargesPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; charges: any; maxCharges: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(chargeData => {
          return {
            charges: chargeData.charges.map(charge => {
              return {
                id: charge._id, // MONGO
                amount: charge.amount,
              };
            }),
            maxCharges: chargeData.maxCharges
          };
        })
      )
      .subscribe(transformedChargeData => {
        this.charges = transformedChargeData.charges;
        this.chargesUpdated.next({
          charges: [...this.charges],
          chargeCount: transformedChargeData.maxCharges
        });
      });
  }

  getChargeUpdateListener() {
    return this.chargesUpdated.asObservable();
  }

  getCharge(id: string) {
    return this.http.get<{
      _id: string;
      amount: string;
    }>(BACKEND_URL + id);
  }

  deleteCharge(chargeId: string, idChargeToAuthorize: string) {
    return this.http.delete(BACKEND_URL + chargeId);
  }

  authorizeCharge(idChargeToAuthorize: string) {
    const verifyChargeData: VerifyChargeData = {
      idChargeToAuthorize
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + './chargeAuth', verifyChargeData
      );
  }

  deauthorizeCharge(idChargeToDeauthorize: string) {
    const verifyChargeData: VerifyChargeData = {
      idChargeToAuthorize: idChargeToDeauthorize
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + './chargeDeauth', verifyChargeData
      );
  }

}
