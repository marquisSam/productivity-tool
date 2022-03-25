import { Component, OnInit } from '@angular/core';
//import { ActionNodeService } from '../../services/action-node.service';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    //private actionNodeService: ActionNodeService
  ) {  }

  ngOnInit() {
    // let storedTimeLine = JSON.parse(localStorage.getItem('app-pomodoro-timeLine'));
    // console.log('storedTimeLine',storedTimeLine)
  }
}
