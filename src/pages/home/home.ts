import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, ModalController, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  numberRep: number = 0;
  timesInS: Array<string> = ['00','05','10','15','20','25','30','35','40','45','50','55'];
  timesInM: Array<string> = ['00','01','02','03','04','05','06','07','08','09','10'];

  timeSelected: Array<number> = [0,0];
  timeSelectedRest: Array<number> = [0,0];
  @ViewChild('secSlide') secSlide: Slides;
  @ViewChild('minSlide') minSlide: Slides;
  @ViewChild('secSlideRest') secSlideRest: Slides;
  @ViewChild('minSlideRest') minSlideRest: Slides;


  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController
    ) {
  }

  slideSwapM(type: string){
    if (type == 'reps'){
      this.timeSelected[0] = parseInt(this.timesInM[this.minSlide.getActiveIndex()]);
      this.secSlide.slideTo(0);
    }
    else{
      this.timeSelectedRest[0] = parseInt(this.timesInM[this.minSlideRest.getActiveIndex()]);
      this.secSlideRest.slideTo(0);
    }
  }
  slideSwapS(type: string){
    if (type == 'reps'){
      this.timeSelected[1] = parseInt(this.timesInS[this.secSlide.getActiveIndex()]);
    }
    else{
      this.timeSelectedRest[1] = parseInt(this.timesInS[this.secSlideRest.getActiveIndex()]);
    }
  }

  valid(){
    let timeReps = this.timeSelected;
    let timeRest =  this.timeSelectedRest;
    let numberRep = this.numberRep;

    this.navCtrl.push('TimerPage', {reps: timeReps, rest: timeRest, nbrRep: numberRep});
    /*this.modalCtrl.create(
      TimerPage, {reps: timeReps, rest: timeRest, nbrRep: numberRep}
    ).present();*/
  }
}
