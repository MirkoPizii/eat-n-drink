import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateeventPage } from "../createevent/createevent";
import * as firebase from "firebase/app";
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { global } from "../../app/app.module";
import 'rxjs/add/operator/map';
import { EventdetailsPage } from "../eventdetails/eventdetails";

@IonicPage()
@Component({
  selector: 'page-myevent',
  templateUrl: 'myevent.html',
})
export class MyeventPage {

  myevents: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public eventsCtrl: Events) {
    this.user = storage.get('user');
    eventsCtrl.subscribe('event:changed', () => {
      this.getMyEvents();
    });
  }

  ionViewWillEnter() {
    this.getMyEvents();
  }

  getMyEvents() {
    this.user.then((value) => {
      this.http.get(global.API_URL + 'event/events-as-cook/' + value.uid_token)
        .map(res => res.json())
        .subscribe((data) => {
          this.myevents = data;
        });
    });
  }

  addEventPage() {
    this.navCtrl.parent.parent.push(CreateeventPage);
  }

  goEventPage(id, hosterToken) {
    this.navCtrl.parent.parent.push(EventdetailsPage, {
      'eventId': id,
      'hosterToken': hosterToken
    });
  }
}
