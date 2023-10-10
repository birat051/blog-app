const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const UserDataModel=require('../models/User');
const JwtTokenModel = require('../models/JWT');
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
    const token = jwt.sign({ userId: newUser._id }, secretKey,{expiresIn: 86400});

    const newToken= await JwtTokenModel.create({token})
    if(newToken && newUser)
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
    const token = jwt.sign({ userId: user._id }, secretKey,{expiresIn: 86400});
    const newToken= await JwtTokenModel.create({token})

    if(newToken && user)
    res.status(202).json({ token , email, userId: user._id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.validateJWT=async (req, res) => {
  try{
  const token = req.header('Authorization');
  const decoded = jwt.verify(token, secretKey);
  const tokenDbData= await JwtTokenModel.findOne({token})
  if(!tokenDbData)
  res.status(401).json({message: 'Invalid jwt passed'})
  if (tokenDbData.revoked) {
    return res.status(401).json({ message: 'JWT token has been revoked' });
  }
  const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
  if (decoded.exp < currentTimestamp) {
    return res.status(401).json({ message: 'JWT token has expired' });
  }
  if(decoded.userId!=req.params.userid)
  res.status(401).json({message: 'Login attempt failed'});
  else
  res.status(200).json({message: 'User has been validated'})
  }
  catch(error)
  {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.signout=async (req,res)=>{
  try{
  const token = req.header('Authorization');
  const tokenDbData= await JwtTokenModel.findOne({token})
  tokenDbData.revoked=true
  await tokenDbData.save()
  res.status(200).json({message: 'User has been successfully signed out'})
  }
  catch(error)
  {
    res.status(500).json({message: 'Couldnt sign out'})
  }
}