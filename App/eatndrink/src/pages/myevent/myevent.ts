import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateeventPage } from "../createevent/createevent";

@IonicPage()
@Component({
  selector: 'page-myevent',
  templateUrl: 'myevent.html',
})
export class MyeventPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  loadMoreEvents() {
    //ToDo
  }

  addEventPage() {
    this.navCtrl.parent.parent.push(CreateeventPage)
  }

  goEventPage(event) {
    //ToDo
  }
}
