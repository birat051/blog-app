const BlogDataModel = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, paragraphs, imageUrl } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Blog title is required' });
    }
    if (!paragraphs) {
      return res.status(400).json({ message: 'Blog content is required' });
    }
    const userId = req.params.userid;
    // Create a new blog post
    const newBlog = await BlogDataModel.create({
      title,
      paragraphs,
      userId,
      imageUrl,
    });
    res
      .status(201)
      .json({ message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating blog post' });
  }
};

// Update an existing blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const { title, paragraphs, imageUrl } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: 'Blog title is required request body' });
    }
    if (!paragraphs) {
      return res
        .status(400)
        .json({ message: 'Blog content is required in request body' });
    }
    const blogId = req.params.blogid;
    const userId = req.params.userid;
    if (!blogId) {
      return res
        .status(400)
        .json({ message: 'Blog id is required in request header' });
    }
    // Find the blog post by ID
    const blog = await BlogDataModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (blog.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'You are not the owner of this blog' });
    }
    // Update the blog post
    blog.title = title;
    blog.paragraphs = paragraphs;
    blog.imageUrl = imageUrl;

    // Save the updated blog post
    await blog.save();

    res.status(200).json({ message: 'Blog post updated successfully', blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating blog post' });
  }
};

// Delete an existing blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogid;
    if (!blogId) {
      return res
        .status(400)
        .json({ message: 'Blog id is required in request header' });
    }

    const blog = await BlogDataModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await BlogDataModel.findByIdAndDelete(blogId);
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting blog post' });
  }
};

exports.getAllUserBlogs = async (req, res) => {
  try {
    const {userId=null} = req.query.userid;
    const pageNumber = req.params.pagenumber || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (pageNumber - 1) * limit;
    const blogs = await BlogDataModel.find({ userId })
      .select('-paragraphs')
      .skip(skip)
      .limit(limit);
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting blog posts' });
  }
};

exports.getBlogDetails = async (req, res) => {
  try {
    const blogId = req.params.blogid;
    if (!blogId) {
      return res
        .status(400)
        .json({ message: 'Blog id is required in request header' });
    }
    const blog = await BlogDataModel.findById(blogId);
    if (blog) {
      res.status(200).json({ blog });
    } else {
      res.status(404).json({ message: 'No blog found with given id' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting blog details' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const userId = req.params.userid;
    const pageNumber = req.params.pagenumber || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (pageNumber - 1) * limit;
    const blogs = await BlogDataModel.find({ userId: { $ne: userId } })
      .populate({
        path: 'userId',
        select: 'name', // Select only the 'name' field from the 'userId' object
        model: 'users',
      })
      .select('-paragraphs')
      .skip(skip)
      .limit(limit);
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error getting blog posts' });
  }
};
