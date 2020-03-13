import { Component, OnInit } from '@angular/core';

import { Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
  homeTeam: string;
  awayTeam: string;
  matchDate: Date;
  homeScore: number;
  awayScore: number;

  minDate: Date;

  constructor(private formBuilder: FormBuilder, public createLotteryService: CreateLotteryService,
    public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.mode = 'create';
    this.minDate = new Date();
    this.sportForm = this.formBuilder.group({
      homeTeam: new FormControl('', [Validators.required]),
      awayTeam: new FormControl('', [Validators.required]),
      matchDate: new FormControl('', [Validators.required]),
      /*
      homeScore: new FormControl('', [Validators.min(0)]),
      awayScore: new FormControl('', [Validators.min(0)]),
      */
    });
  }

  onCreate() {
    if (this.sportForm.invalid) {
      return;
    } else {
      if (this.mode === 'create') {
        this.isLoading = true;
        this.createLotteryService.createMatch(this.sportForm.value);
        this.isLoading = false;
      }
    }
  }

}


