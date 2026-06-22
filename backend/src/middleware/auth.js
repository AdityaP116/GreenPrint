const { auth } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
  }

  const parts = authHeader.split('Bearer ');
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Malformed token' });
  }
  const idToken = parts[1].trim();

  try {
    if (auth) {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } else {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('Firebase Auth is not initialized in production');
      }
      // Mock auth for local dev without service account
      console.warn('Firebase Auth is not initialized. Bypassing auth check for development.');
      req.user = { uid: 'dev-user-uid', email: 'dev@greenprint.local' };
      next();
    }
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(403).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
};

module.exports = { verifyToken };
