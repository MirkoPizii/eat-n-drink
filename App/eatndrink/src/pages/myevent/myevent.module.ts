import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyeventPage } from './myevent';

@NgModule({
  declarations: [
    MyeventPage,
  ],
  imports: [
    IonicPageModule.forChild(MyeventPage),
  ],
  exports: [
    MyeventPage
  ]
})
export class MyeventPageModule {}
