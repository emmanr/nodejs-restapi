const express = require('express');
const router = express.Router();

// Controllers
const feedController = require('../controllers/feed');

// Middleware
const validation = require('../middleware/form-validation');

// GET /feed/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', validation.title, validation.content, feedController.createPost);

module.exports = router;
