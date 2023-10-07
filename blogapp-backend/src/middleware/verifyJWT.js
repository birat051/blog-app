const verify = require('jsonwebtoken');

module.exports = (req, res, next) =>{
  const secretKey=process.env.secretKey
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  try {
    const decoded = verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized request' });
  }
};
