import { Component, OnInit } from '@angular/core';
import { ProfileData } from 'src/app/core/models/';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from '../../core/models/user.model';
import { ChargesService } from '../../core/services/charges.service';
import { PageEvent } from '@angular/material';
import { Charge } from 'src/app/core/models/charge.model';

@Component({
  selector: 'app-verify-charges',
  templateUrl: './verify-charges.component.html',
  styleUrls: ['./verify-charges.component.css']
})
export class VerifyChargesComponent implements OnInit {
  isLoading = false;
  charges: Charge[] = [];
  totalCharges = 0;
  idCurrentUser: string;
  chargesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  chargeId: string;
  chargeUserName: string[];
  private chargesSub: Subscription;

  constructor(public chargesService: ChargesService, public authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.chargesService.getCharges(this.chargesPerPage, this.currentPage);
    this.idCurrentUser = this.authService.getUserId();
    this.chargeId = this.chargesService.getChargeId();
    this.chargesSub = this.chargesService
      .getChargeUpdateListener()
      .subscribe((chargeData: { charges: Charge[]; chargeCount: number }) => {
        this.charges = chargeData.charges;
        console.log(this.charges);
        this.isLoading = false;
        this.totalCharges = chargeData.chargeCount;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.chargesPerPage = pageData.pageSize;
    this.chargesService.getCharges(this.chargesPerPage, this.currentPage);
  }

  onDelete(chargeId: string, idChargeToDelete: string) {
    this.isLoading = true;
    this.chargesService.deleteCharge(chargeId, idChargeToDelete).subscribe(() => {
      this.chargesService.getCharges(this.chargesPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onAuthorize(idChargeToAuthorize: string, idCurrentUser: string) {
    this.isLoading = true;
    this.chargesService.authorizeCharge(idChargeToAuthorize, idCurrentUser).subscribe(() => {
      this.chargesService.getCharges(this.chargesPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  onDeauthorize(idChargeToAuthorize: string) {
    this.isLoading = true;
    this.chargesService.deauthorizeCharge(idChargeToAuthorize).subscribe(() => {
      this.chargesService.getCharges(this.chargesPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

}
