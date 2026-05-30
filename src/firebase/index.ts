
'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

let isPersistenceEnabled = false;

export function initializeFirebase() {
  // Ensure we don't initialize multiple times
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  // Persistence is only for client-side browsers and avoids hanging in SSR
  if (typeof window !== 'undefined' && !isPersistenceEnabled) {
    isPersistenceEnabled = true;
    enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence: Multiple tabs open.');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence: Browser not supported.');
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
