import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeeventPage } from './attendeevent';

@NgModule({
  declarations: [
    AttendeeventPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendeeventPage),
  ],
  exports: [
    AttendeeventPage
  ]
})
export class AttendeeventPageModule {}
