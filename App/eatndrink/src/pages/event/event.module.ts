import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "@ngx-translate/core";
import { EventPage } from "./event";

@NgModule({
  declarations: [
    EventPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPage),
    TranslateModule.forChild(EventPage)
  ],
  exports: [
    EventPage
  ]
})
export class EventPageModule {}
