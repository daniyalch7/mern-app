const express = require('express');
const router = express.Router();

const {
  getAllAnswers,
  createAnswer,
  getAnswerById,
  updateAnswerById,
  deleteAnswerById,
} = require('../controllers/answer');
const { protect } = require('../middlewares/auth');

router.get('/', getAllAnswers);
router.post('/', protect, createAnswer);
router.get('/:id', getAnswerById);
router.put('/:id', updateAnswerById);
router.delete('/:id', deleteAnswerById);

module.exports = router;
