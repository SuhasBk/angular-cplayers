import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stats-dialog',
  templateUrl: './stats-dialog.component.html',
  styleUrls: ['./stats-dialog.component.css']
})
export class StatsDialogComponent {

  stats: any;

  constructor(public dialogRef: MatDialogRef<StatsDialogComponent>, @Inject(MAT_DIALOG_DATA) public source: BehaviorSubject<any>) {

    this.source.subscribe(data => {
      this.stats = data;
    }, err => {
      console.log(err);
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.source.next(null);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
