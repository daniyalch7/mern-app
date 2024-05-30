const mongoose = require("mongoose");
const Question = require("../models/Question");

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    await Question.populate(questions, { path: "userId" });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const { title, description } = req.body;

    const question = await Question.create({
      title,
      description,
      userId: req.user.id,
    });

    //  Populate the user data before sending the response
    await Question.populate(question, { path: "userId" });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res
        .status(404)
        .json({ error: "Question is not found by id " + id });
    }

    return res.status(200).json(question);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res
        .status(404)
        .json({ error: "Question is not found by id " + id });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    await Question.populate(updatedQuestion, { path: "userId" });
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);

    if (!question) {
      return res
        .status(404)
        .json({ error: "Question is not found by id " + id });
    }

    await question.deleteOne();

    return res.status(200).json({
      message: "Question deleted successfully!",
      deletedQuestionId: question._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getUserQuestions = async (req, res) => {
  try {
    const questions = await Question.find({
      userId: req.user.id,
    });
    await Question.populate(questions, { path: "userId" });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
