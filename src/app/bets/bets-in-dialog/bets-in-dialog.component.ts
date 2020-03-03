import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetsListComponent } from '../bets-list/bets-list.component';
import { FormControl, Validators, Form, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bets-in-dialog',
  templateUrl: './bets-in-dialog.component.html',
  styleUrls: ['./bets-in-dialog.component.css']
})

export class BetsInDialogComponent implements OnInit {
  form: FormGroup;
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BetsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userId: string, lotteryId: string, balance: number, fare: number}) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      first: new FormControl('', [Validators.min(0), Validators.max(45), Validators.required]),
      second: new FormControl('', [Validators.min(0), Validators.max(45), Validators.required]),
      third: new FormControl('', [Validators.min(0), Validators.max(45), Validators.required]),
      fourth: new FormControl('', [Validators.min(0), Validators.max(45), Validators.required]),
      fifth: new FormControl('', [Validators.min(0), Validators.max(45), Validators.required]),
    });
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
