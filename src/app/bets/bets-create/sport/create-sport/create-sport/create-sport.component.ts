import { Component, OnInit } from '@angular/core';

import { Validators, FormArray, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { CreateLotteryService } from 'src/app/core/services/create-lottery.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-sport',
  templateUrl: './create-sport.component.html',
  styleUrls: ['./create-sport.component.css']
})
export class CreateSportComponent implements OnInit {

  isLoading = false;
  mode = 'create';
  sportForm: FormGroup;
  minDate: Date;
  arrayMatches: []

  constructor(public createLotteryService: CreateLotteryService,
    public route: ActivatedRoute, private router: Router) { }



  get finalDate() {
    return this.sportForm.get('finalDate');
  }

  get matches() {
    return this.sportForm.get('matches') as FormArray;
  }



  ngOnInit() {
    this.mode = 'create';
    this.sportForm = new FormGroup({
      'finalDate': new FormControl('', Validators.required),
      'matches': new FormArray([])
    });

  }

  onCreate() {
    if (this.sportForm.invalid) {
      return;
    }
    if((this.sportForm.controls['matches'].value).length >=5){

      if (this.mode === 'create') {

        this.isLoading = true;
        const { finalDate, matches } = this.sportForm.value;
        this.createLotteryService.createSportBetAdmin(finalDate, matches);
        this.isLoading = false;
      }
    }





  }

  addMatches() {
    (<FormArray>this.sportForm.controls['matches']).push(
      new FormGroup({
        'homeTeam': new FormControl('', Validators.required),
        'awayTeam': new FormControl('', Validators.required),
        'matchDate': new FormControl('', Validators.required),
        'secoreboard': new FormControl(''),
        'status': new FormControl(false)

      }));

      console.log(this.sportForm.controls['matches'].value);


  }

  deleteMatch(index: number) {
    (<FormArray>this.sportForm.controls['matches']).removeAt(index);
    console.log(this.sportForm.controls['matches'].value)
  }

  cancel(form: FormGroup) {
    this.sportForm.patchValue({
      finalDate: ''

    });
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null);
    });
    (this.sportForm.controls['matches'].value).length = 0;
    console.log(this.sportForm.controls['matches'].value)
    this.router.navigate(['/bets/list-sport']);

  }

}


