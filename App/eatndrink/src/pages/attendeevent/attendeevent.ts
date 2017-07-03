import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { global } from "../../app/app.module";
import { Geolocation } from '@ionic-native/geolocation';
import { FeedbackPage } from "../feedback/feedback";

@IonicPage()
@Component({
  selector: 'page-attendeevent',
  templateUrl: 'attendeevent.html',
})
export class AttendeeventPage {

  eventId: any;
  userinfo: any;
  owner: boolean;
  requestSent: boolean = false;
  eventClosed: boolean = false;
  requestConfirmed: boolean = false;
  attendees_confirmed: any;
  request_attendees: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: Http, public geolocation: Geolocation, public modalCtrl: ModalController) {
    this.eventId = navParams.get('eventId');
    this.storage.get('user').then((user) => {
      this.userinfo = user;
      this.owner = user.uid_token == this.navParams.get('hosterToken') ? true : false;
    });
    this.http.get(global.API_URL + 'event/' + this.eventId + '/confirmed_attendees')
      .map(res => res.json())
      .subscribe((data) => {
        this.attendees_confirmed = data;

        let temp_attendee = data.map(attendee => attendee.user.uid_token);
        if (temp_attendee.indexOf(this.userinfo.uid_token) !== -1) {
          this.requestConfirmed = true;
        }
      });
    this.http.get(global.API_URL + 'event/' + this.eventId + '/request_attendees')
      .map(res => res.json())
      .subscribe((data) => {
        this.request_attendees = data;

        let temp_reqattendee = data.map(attendee => attendee.user.uid_token);
        if (temp_reqattendee.indexOf(this.userinfo.uid_token) !== -1) {
          this.requestSent = true;
        }
      });
  }

  ionViewDidLoad() {
    this.http.get(global.API_URL + 'event/' + this.eventId)
      .map(res => res.json())
      .subscribe(data => {
        this.eventClosed = data.visible == "0" ? true : false;
      });
  }

  sendRequest() {
    let attendee = {};
    this.storage.get('user').then((user) => {
      attendee['event_id'] = this.eventId;
      attendee['user_token'] = user.uid_token;
      this.http.post(global.API_URL + 'attendee', attendee)
        .subscribe(newAttendee => {
          this.requestSent = true;
        });
    });
  }

  closeRequest() {
    this.http.delete(global.API_URL + 'event/' + this.eventId)
      .subscribe((data) => {
        this.eventClosed = this.eventClosed == true ? false : true;
      });
  }

  acceptAttendee(attendee) {
    let act = {
      'action': 'accept'
    };
    this.http.patch(global.API_URL + 'attendee/' + attendee.id, act)
      .subscribe(status => {
        let index = this.request_attendees.indexOf(attendee);

        if (index > -1) {
          this.request_attendees.splice(index, 1);
        }

        this.attendees_confirmed.push(attendee);
      });
  }

  refuseAttendee(attendee) {
    let act = {
      'action': 'refuse'
    };
    this.http.patch(global.API_URL + 'attendee/' + attendee.id, act)
      .subscribe(status => {
        let index = this.request_attendees.indexOf(attendee);

        if (index > -1) {
          this.request_attendees.splice(index, 1);
        }
      });
  }

  naviga() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.http.get(global.API_URL + 'event/' + this.eventId)
        .map((res) => res.json())
        .subscribe((data) => {
          window.open('https://www.google.com/maps/dir/' + resp.coords.latitude + ',' + resp.coords.longitude + '/' + data.latitude + ',' + data.longitude, '_system');
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  goFeedbackPage(to_user) {
    if (!(this.userinfo.uid_token === to_user.uid_token) && this.requestConfirmed == true) {
      let feedbackModal = this.modalCtrl.create(FeedbackPage, {
        'from_user_token': this.userinfo.uid_token,
        'to_user_name': to_user.displayName,
        'to_user_token': to_user.uid_token,
        'event_id': this.eventId
      });
      feedbackModal.present();
    }

  }

}
