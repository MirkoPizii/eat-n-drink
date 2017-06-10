import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from "../home/home";
import { MyeventPage } from "../myevent/myevent";
import { EventlistPage } from "../eventlist/eventlist";

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  tab1Root = EventlistPage;
  tab2Root = MyeventPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  logout() {
    //ToDo
    // Temporary go to initial page
    this.navCtrl.setRoot(HomePage);
  }

  openSearch() {
    //ToDo
  }
}
