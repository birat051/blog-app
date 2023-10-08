const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;
const UserDataModel=require('../models/User')
// Sign-up
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email)
    {
        return  res.status(400).json({ message: 'Email is required in request body' });
    }
    if(!password)
    {
        return  res.status(400).json({ message: 'Password is required in request body' });
    }
    // Check if the email already exists
    const existingUser = await UserDataModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser= await UserDataModel.create({email,password: passwordHash})

    // Create a JWT token
    const token = jwt.sign({ userId: newUser._id }, secretKey);

    res.status(201).json({ token,email,userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unexpected error occured while creating new user' });
  }
};

// Sign-in
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserDataModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'There is no user with this email id' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(202).json({ token , email, userId: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
