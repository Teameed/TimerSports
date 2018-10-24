import { NgModule } from '@angular/core';
import { RootPage } from './root';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { IonicPageModule } from 'ionic-angular';
import { TimerComponentModule } from '../../components/timer/timer.module';
import { HomePageModule } from '../home/home.module';

@NgModule({
	declarations: [RootPage],
    imports: [IonicPageModule.forChild(RootPage),
              RoundProgressModule,
              TimerComponentModule,
              HomePageModule],
	exports: [RootPage]
})
export class RootPageModule {}