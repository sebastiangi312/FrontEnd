import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MatchBet } from 'src/app/core/models/matchBet.model';
import { BetsListSportComponent } from '../../bets-list-sport/bets-list-sport.component';

@Component({
  selector: 'app-bets-sport-in-dialog',
  templateUrl: './bets-sport-in-dialog.component.html',
  styleUrls: ['./bets-sport-in-dialog.component.css']
})

export class BetsSportInDialogComponent implements OnInit {

  form: FormGroup;
  betValue: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BetsListSportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { chosenMatches: MatchBet[], balance: number }
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      formArray: this.formBuilder.array([]),
      betValue: new FormControl('', [Validators.min(1), Validators.max(this.data.balance), Validators.required])
    });
    for (let i of this.data.chosenMatches) {
      this.formArray.push(
        new FormGroup({
          homeScore: new FormControl('', [Validators.min(0), Validators.required]),
          awayScore: new FormControl('', [Validators.min(0), Validators.required])
        })
      );
    }
  }

  get formArray() {
    return this.form.get('formArray') as FormArray;
  }

  onNoClick() {
    this.dialogRef.close('cancel');
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.dialogRef.close('invalid');
    }
  }
}
