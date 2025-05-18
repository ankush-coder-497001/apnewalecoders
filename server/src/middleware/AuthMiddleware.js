const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  // Check if token is not provided or malformed
  if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      errorDescription: 'Token not provided or improperly formatted'
    });
  }

  try {
    const token = authHeader.split(' ')[1]; // Get the token part
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach decoded user info
    next(); // Proceed to next middleware
  } catch (error) {
    return res.status(401).json({
      error: 'Unauthorized',
      errorDescription: 'Invalid or expired token'
    });
  }
};

module.exports = Auth;
