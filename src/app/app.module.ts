import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { WheelSelector } from '@ionic-native/wheel-selector';

import { MyApp } from './app.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NumberToString } from '../filters/numberToString';
import { HomePageModule } from '../pages/home/home.module';
import { RootPageModule } from '../pages/root/root.module';
import { TimerPage } from '../pages/timer/timer';

@NgModule({
  declarations: [
    MyApp,
    NumberToString,
    TimerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
    HomePageModule,
    RootPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TimerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WheelSelector
  ]
})
export class AppModule {}
