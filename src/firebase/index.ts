
'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

let isPersistenceEnabled = false;

export function initializeFirebase() {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  // Enable offline persistence for Electron/Browser environments
  if (typeof window !== 'undefined' && !isPersistenceEnabled) {
    isPersistenceEnabled = true;
    enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence: Multiple tabs open. Only one can have persistence enabled.');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence: The current browser does not support all of the features required to enable persistence.');
      }
    });
  }

  return { firebaseApp, firestore, auth };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
