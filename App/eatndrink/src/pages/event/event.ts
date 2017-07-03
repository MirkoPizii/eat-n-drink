import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { HomePage } from "../home/home";
import { MyeventPage } from "../myevent/myevent";
import { EventlistPage } from "../eventlist/eventlist";
import { Storage } from '@ionic/storage';
import { SearchPage } from "../search/search";

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  tab1Root = EventlistPage;
  tab2Root = MyeventPage;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public storage: Storage, public eventsCtrl: Events) {
    this.user = storage.get('user').then((value) => this.user = value);
  }

  logout() {
    this.storage.remove('user')
      .then(() => {
        this.navCtrl.setRoot(HomePage);
        this.eventsCtrl.publish('user:logout');
      });
  }

  openSearch() {
    this.navCtrl.push(SearchPage);
  }
}
