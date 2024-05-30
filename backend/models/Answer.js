const mongoose = require("mongoose");

const answerSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Answer text is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
