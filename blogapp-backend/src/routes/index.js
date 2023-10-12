const express = require('express');
const AuthController= require('../controllers/authController');
const BlogController= require('../controllers/blogController');
const StorageController=require('../controllers/storageController');
const verifyJWT=require('../middleware/verifyJWT');
const multer = require('multer');
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
});

router.post('/signup', function (req, res) {
    AuthController.signup(req, res); 
});
  
router.post('/signin', function (req, res) {
    AuthController.signin(req, res); 
});

router.post('/signout/user/:userid',verifyJWT,  function (req, res) {
    AuthController.signout(req, res); 
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

router.get('/all-user-blogs/user/:userid/page/:pagenumber',verifyJWT, function (req, res) {
    BlogController.getAllUserBlogs(req, res); 
});

router.get('/all-blogs/user/:userid/page/:pagenumber',verifyJWT, function (req, res) {
    BlogController.getBlogs(req, res); 
});

router.get('/blog-details/user/:userid/blog/:blogid',verifyJWT, function (req, res) {
    BlogController.getBlogDetails(req, res); 
});

router.get('/validate-user/user/:userid',function (req, res) {
    AuthController.validateJWT(req, res); 
});

router.post('/upload-image/user/:userid',upload.single('image'),verifyJWT,function (req, res) {
    StorageController.storeImage(req, res); 
})


module.exports = router;
