const express = require('express');
const AuthController= require('../controllers/authController');
const BlogController= require('../controllers/blogController');
const verifyJWT=require('../middleware/verifyJWT');

const router = express.Router();

router.post('/signup', function (req, res) {
    AuthController.signup(req, res); 
});
  
router.post('/signin', function (req, res) {
    AuthController.signin(req, res); 
});
  
  // Use a callback function to handle the POST request for /create-blog/user/:userid
router.post('/create-blog/user/:userid', verifyJWT, function (req, res) {
    BlogController.createBlog(req, res); 
});

router.put('/update-blog/user/:userid/blog/:blogid',verifyJWT, function (req, res) {
    BlogController.updateBlog(req, res); 
});

router.delete('/delete-blog/user/:userid/blog/:blogid',verifyJWT, function (req, res) {
    BlogController.deleteBlog(req, res); 
});

module.exports = router;
