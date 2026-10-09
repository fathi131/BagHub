const jwt = require('jsonwebtoken');


const isUser = (req, res, next) => {
  let token;

  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      
      
      req.user = decoded; 
      return next();
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
  }

  
  if (req.session && req.session.user) {
    req.user = req.session.user;
    return next();
  }

  return res.status(401).json({
    success: false,
    message: 'Unauthorized: Please log in to continue',
  });
};


const isAdmin = (req, res, next) => {
 
  isUser(req, res, () => {
    
    if (req.user && (req.user.role === 'admin' || req.user.isAdmin === true)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Forbidden: Admin access required',
    });
  });
};

module.exports = { isUser, isAdmin };