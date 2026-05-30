'use client';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase() {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  // Enable offline persistence for Desktop App experience
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Persistence failed: Multiple tabs open.');
      } else if (err.code === 'unimplemented') {
        console.warn('Persistence not supported by browser.');
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
