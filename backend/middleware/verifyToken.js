const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], "62e891a75bed4051b8c2cc1b459706f7f1117d60076e9d0145e8726052ff5955");
    req.user = decoded;
    
    req.user.role = decoded.role;
    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};
