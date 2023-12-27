const jwt = require('jsonwebtoken');
const JwtTokenModel = require('../models/JWT');

module.exports = async (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;
  const token = req.header('Authorization');
  if (!token) {
    return res
      .status(401)
      .json({ message: 'Authorization token needed in request header' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.userId !== req.params.userid) {
      return res.status(401).json({ message: 'Unauthorized request' });
    }
    const tokenDbData = await JwtTokenModel.findOne({ token });
    if (!tokenDbData) {
      res.status(401).json({ message: 'Invalid jwt passed' });
    }
    const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds
    if (decoded.exp < currentTimestamp) {
      return res.status(401).json({ message: 'JWT token has expired' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized request' });
  }
};
