import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
})
export class EventlistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loadMoreEvents() {
    //ToDo
  }

  goEventPage(event) {
    //ToDo
  }
}
