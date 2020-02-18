import { Component, OnInit } from '@angular/core';
import { CreateLotteryService } from 'src/app/core/services/create-lottery.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-create-lottery',
  templateUrl: './create-lottery.component.html',
  styleUrls: ['./create-lottery.component.css']
})
export class CreateLotteryComponent implements OnInit {

  isLoading = false;

  // maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  constructor(public createLotteryService: CreateLotteryService) { }

  ngOnInit() { }

  onCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const { fare, closingDate, firstPrize, secondPrize, thirdPrize } = form.value;
    this.createLotteryService.createLottery(fare, closingDate, firstPrize, secondPrize, thirdPrize);
    this.isLoading = false;
  }

}
