const Blog = require("../models/blog");
//handle errors while craeting the blog
//create a blog
const createBlog = async (req, res) => {
  const { userId } = req.user;
  req.body.createdby = userId;
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
// get all blogs for that user
const getBlogs = async (req, res) => {
  const { userId } = req.user;
  try {
    const blogs = await Blog.find({ createdby: userId });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.json({ error });
  }
};
// get a single blog
const getBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOne({ createdby: userId, _id: blogId });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
// update
const updateBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOneAndUpdate(
      { createdby: userId, _id: blogId },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.json({ error });
  }
};
//delete a blog
const deleteBlog = async (req, res) => {
  const { userId } = req.user;
  const { blogId } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({
      createdby: userId,
      _id: blogId,
    });
    res.status(200).json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    res.json({ error });
  }
};

// get all blogs regardless of the user
// get a singleblog regardless of the user

module.exports = { createBlog, getBlog, getBlogs, updateBlog, deleteBlog };
