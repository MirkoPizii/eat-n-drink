import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { global } from "../../app/app.module";
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html',
})
export class CreateeventPage {

  private event: FormGroup;
  user: any;
  eventId: any;
  submit: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fm: FormBuilder, public http: Http, public storage: Storage, public geolocation: Geolocation, public eventsCtrl: Events) {
    this.event = this.fm.group({
      name: ['', Validators.required],
      price: [1, [Validators.required, Validators.minLength(1)]],
      vegetarian: [false],
      vegan: [false],
      glutenfree: [false],
      description: ['', Validators.required]
    });
    this.eventId = navParams.get('eventId');
    this.user = storage.get('user').then((value) => this.user = value);
    this.submit = false;
  }

  ionViewDidLoad() {
    if (this.eventId) {
      this.http.get(global.API_URL + 'event/' + this.eventId)
        .map(res => res.json())
        .subscribe((data) => {
          this.event.setValue({
            name: data.name,
            price: data.price,
            vegetarian: data.vegetarian == 1 ? true : false,
            vegan: data.vegan == 1 ? true : false,
            glutenfree: data.glutenfree == 1 ? true : false,
            description: data.description
          });
        });
    }
  }

  submitEvent() {
    this.submit = true;
    if (this.eventId) {
      let updateEvent = this.event.getRawValue();
      this.http.patch(global.API_URL + 'event/' + this.eventId, updateEvent)
        .subscribe(newEvent => {
          this.eventsCtrl.publish('event:changed');
          this.navCtrl.pop();
        });
    } else {
      let options = {
        enableHighAccuracy: true
      };
      this.geolocation.getCurrentPosition(options).then((resp) => {
        let newevent = this.event.getRawValue();
        newevent.user_uid_token = this.user.uid_token;
        newevent.latitude = resp.coords.latitude;
        newevent.longitude = resp.coords.longitude;
        this.http.post(global.API_URL + 'event/', newevent)
          .subscribe(newEvent => {
            this.eventsCtrl.publish('event:changed');
            this.submit = false;
            this.navCtrl.pop();
          });
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }
  }
}
