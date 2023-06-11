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

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thoughtId/reactions/:reaction").delete(deleteReaction);

module.exports = router;
