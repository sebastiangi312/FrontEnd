import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Charge } from '../models/charge.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { VerifyChargeData } from '../models/verify-charge-data.model';
import { AdminData } from '../models/admin-data.model';


const BACKEND_URL = environment.apiUrl + '/transaction/';

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

  getChargeUserName(idChargeToAuthorize: string) {
    return this.http
      .get<{ message: string }>(
        BACKEND_URL + '/transactionName/' + idChargeToAuthorize
      );
  }

  getCharges(chargesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${chargesPerPage}&page=${currentPage}`;
    this.http
      .get<{ maxTransactions: number, message: string; transaction: any;  }>(
        BACKEND_URL + '/nonApproved' + queryParams
      )
      .pipe(
        map(transactionData => {
          return {
            charges: transactionData.transaction.map(transaction => {
              return {
                id: transaction._id, // MONGO
                amount: transaction.amount,
              };
            }),
            maxCharges: transactionData.maxTransactions
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
        BACKEND_URL + '/chargeAuth', verifyChargeData
      );
  }

  deauthorizeCharge(idChargeToDeauthorize: string) {
    const verifyChargeData: VerifyChargeData = {
      idChargeToAuthorize: idChargeToDeauthorize
    };
    return this.http
      .put<{ message: string }>(
        BACKEND_URL + '/chargeDeauth', verifyChargeData
      );
  }

}
