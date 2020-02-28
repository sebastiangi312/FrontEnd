import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: "app-charge-money",
  templateUrl: "./charge-money.component.html",
  styleUrls: ["./charge-money.component.css"]
})
export class ChargeMoneyComponent {
  constructor(
    public dialogRef: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
