'use client';
import React, { ReactNode, useMemo } from 'react';
import { FirebaseProvider } from './provider';
import { initializeFirebase } from './index';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export const FirebaseClientProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // Initialize Firebase only on the client
  const firebase = useMemo(() => initializeFirebase(), []);

  return (
    <FirebaseProvider 
      firebaseApp={firebase.firebaseApp} 
      firestore={firebase.firestore} 
      auth={firebase.auth}
    >
      <FirebaseErrorListener />
      {children}
    </FirebaseProvider>
  );
};
