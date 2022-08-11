const router = require("express").Router();
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

router.route("/").get(getAllThought).post(createThought);

// /api/thoughts/<Id>
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// /api/thoughts/<thoughtid>
router.route("/:thoughtId/reactions/").post(addReaction);

// /api/thoughts/<thoughtId>/reactions/,reactionID.
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
