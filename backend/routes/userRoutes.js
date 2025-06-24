const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

const User     = require('../models/Users');
const Country  = require('../models/Country');

/* ──────────────────────────────────────────────────────────── */
/*  TEST: quick sanity check                                    */
router.get('/test', (req, res) => {
  res.json({ message: 'User route works' });
});

/* ──────────────────────────────────────────────────────────── */
/*  GET /api/users/:uid/likes                                   */
/*  → full activity objects the user has liked                  */
router.get('/:uid/likes', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.uid });
    if (!user) return res.status(404).send('User not found');

    // Convert each saved ref into the real activity sub-doc
    const activities = await Promise.all(
      user.likedActivities.map(async ({ countrySlug, activityId }) => {
        const country = await Country.findOne(
          { slug: countrySlug, 'exploration.activities._id': activityId },
          { 'exploration.activities.$': 1, name: 1, slug: 1 }   // project only needed fields
        );
        if (!country) return null;                               // activity was deleted
        const act       = country.exploration.activities[0].toObject();
        act.countryName = country.name;
        act.countrySlug = country.slug;
        return act;
      })
    );

    res.json(activities.filter(Boolean));                        // strip nulls
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ──────────────────────────────────────────────────────────── */
/*  POST /api/users/:uid/likes/:countrySlug/:activityId         */
/*  → toggles like / unlike                                     */
router.post('/:uid/likes/:countrySlug/:activityId', async (req, res) => {
  try {
    const { uid, countrySlug, activityId } = req.params;
    const user = await User.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).send('User not found');

    // ensure activityId is an ObjectId for reliable equals()
    const actId = new mongoose.Types.ObjectId(activityId);

    const idx = user.likedActivities.findIndex(
      (x) => x.countrySlug === countrySlug && x.activityId.equals(actId)
    );

    if (idx === -1) {
      // like
      user.likedActivities.push({ countrySlug, activityId: actId });
    } else {
      // unlike
      user.likedActivities.splice(idx, 1);
    }

    await user.save();
    res.json(user.likedActivities);          // return updated list of refs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
