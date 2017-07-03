import { Component } from '@angular/core';
import { AlertController, NavController, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { EventPage } from "../event/event";
import { Http } from '@angular/http';
import { global } from "../../app/app.module";
import { Storage } from '@ionic/storage';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: Observable<firebase.User>;
  alertValueTranslated: any;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth, public http: Http, public storage: Storage, public translate: TranslateService, public alertCtrl: AlertController, public eventsCtrl: Events) {
    this.user = afAuth.authState;
    this.alertValueTranslated = {};
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang);
    eventsCtrl.subscribe('user:logout', () => {
      this.afAuth.auth.signOut();
    });
  }

  ionViewWillEnter() {
    this.translate.get('USER_EXISTS_TITLE')
      .subscribe(value => {
        this.alertValueTranslated['title'] = value;
      });
    this.translate.get('USER_EXISTS_MESSAGE')
      .subscribe(value => {
        this.alertValueTranslated['description'] = value;
      });
  }

  login(provider) {
    if (provider == 'facebook') {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
        .then(() => {
          this.afAuth.auth.getRedirectResult()
            .then((result) => {
              let newuser = {
                'displayName': result.user.displayName,
                'photoURL': result.user.photoURL,
                'email': result.user.email,
                'provider': result.user.providerId,
                'uid_token': result.user.uid
              };
              this.http.post(global.API_URL + 'user/', newuser)
                .subscribe(() => {
                  this.storage.set('user', result.user);
                  this.openPage('EventPage');
                });
            });
        })
        .catch(error => {
          switch (error['code']) {
            case 'auth/account-exists-with-different-credential':
              let alert = this.alertCtrl.create({
                title: this.alertValueTranslated.title,
                message: this.alertValueTranslated.description,
                buttons: ['OK']
              });
              alert.present();
              break;
          }
        });
    } else if (provider == 'twitter') {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider())
        .then(() => {
          this.afAuth.auth.getRedirectResult()
            .then((result) => {
              let newuser = {
                'displayName': result.user.displayName,
                'photoURL': result.user.photoURL,
                'email': result.user.email,
                'provider': result.user.providerId,
                'uid_token': result.user.uid
              };
              this.http.post(global.API_URL + 'user/', newuser)
                .subscribe(() => {
                  this.storage.set('user', result.user);
                  this.openPage('EventPage');
                });
            });
        })
        .catch(error => {
          switch (error['code']) {
            case 'auth/account-exists-with-different-credential':
              let alert = this.alertCtrl.create({
                title: this.alertValueTranslated.title,
                message: this.alertValueTranslated.description,
                buttons: ['OK']
              });
              alert.present();
              break;
          }
        });
    } else if (provider == 'google') {
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
        .then(() => {
          this.afAuth.auth.getRedirectResult()
            .then((result) => {
              let newuser = {
                'displayName': result.user.displayName,
                'photoURL': result.user.photoURL,
                'email': result.user.email,
                'provider': result.user.providerId,
                'uid_token': result.user.uid
              };
              this.http.post(global.API_URL + 'user/', newuser)
                .subscribe(() => {
                  this.storage.set('user', result.user);
                  this.openPage('EventPage');
                });
            });
        })
        .catch(error => {
          switch (error['code']) {
            case 'auth/account-exists-with-different-credential':
              let alert = this.alertCtrl.create({
                title: this.alertValueTranslated.title,
                message: this.alertValueTranslated.description,
                buttons: ['OK']
              });
              alert.present();
              break;
          }
        });
    }
  }

  ionViewDidLoad() {
    this.storage.get("user").then((value) => {
      if (value != null) {
        this.openPage('EventPage');
      } else {
        this.user.subscribe((result) => {
          if (result != null) {
            let newuser = {
              'displayName': result.displayName,
              'photoURL': result.photoURL,
              'email': result.email,
              'provider': result.providerId,
              'uid_token': result.uid
            };
            this.http.post(global.API_URL + 'user/', newuser)
              .subscribe(() => {
                this.storage.set('user', newuser);
                this.openPage('EventPage');
              });
          }
        });
      }
    });
  }

  openPage(page, extra_data?) {
    this.navCtrl.setRoot(page, extra_data);
  }

}
