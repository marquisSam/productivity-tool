import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'counter'
})
export class CounterPipe implements PipeTransform {

  transform(timeInSec: number, args?: any): string {
    timeInSec = timeInSec/1000;
    let min = Math.floor(timeInSec/60);
    let sec = Math.ceil(timeInSec%60);
    if (sec==60) {
      sec = 0;
      min++;
    }

    let counterTime;
    // if(args.noSec){
      // counterTime = hour + " h and " + (min - 60*hour) +" min" ;
    // }else{
      counterTime = sec < 10 ? min + ' : ' + "0" + sec : min + ' : ' + sec;
    // }

    return counterTime;
  }
}
