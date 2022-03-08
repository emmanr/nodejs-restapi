const express = require('express');
const router = express.Router();

// Controllers
const feedController = require('../controllers/feed');

// Middleware
const validation = require('../middleware/form-validation');

// GET /feed/posts
router.get('/posts', feedController.getPosts);
router.get('/post/:postId', feedController.getPost);

// POST /feed/post
router.post('/post', validation.title, validation.content, feedController.createPost);

// PUT
router.put('/post/:postId', validation.title, validation.content, feedController.updatePost);

// DELETE
router.delete('/post/:postId', feedController.deletePost);

module.exports = router;
