const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

// /api/thoughts
//todo (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/").get(getAllThought).post(createThought);

// /api/thoughts/<Id>
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/<thoughtid>
router.route("/:thoughtId/reactions/").post(addReaction);

// /api/thoughts/<thoughtId>/reactions/,reactionID.
router.route("/:thoughtId/reactions/reactionID").delete(removeReaction);

module.exports = router;

