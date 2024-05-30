const express = require('express');
const router = express.Router();

const {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestionById,
  getUserQuestions,
  upvoteQuestion,
  downvoteQuestion,
} = require('../controllers/questions');
const { protect } = require('../middlewares/auth');

router.get('/', getAllQuestions);
router.post('/', protect, createQuestion);
router.get('/myquestions', protect, getUserQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', updateQuestionById);
router.delete('/:id', deleteQuestionById);

module.exports = router;
