import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { global } from "../../app/app.module";
import { SearchlistPage } from "../searchlist/searchlist";

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  private event: FormGroup;
  search: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, private fm: FormBuilder, public http: Http) {
    this.event = this.fm.group({
      km: [50, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]],
      vegetarian: [false],
      vegan: [false],
      glutenfree: [false],
    });
  }

  submitSearch() {
    this.search = true;
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      let search = this.event.getRawValue();
      let km_to_miles = search.km * 0.62;
      this.http.get(global.API_URL + 'event/coords/' + resp.coords.latitude + '/' + resp.coords.longitude + '/' + km_to_miles)
        .map(res => res.json())
        .subscribe((searchEvent) => {
          this.search = false;
          this.navCtrl.push(SearchlistPage, {
            'eventslist': searchEvent,
            'vegetarian': search.vegetarian,
            'vegan': search.vegan,
            'glutenfree': search.glutenfree
          });
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}
