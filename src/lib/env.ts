function readString(name: string) {
  return process.env[name]?.trim() || "";
}

function readBoolean(name: string, fallback = false) {
  const value = readString(name).toLowerCase();

  if (!value) {
    return fallback;
  }

  return value === "1" || value === "true" || value === "yes";
}

function readNumber(name: string, fallback: number) {
  const value = Number.parseInt(readString(name), 10);
  return Number.isFinite(value) ? value : fallback;
}

export const appEnv = {
  useFirestoreContent: readBoolean("USE_FIRESTORE_CONTENT"),
  firestoreContentRevalidateSeconds: readNumber("FIRESTORE_CONTENT_REVALIDATE_SECONDS", 300),
  firebaseSessionCookieName: readString("FIREBASE_SESSION_COOKIE_NAME") || "missao_africa_admin_session",
  adminAllowedEmails: readString("ADMIN_ALLOWED_EMAILS")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
  firebasePublic: {
    apiKey: readString("NEXT_PUBLIC_FIREBASE_API_KEY"),
    authDomain: readString("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
    projectId: readString("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
    appId: readString("NEXT_PUBLIC_FIREBASE_APP_ID"),
    storageBucket: readString("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  },
  firebaseAdmin: {
    projectId: readString("FIREBASE_PROJECT_ID"),
    clientEmail: readString("FIREBASE_CLIENT_EMAIL"),
    privateKey: readString("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  },
  cloudinary: {
    cloudName: readString("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
    apiKey: readString("CLOUDINARY_API_KEY"),
    apiSecret: readString("CLOUDINARY_API_SECRET"),
    uploadFolder: readString("CLOUDINARY_UPLOAD_FOLDER") || "missao-africa",
  },
};

export function hasFirebaseClientConfig() {
  const { apiKey, authDomain, projectId, appId } = appEnv.firebasePublic;
  return Boolean(apiKey && authDomain && projectId && appId);
}

export function hasFirebaseAdminConfig() {
  const { projectId, clientEmail, privateKey } = appEnv.firebaseAdmin;
  return Boolean(projectId && clientEmail && privateKey);
}

export function hasCloudinaryConfig() {
  const { cloudName, apiKey, apiSecret } = appEnv.cloudinary;
  return Boolean(cloudName && apiKey && apiSecret);
}
