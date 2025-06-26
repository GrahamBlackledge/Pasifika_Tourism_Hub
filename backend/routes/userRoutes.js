const express  = require("express");
const router   = express.Router({ mergeParams: true });
const User     = require("../models/Users");
const admin    = require("../firebaseAdmin");

/* helper */
async function findOrCreateUser(uid) {
  let user = await User.findOne({ firebaseUid: uid });
  if (user) return user;

  const fb = await admin.auth().getUser(uid);
  return User.create({
    firebaseUid: uid,
    displayName: fb.displayName || "",
    email:       fb.email       || "",
    likedActivities: [],
  });
}

/* ───────── GET just returns the refs array ───────── */
router.get("/:uid/likes", async (req, res) => {
  try {
    const user = await findOrCreateUser(req.params.uid);

    // normalise countrySlug ← activitySlug fallback
    const cleanLikes = user.likedActivities
      .map(l => ({
        countrySlug: l.countrySlug || l.activitySlug,   // ← key fix
        activityId : l.activityId,
      }))
      .filter(l => l.countrySlug && l.activityId);      // drop empties

    res.set("Cache-Control", "no-store");
    res.json(cleanLikes);                               // [{countrySlug, activityId}]
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ───────── POST toggle like / unlike ───────── */
router.post("/:uid/likes/:countrySlug/:activityId", async (req, res) => {
  try {
    const { uid, countrySlug, activityId } = req.params;
    const actId = String(activityId);

    const user = await findOrCreateUser(uid);

    const idx = user.likedActivities.findIndex(
      x => x.countrySlug === countrySlug && x.activityId === actId
    );

    if (idx === -1) {
      user.likedActivities.push({ countrySlug, activityId: actId });
    } else {
      user.likedActivities.splice(idx, 1);
    }

    await user.save();
    res.json(user.likedActivities);          // return refs
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
