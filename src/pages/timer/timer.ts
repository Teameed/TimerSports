import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {

  timeRest: Array<number> = [0,0];
  timeReps: Array<number> = [0,0];
  max: number = 0;
  current: number = 0;
  duration: number = 100;
  n: number = 0;
  isPaused: boolean = true;
  numberOfReps: number = 0;
  state: string = "repsTime";
  currentScreenMin: number = 0;
  currentScreenSec: number = 0;
  clockwise: boolean = true;
  animation: string = "linearEase";
  timeout: number;
  numberCycle: number = 1;
  restCycle: Array<number> = [0,0];
  currentCycle: number = 1;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController) {
      this.timeReps = this.navParams.get('reps');
      this.timeRest = this.navParams.get('rest');
      this.numberOfReps = this.navParams.get('numberRep');
      this.numberCycle = this.navParams.get('numberCycle');
      this.restCycle = this.navParams.get('restCycle');

      this.max = this.timeReps[0]*60 + this.timeReps[1];
      
  }

  ionViewWillEnter(){
    this.currentScreenMin = this.timeReps[0];
    this.currentScreenSec = this.timeReps[1];
  }

  pause(){
    if (this.isPaused){
      console.log(this.isPaused);
      this.isPaused = false;
      this.clock2();
    }
    else{
      clearInterval(this.timeout);
      this.isPaused = true;
    }
  }

  clock2(){
    this.timeout = setInterval(() => {
        if (this.current < this.max && this.isPaused != true){
          this.current += 0.1;
          this.current = Math.round(this.current*100)/100;
          if (this.current % 1 == 0){
            this.refreshScreenTime();
          }
        }
        else{
          if (!this.isPaused){
            clearInterval(this.timeout);
            this.changeState();
          }
        }
    }, 100);
  }

  stop(){
    clearInterval(this.timeout);
    this.isPaused = true;
    let alert = this.alertCtrl.create({
      title: 'Ready for another one ?',
      message: 'Do you want to restart this activity ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('check no');
          }
        },
        {
          text: 'Yes, totally !',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        }
      ]
    });

    alert.present();
  }

  changeState(){
    this.current = 0;
    if (this.state == "repsTime"){
        this.state = "restTime";
        if (this.numberOfReps > 1){
          this.currentScreenMin = this.timeRest[0];
          this.currentScreenSec = this.timeRest[1];
          this.numberOfReps--;
          this.max = this.timeRest[0]*60 + this.timeRest[1];
          this.clock2();
        }
        else{
          if (this.numberCycle > 1 && this.currentCycle < this.numberCycle){
            this.currentCycle++;
            this.numberOfReps = this.navParams.get('numberRep');
            this.max = this.restCycle[0]*60 + this.restCycle[1];
            this.currentScreenMin = this.restCycle[0];
            this.currentScreenSec = this.restCycle[1];
            this.clock2();
          }
          else{
            this.reset();
          }
        }
    }
    else{
        this.state = "repsTime";
        if (this.numberOfReps > 0){
          this.currentScreenMin = this.timeReps[0];
          this.currentScreenSec = this.timeReps[1];
          this.max = this.timeReps[0]*60 + this.timeReps[1];
          this.clock2();
        }
        else{
          //this.reset();
        }
    }
  }

  reset(){
    this.clockwise = true;
    this.state = "repsTime";
    this.current = 0;
    this.isPaused = true;
    this.numberOfReps = this.navParams.get('numberRep');
    this.max = this.timeReps[0]*60 + this.timeReps[1];
    this.currentScreenMin = this.timeReps[0];
    this.currentScreenSec = this.timeReps[1];
          
  }

  refreshScreenTime(){
    if (this.currentScreenSec > 0){
      this.currentScreenSec--;
    }
    else{
      this.currentScreenMin--;
      this.currentScreenSec = 59;
    }
  }
}
