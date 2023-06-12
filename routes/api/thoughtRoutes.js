const router = require("express").Router();
const {
  createThought,
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controller/thoughtController");


// "/" thought route
router.route("/").get(getThoughts).post(createThought);

// "/:id" thought route
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

// "/:thoughtid/reactions" route
router.route("/:thoughtId/reactions").post(addReaction);

// "/:thoughtid/reactions/:id" route
router.route("/:thoughtId/reactions/:reaction").delete(deleteReaction);

module.exports = router;
