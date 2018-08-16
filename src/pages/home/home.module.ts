import { NgModule } from '@angular/core';
import { HomePage } from './home';

import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage),
              RoundProgressModule],
	exports: [HomePage]
})
export class HomePageModule {}