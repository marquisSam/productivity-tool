import { Component, OnInit } from '@angular/core';
import {CoreService } from '../../services/core.service'
import { Node } from '../../data-model/node-data';

@Component({
  selector: 'app-mini-timer',
  templateUrl: './mini-timer.component.html',
  styleUrls: ['./mini-timer.component.scss']
})
export class MiniTimerComponent implements OnInit {
  constructor(public coreService : CoreService) { }

  currentNode : Node;

  ngOnInit(): void {
    this.currentNode = this.coreService.timeLine[0]
    this.coreService._CHANGE_NODE_EVENT.subscribe(nodeIndex => {
      this.currentNode = this.coreService.timeLine[nodeIndex];
    });
  }
}
