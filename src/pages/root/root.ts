import { Component, ViewEncapsulation } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
  encapsulation: ViewEncapsulation.None,
})
export class RootPage {
  root = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootPage');
  }

}
