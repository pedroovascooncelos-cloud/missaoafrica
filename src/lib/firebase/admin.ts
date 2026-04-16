import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { appEnv, hasFirebaseAdminConfig } from "@/lib/env";

function getAdminApp() {
  if (!hasFirebaseAdminConfig()) {
    throw new Error("Firebase Admin não configurado.");
  }

  const existing = getApps()[0];
  if (existing) {
    return existing;
  }

  return initializeApp({
    credential: cert({
      projectId: appEnv.firebaseAdmin.projectId,
      clientEmail: appEnv.firebaseAdmin.clientEmail,
      privateKey: appEnv.firebaseAdmin.privateKey,
    }),
  });
}

export function getAdminAuth() {
  return getAuth(getAdminApp());
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
