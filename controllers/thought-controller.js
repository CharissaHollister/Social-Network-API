const { Thought, User } = require("../models");

const thoughtController = {
  getAllThought(req, res) {
    Thought.find({})
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      // })
      // .select("-__v")
      // .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // get one Thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      // .populate({
      //   path: "thoughts",
      //   select: "-__v",
      // })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(400).json({ message: "No Thought found with this ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  //create a thought and push the created thought's _id to the associated user's thoughts array field
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
        // .then(() => console.log("added thought to user"));
      })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No User found with this ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  // add Reaction to Thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove Thought
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((dbUserData) =>
        !dbUserData
          ? res
              .status(404)
              .json({ message: "Thought deleted, but no user found" })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => res.json(err));
  },
  // remove Reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ message: "No thought found with this ID!" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
