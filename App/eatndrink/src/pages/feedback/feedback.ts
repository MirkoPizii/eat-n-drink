import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { global } from "../../app/app.module";
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  event_id: number;
  from_user_token: string;
  to_user_token: string;
  to_user_name: string;
  rating: number;
  submitted: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController) {
    this.event_id = this.navParams.get('event_id');
    this.from_user_token = this.navParams.get('from_user_token');
    this.to_user_name = this.navParams.get('to_user_name');
    this.to_user_token = this.navParams.get('to_user_token');
    this.rating = 1;
    this.submitted = false;
  }

  changeRating(number) {
    this.rating = number;
  }

  submitFeedback() {
    this.submitted = true;
    let feedback = {
      'event_id': this.event_id,
      'from_user_token': this.from_user_token,
      'to_user_token': this.to_user_token,
      'rating': this.rating,
    };
    this.http.post(global.API_URL + 'feedback/', feedback)
      .subscribe(feedback => {
        this.submitted = false;
        this.viewCtrl.dismiss();
      });
  }
}
