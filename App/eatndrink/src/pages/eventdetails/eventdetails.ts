import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoweventPage } from "../showevent/showevent";
import { AttendeeventPage } from "../attendeevent/attendeevent";
import { CreateeventPage } from "../createevent/createevent";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {

  tab1Root = ShoweventPage;
  tab1Params: any;
  tab2Root = AttendeeventPage;
  eventId: any;
  owner: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
    this.eventId = navParams.get('eventId');
    this.storage.get('user').then((user) => {
      this.owner = user.uid_token == this.navParams.get('hosterToken') ? true : false;
    });
    this.tab1Params = {
      'eventId': this.eventId,
      'hosterToken': navParams.get('hosterToken')
    };
  }

  editEvent() {
    this.navCtrl.push(CreateeventPage, {
      'eventId': this.eventId
    });
  }

}
