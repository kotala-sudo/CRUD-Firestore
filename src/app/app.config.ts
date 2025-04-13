import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { routes } from './app.routes';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: "AIzaSyBRaNQ4DlRayamHnL0Ln-yUY5t7fSnuRA4",
  authDomain: "crud-firestore-project.firebaseapp.com",
  projectId: "crud-firestore-project",
  storageBucket: "crud-firestore-project.firebasestorage.app",
  messagingSenderId: "750156576536",
  appId: "1:750156576536:web:efe0ca0943d5c9aefe106d"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }  
  ]
}; 
