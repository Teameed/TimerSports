import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Workout } from '../../interface/workout';


@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent implements OnChanges{
  @Output('change') change: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Input('reset') reset: boolean;
  numberRep: number = 0;
  currentWorkout: Workout = {
    numberReps: 0,
    timeReps: [0,0],
    timeRest: [0,0]
  };
  timeReps: string;
  timeRest: string;

  constructor() {
    this.timeReps = '00:00:00';
    this.timeRest = '00:00:00';
  }

  datePicker(type: string){
    if (type == 'reps'){
      let timeSelected = [];
      timeSelected[1] = parseInt(this.timeReps[3] + this.timeReps[4]);
      timeSelected[0] = parseInt(this.timeReps[6] + this.timeReps[7]);
  
      this.currentWorkout.timeReps = timeSelected;
    }
    else{
      let timeSelected = [];
      timeSelected[1] = parseInt(this.timeRest[3] + this.timeRest[4]);
      timeSelected[0] = parseInt(this.timeRest[6] + this.timeRest[7]);
  
      this.currentWorkout.timeRest = timeSelected;
    }
    
    this.change.emit(this.currentWorkout);
  }

  addRep(){
    this.numberRep = 1 + (this.numberRep) % 99;
    this.currentWorkout.numberReps = this.numberRep;
    this.change.emit(this.currentWorkout);
  }

  removeRep(){
    if (this.numberRep <= 1){
      this.numberRep = 99
    }
    else{
      this.numberRep--;
    }

    this.currentWorkout.numberReps = this.numberRep;
    this.change.emit(this.currentWorkout);
  }

  ngOnChanges(){
    this.currentWorkout = {
      numberReps: 0,
      timeReps: [0,0],
      timeRest: [0,0]
    };
    this.timeReps = '00:00:00';
    this.timeRest = '00:00:00';
    this.numberRep = 0;
  }
}
