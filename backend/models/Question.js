const mongoose = require('mongoose');

const votesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    voteType: {
      type: String,
      enum: ['upvote', 'downvote'],
    },
  },
  { _id: false }
);

const questionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    votes: [votesSchema],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
