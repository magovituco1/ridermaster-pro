'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

// Global flag to prevent multiple persistence enablement attempts
let isPersistenceEnabled = false;

export function initializeFirebase() {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  // Enable offline persistence only once on the client
  if (typeof window !== 'undefined' && !isPersistenceEnabled) {
    isPersistenceEnabled = true;
    enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time.
        console.warn('Firestore persistence failed: Multiple tabs open.');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence is not supported by this browser.');
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
