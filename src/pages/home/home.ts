import { Component, ViewChild } from '@angular/core';
import { Slides, IonicPage, ModalController, AlertController, ToastController } from 'ionic-angular';
import { TimerPage } from '../timer/timer';
import { Workout } from '../../interface/workout';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  workoutSelected: Workout = {
    numberReps: 0,
    timeReps: [0,0],
    timeRest: [0,0]
  };
  cyclesSelected: Array<Workout> = [this.workoutSelected];
  numberCycle: number = 1;
  restCycle: Array<number> = [0,0]
  reset: boolean = false;


  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) {
      console.log("test");
  }

  updateWorkout(event: any){
    this.workoutSelected = event;
    this.cyclesSelected[0] = event;
  }

  valid(){
    if ((this.workoutSelected.timeReps[0] != 0 || this.workoutSelected.timeReps[1] != 0) && (this.workoutSelected.timeRest[0] != 0 || this.workoutSelected.timeRest[1] != 0) && this.workoutSelected.numberReps != 0){
      let modal = this.modalCtrl.create(
        TimerPage, {reps: this.workoutSelected.timeReps, rest: this.workoutSelected.timeRest, numberRep: this.workoutSelected.numberReps, numberCycle: this.numberCycle, restCycle: this.restCycle}
      );

      modal.onDidDismiss(() => {
        console.log("dismiss");
      });
  
      modal.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Oh no',
        message: 'Please select your workout settings',
        buttons: [
          {
            text: 'Ok'
          }
        ]
      });
      alert.present();
    }
  }

  addCycle(){
    if ((this.workoutSelected.timeReps[0] != 0 || this.workoutSelected.timeReps[1] != 0) && (this.workoutSelected.timeRest[0] != 0 || this.workoutSelected.timeRest[1] != 0) && this.workoutSelected.numberReps != 0){
      if (this.numberCycle == 1){
        let alert = this.alertCtrl.create({
          title: "Votre temps de repos entre les séries :"
        });
        alert.addInput({
          type: 'radio',
          label: '00:00',
          value: '00:00:00',
        }).addInput({
          type: 'radio',
          label: '00:30',
          value: '00:00:30',
          checked:true
        }).addInput({
          type: 'radio',
          label: '01:00',
          value: '00:01:00',
        }).addInput({
          type: 'radio',
          label: '01:30',
          value: '00:01:30',
        }).addInput({
          type: 'radio',
          label: '02:00',
          value: '00:02:00',
        }).addInput({
          type: 'radio',
          label: '02:30',
          value: '00:02:30',
        }).addInput({
          type: 'radio',
          label: '03:00',
          value: '00:03:00',
        }).addInput({
          type: 'radio',
          label: '03:30',
          value: '00:03:30',
        }).addInput({
          type: 'radio',
          label: '04:00',
          value: '00:04:00',
        }).addInput({
          type: 'radio',
          label: '04:30',
          value: '00:04:30',
        }).addInput({
          type: 'radio',
          label: '05:00',
          value: '00:05:00',
        });
        alert.addButton('Cancel');
        alert.addButton({
          text: 'Ok',
          handler: (data: string) => {
            this.restCycle[0] = parseInt(data[3]+data[4]);
            this.restCycle[1] = parseInt(data[6]+data[7]);
            this.numberCycle++;
          }
        })
        alert.present();
      }
      else{
        //this.cyclesSelected.push(this.cyclesSelected[this.cyclesSelected.length-1]);
        this.numberCycle++;
      }
    }
    else{
      let toast = this.toastCtrl.create({
        message: 'Veuillez renseignez votre programme',
        position: 'top',
        duration: 2000
      });
  
      toast.present();
    }
  }

  removeCycle(){
    if (this.numberCycle > 1){
      this.cyclesSelected.pop();
      this.numberCycle--;
    }
  }

  refresh(){
    this.workoutSelected = {
      numberReps: 0,
      timeReps: [0,0],
      timeRest: [0,0]
    }
    if(this.reset){
      this.reset = false;
    }
    else{
      this.reset = true;
    }
  }
}
