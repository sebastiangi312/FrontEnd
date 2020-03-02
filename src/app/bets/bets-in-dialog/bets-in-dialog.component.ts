import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetsListComponent } from '../bets-list/bets-list.component';

@Component({
  selector: 'app-bets-in-dialog',
  templateUrl: './bets-in-dialog.component.html',
  styleUrls: ['./bets-in-dialog.component.css']
})

export class BetsInDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BetsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      userId: string, lotteryId: string, balance: number, fare: number, chosenNumbers: number[]}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
