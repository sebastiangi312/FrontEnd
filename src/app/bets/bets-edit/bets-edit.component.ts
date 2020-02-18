import { Component, OnInit } from '@angular/core';
import { EditLotteryService } from 'src/app/core/services/edit-lottery.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Lottery } from 'src/app/core/models';

@Component({
  selector: 'app-bets-edit',
  templateUrl: './bets-edit.component.html',
  styleUrls: ['./bets-edit.component.css']
})
export class BetsEditComponent implements OnInit {

  isLoading = false;

  constructor(public editLotteryService: EditLotteryService) { }

  ngOnInit() {}

    onEdit(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.isLoading = true;
      const { fare, closingDate, firstPrize, secondPrize, thirdPrize } = form.value;
      this.editLotteryService.editLottery(fare, closingDate, firstPrize, secondPrize, thirdPrize);
      this.isLoading = false;
    }

    /*Llamando la info del back se llenan los campos para editar y se reemplaza

    bets: Array<Lottery> = [{id: "a5698412", fare: 200, closingDate: 20-25-10,firstPrize: 1500, secondPrize: 1000,  thirdPrize: 500}];
    
    

    llenarCampos(){
      console.log(this.bets.id)
      console.log(this.bets.fare)
      console.log(this.bets.firstPrize)
      console.log(this.bets.secondPrize)
      console.log(this.bets.ThirdPrize)
      console.log(this.bets.closingDate)
    }*/

}
