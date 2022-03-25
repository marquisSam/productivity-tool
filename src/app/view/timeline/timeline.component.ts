import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CoreService } from '../../services/core.service';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

	constructor(
		public coreService: CoreService
	) { }


	// test purpose
	private testConfig  = {
		wTime: 1,
		srTime: 1,
		lrTime: 1,
		pomodoroCount: 6,
		timeBetweenLr: 4
	}
	
	ngOnInit() {
		// test purpose
		// this.actionNodeService.createTimeLine(this.testConfig);
	}
}
