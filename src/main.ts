import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {environment} from './environments/environment';
import {getAnalytics} from "@angular/fire/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCRfebVxE-EiCXUD2GdaGtdLN4hTn-iK64",
  authDomain: "keyboard-led-48145.firebaseapp.com",
  databaseURL: "https://keyboard-led-48145-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "keyboard-led-48145",
  storageBucket: "keyboard-led-48145.appspot.com",
  messagingSenderId: "298798795263",
  appId: "1:298798795263:web:57b43d13ee33a34a0affca",
  measurementId: "G-YD8JV2ZRGZ"
};

const app = initializeApp(firebaseConfig);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
