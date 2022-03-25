import { Injectable } from '@angular/core';
import { TimelineData } from '../data-model/timeline-data';
import { Node } from '../data-model/node-data';

@Injectable({
  providedIn: 'root'
})

export class ActionNodeService {
  constructor(){}

  private nodeLength : number = 0;

  private createNode = (data:TimelineData, nodeType : string ) : Node => {

    let node = <any>{};

    let time = (data[nodeType+'Time'])*60*1000;

    node.type = nodeType;
    node.initialTime = time || 0;
    node.currentTime = time || 0;
    node.index = this.nodeLength;
    node.id = "node-"+ this.nodeLength;
    this.nodeLength++;
    return node;
  }

  createTimeLine = (data : TimelineData): Node[] => {
    this.nodeLength = 0;

    let numberOfPomodoro: number = data.pomodoroCount;
    let timeLine : Node[] = [];

    let i = 1;
    for (i; i <= numberOfPomodoro; i++) {

      if (i === numberOfPomodoro) {
        //Will alway End by the last "Work" node, followed the the Goal Node
        timeLine.push(this.createNode(data, "w"));
        timeLine.push(this.createNode(data, "g"));
      }
      else if (i % data.timeBetweenLr !== 0) {
        //The timeBetweenLr var is the number of work//short-rest sessions you will take before a work//long-rest session, can be modified by the user
        //If the total work session divided by the timeBetweenLr does NOT equal 0, will set it as Short rest
        timeLine.push(this.createNode(data, "w"));
        timeLine.push(this.createNode(data, "sr"));
      }
      else if (i % data.timeBetweenLr === 0) {
        //If the total work session divided by the timeBetweenLr does equal 0, will set it as Short rest
        timeLine.push(this.createNode(data, "w"));
        timeLine.push(this.createNode(data, "lr"));
      }
    }
    return timeLine;
  }
}