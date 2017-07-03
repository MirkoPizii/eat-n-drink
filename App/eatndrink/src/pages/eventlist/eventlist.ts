import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import "rxjs/add/operator/map";
import { Storage } from '@ionic/storage';
import { Http } from "@angular/http";
import { global } from "../../app/app.module";
import { Geolocation } from '@ionic-native/geolocation';
import { EventdetailsPage } from "../eventdetails/eventdetails";

@IonicPage()
@Component({
  selector: 'page-eventlist',
  templateUrl: 'eventlist.html',
})
export class EventlistPage {

  events: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public geolocation: Geolocation, public eventsCtrl: Events) {
    this.user = storage.get('user');
    eventsCtrl.subscribe('event:changed', () => {
      this.getEvents();
    });
  }

  ionViewWillEnter() {
    this.getEvents();
  }

  getEvents() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.http.get(global.API_URL + 'event/coords/' + resp.coords.latitude + '/' + resp.coords.longitude + '/50')
        .map(res => res.json())
        .subscribe((data) => {
          this.events = data;
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goEventPage(id, hosterToken) {
    this.navCtrl.parent.parent.push(EventdetailsPage, {
      'eventId': id,
      'hosterToken': hosterToken
    });
  }


}
