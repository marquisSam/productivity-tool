import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AcceptComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    location.reload();
  }

  ngOnInit(): void {

  }

}
