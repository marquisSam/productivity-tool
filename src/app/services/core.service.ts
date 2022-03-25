import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Node } from '../data-model/node-data';
import { ActionNodeService } from './action-node.service';
import { TimelineData } from '../data-model/timeline-data';

import { interval, BehaviorSubject, Subscription, fromEvent, merge, empty, Observable } from 'rxjs';
import { switchMap, scan, takeWhile, startWith, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
// recois les evenement et set ses states
export class CoreService {
  constructor(
    private translate: TranslateService,
    private actionNodeService: ActionNodeService
  ) {
      translate.setDefaultLang('fr');
      this.lang = "fr";
  }

  beepDownSound = new Audio("./assets/sounds/down.wav");
  beepUpSound = new Audio("./assets/sounds/up.wav");
  winSound = new Audio("./assets/sounds/win1.wav");

  public timeLine : Node[]; //A collection of all the work, short-rest, long-rest node
  THE_TIMER$ = interval(25);
  timer$ : Subscription;

  _CHANGE_NODE_EVENT = new BehaviorSubject(null);
  _PLAYPAUSETOGGLE = new BehaviorSubject(null);
  _FINISH = new BehaviorSubject(false);

  private subscriptions : Subscription[] = [];

  // myPlay = () => {
  //   var audio =
  //   console.log('audio',audio)
  //   audio.play();
  // }

  start = (conf) : void => {
    this.timeLine = this.actionNodeService.createTimeLine(conf);
    // this.isPlaying = true;
    this._CHANGE_NODE_EVENT.next(0);
    this._PLAYPAUSETOGGLE.next(true);
    this.playSound();
    this.timer$ = this._PLAYPAUSETOGGLE.pipe(
      startWith(true),
      switchMap(val => (val ? this.THE_TIMER$ : empty()))
    ).subscribe(this.rxjsTimerHandler);
    this.subscriptions.push(this.timer$);
  }

  getMinAndHour(timeInMili : number) : {min : number, hour : number}{
    let timeInSec = timeInMili/1000,
        min = Math.floor(timeInSec/60),
        hour = Math.floor(min/60);

        min = min - (60*hour);

    return {
      min : min,
      hour : hour
    };
  }

  createEstimate = (conf) => {
    // time tracker
    let  workTime = 0,
        pauseTime = 0,
        totalTime = 0;

    //compile time
    this.actionNodeService.createTimeLine(conf).forEach( node => {
      if(node.type === 'w'){
        workTime += (node.initialTime );
      }else if(node.type === 'sr' || node.type === 'lr'){
        pauseTime += (node.initialTime );
      }
      totalTime += node.initialTime;
    });

    return {
      workTime : this.getMinAndHour(workTime),
      pauseTime : this.getMinAndHour(pauseTime),
      totalTime : this.getMinAndHour(totalTime)
    };
  }

  private rxjsTimerHandler = () : void => {

    if(this.timeLine[this.currentNodeIndex].currentTime > 0){

      this.timeLine[this.currentNodeIndex].currentTime -= 25;

    }else if(this.timeLine[this.currentNodeIndex].currentTime <= 0){

      if(this.currentNodeIndex !== this.timeLine.length -1){

        this.nextNodeEvent();

      }else{

        this.rollCredit();

      }
    }
  }

  playSound = () : void => {
    let newNodeType = this.timeLine[this.currentNodeIndex].type;

    if(newNodeType === 'w'){
      this.beepUpSound.play();
    }else if(newNodeType === 'sr' || newNodeType === 'lr' ){
      this.beepDownSound.play();
    }else{
      this.winSound.play();
    }
  }

  private nextNodeEvent = () : void => {
    this.currentNodeIndex ++;


    this.playSound();

    this._CHANGE_NODE_EVENT.next(this.currentNodeIndex);
  }

  private rollCredit = () : void => {
    this.subscriptions.forEach(sub =>{
      sub.unsubscribe();
    })
    this._FINISH.next(true);
  }

  private _timeLineConfig : TimelineData; //The user config of "How the tool should be configured"
  get timeLineConfig() : TimelineData {
    return this._timeLineConfig;
  }
  set timeLineConfig (value) {
    this._timeLineConfig = value;
  }

  _currentNodeIndex = 0;
  get currentNodeIndex() : number {
    return this._currentNodeIndex;
  }
  set currentNodeIndex (value) {
    this._currentNodeIndex = value;
  }

  _showControl
  get showControl() : boolean {
    return this._showControl;
  }
  set showControl (value) {
    this._showControl = value;
  }

  _lang
  set lang(lang){
    this.translate.use(lang);
    this._lang = lang
  }
  get lang(){
    return this._lang
  }
}
