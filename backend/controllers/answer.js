const Answer = require('../models/Answer');

exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({});

    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createAnswer = async (req, res) => {
  try {
    const { text, questionId } = req.body;

    const answer = await Answer.create({
      text,
      userId: req.user.id,
      questionId,
    });

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.getAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) {
      return res.status(404).json({ error: 'Answer is not found by id ' + id });
    }

    return res.status(200).json(answer);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.updateAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) {
      return res.status(404).json({ error: 'Answer is not found by id ' + id });
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.deleteAnswerById = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) {
      return res.status(404).json({ error: 'Answer is not found by id ' + id });
    }

    await answer.deleteOne();

    return res.status(200).json({
      message: 'Answer deleted successfully!',
      deletedAnswerId: answer._id,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
