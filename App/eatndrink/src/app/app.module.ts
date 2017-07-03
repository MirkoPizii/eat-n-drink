import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventlistPage } from "../pages/eventlist/eventlist";
import { MyeventPage } from "../pages/myevent/myevent";
import { CreateeventPage } from "../pages/createevent/createevent";

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuth } from "angularfire2/auth"
import { Http, HttpModule } from '@angular/http';
import { IonicStorageModule } from "@ionic/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { SearchPage } from "../pages/search/search";
import { SearchlistPage } from "../pages/searchlist/searchlist";
import { EventdetailsPage } from "../pages/eventdetails/eventdetails";
import { ShoweventPage } from "../pages/showevent/showevent";
import { AttendeeventPage } from "../pages/attendeevent/attendeevent";
import { LooparrayPipe } from '../pipes/looparray/looparray';
import { FeedbackPage } from "../pages/feedback/feedback";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { EventPage } from "../pages/event/event";

export const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "MESSAGING_SENDER_ID"
};

export var global = {
  'API_URL': 'https://API_URL/'
};

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventlistPage,
    MyeventPage,
    CreateeventPage,
    SearchPage,
    SearchlistPage,
    EventdetailsPage,
    ShoweventPage,
    AttendeeventPage,
    LooparrayPipe,
    FeedbackPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventlistPage,
    MyeventPage,
    CreateeventPage,
    SearchPage,
    SearchlistPage,
    EventdetailsPage,
    ShoweventPage,
    AttendeeventPage,
    FeedbackPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    IonicStorageModule,
    Geolocation,
    InAppBrowser,
  ]
})
export class AppModule {}
