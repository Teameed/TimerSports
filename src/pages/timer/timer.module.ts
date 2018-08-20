import { NgModule } from '@angular/core';
import { TimerPage } from './timer';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [TimerPage],
    imports: [IonicPageModule.forChild(TimerPage),
              RoundProgressModule],
	exports: [TimerPage]
})
export class TimerPageModule {}