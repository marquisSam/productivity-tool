import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AcceptComponent} from '../parts/dialogs/accept/accept.component';

@Injectable({
  providedIn: 'root'
})
export class DialogModalsService {

  constructor(private dialog: MatDialog) { }
  

  openConfirmDialog = (someData : {}): void => {
    const dialogRef = this.dialog.open(AcceptComponent, {
      // width: '80%',
      // height: '80vh',
      // disableClose: true,
      // data: someData
    });
    
    dialogRef.afterClosed().subscribe(result => { });
   
  }
}
