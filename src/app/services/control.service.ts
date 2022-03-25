import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(private coreService : CoreService) { }

  set togglePlaying(bool){
    this.coreService._PLAYPAUSETOGGLE.next(bool); 
  }

  reload = () => {
    
  }
}
