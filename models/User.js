const { Schema, model, Types } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // createdBy: {
    //   type: String,
    //   required: true,
    //   trim: true
    // },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   get: createdAtVal => dateFormat(createdAtVal)
    // },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of friends on retrieval
UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
