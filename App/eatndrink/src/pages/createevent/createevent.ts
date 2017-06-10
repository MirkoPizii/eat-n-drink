import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, Validator } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-createevent',
  templateUrl: 'createevent.html',
})
export class CreateeventPage {

  private event: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private fm: FormBuilder) {
    this.event = this.fm.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      price: ['', [Validators.required, Validators.minLength(1)]],
      vegetarian: [false],
      vegan: [false],
      glutenfree: [false],
      description: ['', Validators.required]
    });
  }

  submitEvent() {
    console.log(JSON.stringify(this.event.getRawValue()));
  }
}
