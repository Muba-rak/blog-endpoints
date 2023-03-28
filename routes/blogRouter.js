const router = require("express").Router();
const {
  createBlog,
  getBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controller/blog");

router.route("/").post(createBlog).get(getBlogs);
router.route("/:blogId").patch(updateBlog).get(getBlog).delete(deleteBlog);

module.exports = router;
