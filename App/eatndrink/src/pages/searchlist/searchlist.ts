import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventdetailsPage } from "../eventdetails/eventdetails";

@IonicPage()
@Component({
  selector: 'page-searchlist',
  templateUrl: 'searchlist.html',
})
export class SearchlistPage {

  events: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = this.navParams.get('eventslist');
    let counterFilter = 0;
    if (this.navParams.get('vegetarian') == 1)
      counterFilter = counterFilter+1;
    if (this.navParams.get('vegan') == 1)
      counterFilter = counterFilter+1;
    if (this.navParams.get('glutenfree') == 1)
      counterFilter = counterFilter+1;

    this.events = this.events.filter((item) => {
      if (counterFilter > 1 ) {
        return item.vegetarian == this.navParams.get('vegetarian') && item.vegan == this.navParams.get('vegan') && item.glutenfree == this.navParams.get('glutenfree');
      } else {
        return (this.navParams.get('vegetarian') == 1 && item.vegetarian == this.navParams.get('vegetarian')) || (this.navParams.get('vegan') == 1 && item.vegan == this.navParams.get('vegan')) || (this.navParams.get('glutenfree') == 1 && item.glutenfree == this.navParams.get('glutenfree'));
      }
    });
  }

  goEventPage(id, hosterToken) {
    this.navCtrl.push(EventdetailsPage, {
      'eventId': id,
      'hosterToken': hosterToken
    });
  }

}
