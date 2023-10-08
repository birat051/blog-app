const BlogDataModel=require('../models/Blog')

exports.createBlog = async (req, res) => {
    try {
      const { title,paragraphs,imageUrl} = req.body;
      if(!title)
      return res.status(400).json({ message: 'Blog title is required' });
      if(!paragraphs)
      return res.status(400).json({ message: 'Blog content is required' });
      const userId = req.params.userid;  
      // Create a new blog post
      const newBlog = await BlogDataModel.create({
        title,
        paragraphs,
        userId,
        imageUrl,
      });
      res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating blog post' });
    }
  };

  
  // Update an existing blog post by ID
exports.updateBlog = async (req, res) => {
    try {
      const { title, paragraphs, imageUrl } = req.body;
      if(!title)
      return res.status(400).json({ message: 'Blog title is required request body' });
      if(!paragraphs)
      return res.status(400).json({ message: 'Blog content is required in request body' });
      const blogId = req.params.blogid;
      if(!blogId)
      return res.status(400).json({ message: 'Blog id is required in request header' });
      // Find the blog post by ID
      const blog = await BlogDataModel.findById(blogId);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      // Update the blog post
      blog.title = title;
      blog.paragraphs = paragraphs;
      blog.imageUrl = imageUrl;
  
      // Save the updated blog post
      await blog.save();
  
      res.json({ message: 'Blog post updated successfully', blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating blog post' });
    }
  };
  
  // Delete an existing blog post by ID
exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.blogid;
        if(!blogId)
        return res.status(400).json({ message: 'Blog id is required in request header' });
  
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

exports.getAllUserBlogs = async (req,res) => 
{
  try {
    const userId = req.params.userid;
    const blogs = await BlogDataModel.find({ userId: userId }).select('-paragraphs');
    res.status(200).json({ blogs });
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: 'Error getting blog posts' });
  }
}
  
exports.getBlogDetails = async (req,res)=>{
  try{
    const blogId = req.params.blogid;
    if(!blogId)
    return res.status(400).json({ message: 'Blog id is required in request header' });
    const blog = await BlogDataModel.findById(blogId);
    res.status(200).json({ blog });
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: 'Error getting blog details' });
  }
}