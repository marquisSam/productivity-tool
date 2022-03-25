import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { ActionNodeService } from '../services/action-node.service';
import { CoreService } from '../services/core.service';
// import { AccordionService } from '../services/accordion.service';
import { Router } from "@angular/router"
import { Node } from '../data-model/node-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private coreService: CoreService,
    private router: Router
  ) {
    this.onFormChange = this.toolConfigForm.valueChanges.subscribe(this.formListen);
  }

  onFormChange : Subscription;
  
  estimateTimeObj;

  private fieldValidation = {
    pomodoroCount: {
      default: 2,
      min: 1,
      max: 25
    },
    wTime: {
      default: 25,
      min: 1,
      max: 60
    },
    srTime: {
      default: 5,
      min: 1,
      max: 60
    },
    lrTime: {
      default: 20,
      min: 1,
      max: 60
    },
    timeBetweenLr: {
      default: 4,
      min: 1,
      max: 25
    }
  }

  toolConfigForm = this.fb.group({
    pomodoroCount: 
      [this.fieldValidation.pomodoroCount.default, 
        [Validators.required, Validators.min(this.fieldValidation.pomodoroCount.min), Validators.max(this.fieldValidation.pomodoroCount.max)]],
    wTime: 
      [this.fieldValidation.wTime.default, 
        [Validators.required, Validators.min(this.fieldValidation.wTime.min), Validators.max(this.fieldValidation.wTime.max)]],
    srTime: 
      [this.fieldValidation.srTime.default, 
        [Validators.required, Validators.min(this.fieldValidation.srTime.min), Validators.max(this.fieldValidation.srTime.max)]],
    lrTime: 
      [this.fieldValidation.lrTime.default, 
        [Validators.required, Validators.min(this.fieldValidation.lrTime.min), Validators.max(this.fieldValidation.lrTime.max)]],
    timeBetweenLr: 
      [this.fieldValidation.timeBetweenLr.default, 
        [Validators.required, Validators.min(this.fieldValidation.timeBetweenLr.min), Validators.max(this.fieldValidation.timeBetweenLr.max)]]
  });

  resetForm = (): void => {
    this.toolConfigForm.patchValue({
      pomodoroCount: this.fieldValidation.pomodoroCount.default,
      wTime: this.fieldValidation.wTime.default,
      srTime: this.fieldValidation.srTime.default,
      lrTime: this.fieldValidation.lrTime.default,
      timeBetweenLr: this.fieldValidation.timeBetweenLr.default
    });
  }
  setFormDefault = (conf): void => {
    this.toolConfigForm.setValue({
      pomodoroCount: conf.pomodoroCount,
      wTime: conf.wTime,
      srTime: conf.srTime,
      lrTime: conf.lrTime,
      timeBetweenLr: conf.timeBetweenLr
    });
  }

  onSubmit() {
    this.onFormChange.unsubscribe();
    this.coreService.start(this.toolConfigForm.value);
    this.router.navigate(['../timeline'],{skipLocationChange: true});
  }
  formListen = (formVal): void => {
    this.estimateTime(formVal);
    localStorage.setItem('pomo-app-formconfig', JSON.stringify(formVal));
  }
  estimateTime = (conf) => {
    this.estimateTimeObj = this.coreService.createEstimate(conf);
  }
  ngOnInit() {
    let conf = localStorage.getItem('pomo-app-formconfig');
    if(conf !== null && conf !== undefined){
      this.setFormDefault(JSON.parse(conf));
    }
    this.estimateTime(this.toolConfigForm.value);
  }

}
