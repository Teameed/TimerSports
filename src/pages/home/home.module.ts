import { NgModule } from '@angular/core';
import { HomePage } from './home';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { IonicPageModule } from 'ionic-angular';
import { TimerComponentModule } from '../../components/timer/timer.module';

@NgModule({
	declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage),
              RoundProgressModule,
              TimerComponentModule
              ],
	exports: [HomePage]
})
export class HomePageModule {}