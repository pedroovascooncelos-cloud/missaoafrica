import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebasePublicConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
};

export function hasFirebaseClientConfig() {
  const { apiKey, authDomain, projectId, appId } = firebasePublicConfig;
  return Boolean(apiKey && authDomain && projectId && appId);
}

export function getFirebaseClientApp() {
  if (!hasFirebaseClientConfig()) {
    throw new Error("Firebase cliente não configurado.");
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    apiKey: firebasePublicConfig.apiKey,
    authDomain: firebasePublicConfig.authDomain,
    projectId: firebasePublicConfig.projectId,
    appId: firebasePublicConfig.appId,
    storageBucket: firebasePublicConfig.storageBucket || undefined,
  });
}

export function getFirebaseClientAuth() {
  return getAuth(getFirebaseClientApp());
}
