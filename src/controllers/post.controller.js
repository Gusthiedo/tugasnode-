const db = require("../models"); // Assuming your models are in the ../models directory
const createPost = async (req, res) => {
  try {
    const { user_id, title, body } = req.body;
    const newPost = await db.postNew.create({ user_id, title, body });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Unable to create post" });
  }
};
const getAllPosts = async (req, res) => {
  try {
    const posts = await db.postNew.findAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch posts" });
  }
};
const getPostById = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await db.postNew.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch post" });
  }
};
const updatePost = async (req, res) => {
  const postId = req.params.postId;
  const { user_id, title, body } = req.body;
  try {
    const post = await db.postNew.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.user_id = user_id;
    post.title = title;
    post.body = body;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Unable to update post" });
  }
};
const deletePost = async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await db.postNew.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete post" });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
