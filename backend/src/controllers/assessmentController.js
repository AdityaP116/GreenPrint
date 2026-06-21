const { db } = require('../config/firebase');
const { calculateFootprint, generateAIInsights } = require('../services/carbonEngine');

exports.submitAssessment = async (req, res) => {
  try {
    const uid = req.user.uid;
    const { responses } = req.body;

    if (!responses) {
      return res.status(400).json({ error: 'Missing responses data' });
    }

    // 1. Calculate emissions
    const footprint = calculateFootprint(responses);
    
    // 2. Generate insights
    const insights = generateAIInsights(footprint);

    // 3. Save to Firestore (mocking for local dev without service account if needed)
    if (db) {
      const assessmentRef = db.collection('assessments').doc();
      const footprintRef = db.collection('footprints').doc();
      const userRef = db.collection('users').doc(uid);

      const timestamp = new Date().toISOString();

      await db.runTransaction(async (t) => {
        // Save assessment
        t.set(assessmentRef, {
          uid,
          responses,
          date: timestamp
        });

        // Save footprint
        t.set(footprintRef, {
          uid,
          assessmentId: assessmentRef.id,
          ...footprint,
          date: timestamp
        });

        // Update user profile
        t.set(userRef, {
          onboardingCompleted: true,
          persona: insights.persona,
          lastUpdated: timestamp
        }, { merge: true });
      });
    } else {
      console.warn('Firestore not initialized, skipping database write.');
    }

    res.status(200).json({ 
      success: true, 
      footprint, 
      insights 
    });

  } catch (error) {
    console.error('Error submitting assessment:', error);
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
};

exports.getLatestAssessment = async (req, res) => {
  try {
    const uid = req.user.uid;

    if (!db) {
      return res.status(200).json({ data: null, message: 'Firestore not initialized' });
    }

    const snapshot = await db.collection('footprints')
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ error: 'No assessment found' });
    }

    const latestFootprint = snapshot.docs[0].data();
    const insights = generateAIInsights(latestFootprint);

    res.status(200).json({ footprint: latestFootprint, insights });

  } catch (error) {
    console.error('Error getting latest assessment:', error);
    res.status(500).json({ error: 'Failed to retrieve assessment' });
  }
};
