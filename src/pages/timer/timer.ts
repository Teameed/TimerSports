import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {
  constTime: Array<number> = [0,0,0,0];
  timeRest: Array<number> = [0,0];
  timeReps: Array<number> = [0,0];
  screenTime: Array<number> = [0,0];
  limitReps: number = 0;
  limitRest: number = 0;
  limitNumberRep: number = 0;


  current: number = 0;
  max: number = 0;
  n: number = 0;
  isPaused: boolean = true;
  state: string = 'reps';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController
  ) {

      let timeReps = this.navParams.get('reps');
      let timeRest = this.navParams.get('rest');
      this.limitNumberRep = this.navParams.get('nbrRep');

      this.constTime[0] = timeReps[0];
      this.constTime[1] = timeReps[1];
      this.constTime[2] = timeRest[0];
      this.constTime[3] = timeRest[1];
      this.screenTime = [this.constTime[0], this.constTime[1]];

      this.limitReps = timeReps[0] * 60 + timeReps[1];
      this.limitRest = timeRest[0] * 60 + timeRest[1];
      this.max = this.limitReps;
  }

  clock(){
    setTimeout(() =>{
      if (this.state == 'reps'){
        if (this.current < this.limitReps && this.isPaused != true){
          this.current++;
          this.refreshTime();
          this.clock();
        }
        else{
          this.current = 0;
          this.max = this.limitRest;
          this.state = 'rest';
          if (this.n < this.limitNumberRep){
            this.screenTime = [this.constTime[2], this.constTime[3]];
            this.clock();
          }
          else{
            this.finish();
            return;
          }
        }
      }
      else{
        if (this.current < this.limitRest && this.isPaused != true){
          this.current++;
          this.refreshTime();
          this.clock();
        }
        else{
          this.n++;
          this.current = 0;
          this.state = 'reps';
          this.max = this.limitReps;
          if (this.n < this.limitNumberRep){
            this.screenTime = [this.constTime[0], this.constTime[1]];
            this.clock();
          }
          else{
            this.finish();
            return;
          }
        }
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

    this.screenTime = [this.constTime[0], this.constTime[1]];
  }

  finish(){
    let alert = this.alertCtrl.create({
      title: 'Congratulations',
      message: 'You just finished your training, do you want to restart ?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.reset();
        }
      },{
        text: 'No',
        handler: () => {
          this.goBack();
        }
      }] 
    });
    alert.present();
  }

  goBack(){
    this.viewCtrl.dismiss();
  }

  reset(){
    //ici function for reset
  }

  refreshTime(){
    if (this.state == 'reps'){
      if (this.screenTime[1] > 0){
        this.screenTime[1] -= 1;
      }
      else{
        this.screenTime[0] -= 1;
        this.screenTime[1] = 59;
      }
    }
    else{
      if (this.screenTime[1] > 0){
        this.screenTime[1] -= 1;
      }
      else{
        this.screenTime[0] -= 1;
        this.screenTime[1] = 59;
      }
    }
  }
}
