const { User, Thought } = require("../models");

const userController = {
  // get all pizzas
  getAllUser(req, res) {
    User.find({})
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      // .select('-__v')
      // .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      // .populate({
      //   path: 'thoughts',
      //   select: '-__v'
      // })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update User by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // delete User
  //todo delete associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "No User found with this ID!" })
          : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
      )
      .then(() => res.json({ message: "User and Thought(s) deleted!" }))
      .catch((err) => res.json(err));
  },

  // add friend to user
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $push: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
