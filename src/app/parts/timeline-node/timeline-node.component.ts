import { Component, OnInit, Input, HostBinding, ɵConsole } from '@angular/core';
import { CoreService } from '../../services/core.service';

import { interval, BehaviorSubject, Subscription, fromEvent, merge, empty } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

@Component({
  selector: 'app-timeline-node',
  templateUrl: './timeline-node.component.html',
  styleUrls: ['./timeline-node.component.scss']
})

export class TimelineNodeComponent implements OnInit {
  @Input() nodeData;
  @Input() nodeRadius : number; 
  @Input() nodeStrokeWidth : number; 

  constructor(
    public coreService : CoreService
  ) {}

  // Status
  private isActiveNode : boolean;
  setGoalAtteined : boolean; // for the goal node
  
  private subscriptions : Subscription[] = [];
  
  // svg circle
  radius : number;
  strokeWidth: number;
  viewBox: number;
  cxCy : number;
  circumference : number;
  offSet : number;
  initialRotate : number = -90;
  reduceByTurn : number;
  
  
  //timer speed

  private createSvgCircle = (radius : number, strokeWidth: number) : void => {
    let viewBox = radius*2 + (strokeWidth),
        cxCy = viewBox/2,
        circumference = Math.round(2*Math.PI*radius);

    this.radius = radius;
    this.strokeWidth = strokeWidth;
    this.viewBox = viewBox;
    this.cxCy = cxCy;
    this.circumference = circumference;
    this.offSet = circumference;
  }

  calculateAnimation(){
    const fps = 25;
    let circumference = this.circumference,
        initialTime = this.coreService.timeLine[this.nodeData.index].initialTime,
        rotation = initialTime/fps;
    this.reduceByTurn = (circumference/rotation);
  };

  private animation = () : void => {
    if(this.isActiveNode){
    
      if(this.offSet <= 0 ){

        this.theEndHehehehe();

      }else{
        this.offSet -= this.reduceByTurn;
      }
    }
  }

  theEndHehehehe = () => {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  ngOnInit() {
    
    this.createSvgCircle(this.nodeRadius, this.nodeStrokeWidth);
    this.calculateAnimation();

    let nextNodeSubs$ : Subscription = this.coreService._CHANGE_NODE_EVENT.subscribe(nodeIndex => {
      this.isActiveNode = this.nodeData.index === nodeIndex ? true : false;
    })
    this.subscriptions.push(nextNodeSubs$);

    let timer$ : Subscription = this.coreService._PLAYPAUSETOGGLE.pipe(
      startWith(true),
      switchMap(val => (val ? this.coreService.THE_TIMER$ : empty()))
    ).subscribe(this.animation);
    this.subscriptions.push(timer$);

  }
}
