import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  timeRest: Array<number> = [0,0];
  timeReps: Array<number> = [0,0];
  max: number = 0;
  current: number = 0;
  n: number = 0;
  isPaused: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.timeReps = this.navParams.get('reps');
    this.timeRest = this.navParams.get('rest');

    this.max = this.timeReps[0]*60 + this.timeReps[1];
  }

  clock(){
    setTimeout(() =>{
      if (this.n < this.max && this.isPaused != true){
        this.current++;
        this.clock();
      }
      else{
        return;
      }
    }, 1000)
  }

  pause(){
    if (this.isPaused){
      this.isPaused = false;
      this.clock();
    }
    else{
      this.isPaused = true;
    }
  }

  stop(){
    this.current = 0;
    this.isPaused = true;
  }
}
