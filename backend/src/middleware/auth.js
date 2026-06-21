const { auth } = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
  }

  const idToken = authHeader.split('Bearer ')[1];

  try {
    if (auth) {
      const decodedToken = await auth.verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } else {
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
