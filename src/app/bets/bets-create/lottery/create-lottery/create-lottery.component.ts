import { Component, OnInit } from '@angular/core';
import { CreateLotteryService } from 'src/app/core/services/create-lottery.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BetsListService } from 'src/app/core/services/bets-list.service';
import { Lottery } from 'src/app/core/models/lottery.model';

@Component({
  selector: 'app-create-lottery',
  templateUrl: './create-lottery.component.html',
  styleUrls: ['./create-lottery.component.css']
})
export class CreateLotteryComponent implements OnInit {

  isLoading = false;
  mode = 'create';
  private id: string;
  public lottery: Lottery;
  minDate: Date;

  // maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate());

  constructor(public createLotteryService: CreateLotteryService,
    public route: ActivatedRoute,
    public betService: BetsListService) { }

  ngOnInit() {
    this.minDate = new Date();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.id = paramMap.get('id');
        this.lottery = this.betService.getLottery(this.id);
      } else {
        this.mode = 'create';
        this.lottery = null;
      }
    });
  }

  onCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.isLoading = true;
      const { fare, closingDate, firstPrize, secondPrize, thirdPrize } = form.value;
      this.createLotteryService.createLottery(fare, closingDate, firstPrize, secondPrize, thirdPrize);
      this.isLoading = false;
    } else {
      this.isLoading = true;
      const { fare, closingDate, firstPrize, secondPrize, thirdPrize } = form.value;
      this.createLotteryService.editLottery(this.lottery.id, fare, closingDate, firstPrize, secondPrize, thirdPrize);
      this.isLoading = false;
    }
  }

}
