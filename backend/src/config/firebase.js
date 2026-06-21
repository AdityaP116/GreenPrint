const admin = require('firebase-admin');

// In a real production scenario, you would initialize this using a service account key
// from environment variables: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
// For the hackathon, if FIREBASE_PROJECT_ID is provided, we can initialize default app,
// or use a local mock if no credentials are provided to avoid crashing.

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID || 'greenprint-1832f'
    });
    console.log('Firebase Admin initialized');
  } catch (error) {
    console.warn('Firebase Admin initialization failed. Make sure GOOGLE_APPLICATION_CREDENTIALS is set.', error.message);
  }
}

let db = null;
let auth = null;

if (admin.apps.length > 0) {
  try {
    db = admin.firestore();
    auth = admin.auth();
  } catch (error) {
    console.warn('Failed to initialize Firestore or Auth:', error.message);
  }
}

module.exports = { admin, db, auth };
