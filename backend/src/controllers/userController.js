const { db } = require('../config/firebase');

exports.getProfile = async (req, res) => {
  try {
    const uid = req.user.uid;

    if (!db) {
      // Mock for dev
      return res.status(200).json({
        uid,
        name: 'Eco Warrior',
        email: req.user.email,
        onboardingCompleted: false,
        persona: 'None',
        greenPoints: 0,
        level: 1
      });
    }

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(userDoc.data());

  } catch (error) {
    console.error('Error getting profile:', error);
    res.status(500).json({ error: 'Failed to retrieve user profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const uid = req.user.uid;
    const updateData = req.body;

    // Security: restrict what fields can be updated directly
    const allowedUpdates = ['name', 'avatar', 'preferences'];
    const safeData = {};
    for (const key of allowedUpdates) {
      if (updateData[key] !== undefined) {
        safeData[key] = updateData[key];
      }
    }

    if (db) {
      await db.collection('users').doc(uid).set(safeData, { merge: true });
    }

    res.status(200).json({ success: true, message: 'Profile updated' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update user profile' });
  }
};
