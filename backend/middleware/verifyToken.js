const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    
    const decoded = jwt.verify(token.split(' ')[1], process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
