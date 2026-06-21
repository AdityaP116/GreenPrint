const admin = require('firebase-admin');

// In a real production scenario, you would initialize this using a service account key
// from environment variables: process.env.FIREBASE_SERVICE_ACCOUNT_KEY
// For the hackathon, if FIREBASE_PROJECT_ID is provided, we can initialize default app,
// or use a local mock if no credentials are provided to avoid crashing.

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // projectId: process.env.FIREBASE_PROJECT_ID || 'greenprint-hackathon'
    });
    console.log('Firebase Admin initialized');
  } catch (error) {
    console.warn('Firebase Admin initialization failed. Make sure GOOGLE_APPLICATION_CREDENTIALS is set.', error.message);
  }
}

const db = admin.firestore ? admin.firestore() : null;
const auth = admin.auth ? admin.auth() : null;

module.exports = { admin, db, auth };
