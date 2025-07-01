const router = require("express").Router({ mergeParams: true });

const {
  addActivity,
  getActivities,
  deleteActivity          // ⬅️ add this
} = require("../controllers/activityController");

// base: /api/countries/slug/:slug/activities
router.route("/")
  .get(getActivities)
  .post(addActivity);

router.route("/:activityId")        // DELETE /activities/:id
  .delete(deleteActivity);

module.exports = router;
