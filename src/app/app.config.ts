import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAVXAOvSnj3TNTPSVRd1TZ0gOSfzvb0Leo",
  authDomain: "ecoti-4b5b1.firebaseapp.com",
  databaseURL: "https://ecoti-4b5b1-default-rtdb.firebaseio.com",
  projectId: "ecoti-4b5b1",
  storageBucket: "ecoti-4b5b1.appspot.com",
  messagingSenderId: "527124948040",
  appId: "1:527124948040:web:f292ad5349ce796180e47d",
  measurementId: "G-SV1TT2DNHX"
};

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
    ),
    provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};