import { Component, OnInit, HostBinding } from '@angular/core';
import { ControlService } from '../../services/control.service';
import { DialogModalsService } from '../../services/dialog-modals.service';
import { AcceptComponent } from '../dialogs/accept/accept.component';

import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  constructor(
    private controlService : ControlService,
    public dialog: MatDialog,
    private dialogModalsService : DialogModalsService
  ) {}


  @HostBinding('class.hidden') get hidden() { return this._controlHidden; }

  toggleTimer = true;
  private _controlHidden = true;

  toggleHidden(){
    this._controlHidden = this._controlHidden ? false : true;
  }

  toggleBtn = () => {
    let bool = this.toggleTimer === true ?  false : true;
    this.toggleTimer = bool;
    this.controlService.togglePlaying = bool;
  }
  openDialog() {
    // const dialogRef = this.dialog.open(DialogContentExampleDialog);
    this.dialogModalsService.openConfirmDialog({});
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  ngOnInit() {}
}

@Component({
  selector: 'dialog-confirm',
  templateUrl: 'dialog-confirm.html',
})
export class DialogContentExampleDialog {}
