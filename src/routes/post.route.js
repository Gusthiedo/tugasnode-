const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");

// Create a new post
router.post("/posts", postController.createPost);

// Read all posts
router.get("/posts", postController.getAllPosts);

// Read a specific post
router.get("/posts/:postId", postController.getPostById);

// Update a post
router.put("/posts/:postId", postController.updatePost);

// Delete a post
router.delete("/posts/:postId", postController.deletePost);

module.exports = router;
