import { Component, ViewChild, ElementRef } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { global } from "../../app/app.module";

declare var google;

@IonicPage()
@Component({
  selector: 'page-showevent',
  templateUrl: 'showevent.html',
})
export class ShoweventPage {

  event: any;
  map: any;
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public eventsCtrl: Events) {
    this.http.get(global.API_URL + 'event/' + this.navParams.get('eventId'))
      .map((res) => res.json())
      .subscribe((data) => {
        this.event = data;
        this.event.description = this.event.description.replace(/\n/g, '<br />');
        this.initMap();
      });
    eventsCtrl.subscribe('event:changed', () => {
      this.http.get(global.API_URL + 'event/' + this.navParams.get('eventId'))
        .map((res) => res.json())
        .subscribe((data) => {
          this.event = data;
          this.event.description = this.event.description.replace(/\n/g, '<br />');
        });
    });
  }

  initMap() {
    let latLng = new google.maps.LatLng(this.event.latitude, this.event.longitude);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      draggable: false,
      scrollwheel: false,
      zoomControl: false,
      clickableIcons: false
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let circle1 = new google.maps.Circle({
      center: latLng,
      map: this.map,
      radius: 150,
      fillColor: '#6b00aa',
      strokeColor: '#6b00aa',
      fillOpacity: 0.35,
      strokeOpacity: 0.5,
      strokeWeight: 1
    });

  }

}
