const express = require('express');
const router = express.Router();
const { signup, signin, logout } = require('../controllers/authController');
const {getRoadmap ,upVoteItem, getRoadmapById} = require('../controllers/roadmapItemController');
const { signupValidation, signinValidation } = require('../middleware/validation');
const authMiddleware = require('../middleware/authMiddleware');
const { addComment, getComments, editComment, deleteComment } = require('../controllers/commentController');

//  Auth
router.post('/signup', signupValidation, signup);
router.post('/signin', signinValidation, signin);
router.post('/logout', logout);

// Roadmap
router.get('/roadmap', getRoadmap);
router.get('/roadmap/:id', getRoadmapById);
router.post('/roadmap/:id/upvote', authMiddleware, upVoteItem);


// Comments
router.post('/roadmap/:id/comment', authMiddleware, addComment);
router.get('/roadmap/:id/comments', authMiddleware, getComments);
router.put('/comment/:id', authMiddleware, editComment);
router.delete('/comment/:id', authMiddleware, deleteComment);

module.exports = router;
