const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
  const secretKey=process.env.secretKey
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token needed in request header' });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    if(decoded.userId!=req.params.userid)
    return res.status(401).json({message: 'Unauthorized request'})
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized request' });
  }
};
