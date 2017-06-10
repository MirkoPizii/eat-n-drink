import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventlistPage } from "../pages/eventlist/eventlist";
import { MyeventPage } from "../pages/myevent/myevent";
import { CreateeventPage } from "../pages/createevent/createevent"

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventlistPage,
    MyeventPage,
    CreateeventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventlistPage,
    MyeventPage,
    CreateeventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
