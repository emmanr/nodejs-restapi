const express = require('express');
const router = express.Router();

// Controllers
const feedController = require('../controllers/feed');

// Helpers
const validation = require('../helpers/validation/form-validation');

// Middleware
const isAuth = require('../middleware/is-auth');

// GET /feed/posts
router.get('/posts', isAuth, feedController.getPosts);
router.get('/post/:postId', isAuth, feedController.getPost);

// POST /feed/post
router.post('/post', isAuth, validation.title, validation.content, feedController.createPost);

// PUT
router.put('/post/:postId', isAuth, validation.title, validation.content, feedController.updatePost);

// DELETE
router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
