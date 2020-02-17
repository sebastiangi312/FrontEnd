import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateLotteryService } from 'src/app/core/services/create-lottery.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-create-lottery',
  templateUrl: './create-lottery.component.html',
  styleUrls: ['./create-lottery.component.css']
})
export class CreateLotteryComponent implements OnInit, OnDestroy {

  isLoading = false;
  private authStatusSub: Subscription;

  // maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  constructor(public createLotteryService: CreateLotteryService) { }

  ngOnInit() {
    this.authStatusSub = this.createLotteryService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    //const { name, id, email, password, phone, birthdate } = form.value;
    const { firstPrize, secondPrize, thirdPrize } = form.value;
    //this.authService.createUser(id, name, email, password, birthdate, phone);
    this.createLotteryService.createLottery(firstPrize, secondPrize, thirdPrize);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }


}
