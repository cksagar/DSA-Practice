import jwt from 'jsonwebtoken';

export const routeAccessMiddleware = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) {
      return next();
    }

    if (!token.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorization must be  start with Bearer' });
    }

    const tokenValue = token.split(' ')[1];
    if (!tokenValue) {
      return res.status(401).json({ message: 'authorization token is required' });
    }

    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    return next();
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  try {
    console.log('req.userId', req.userId);
    if (!req.userId) {
      return res.status(401).json({ message: 'Unauthorized please login to access this resource' });
    }
    next();
  } catch (error) {
    console.error('Error ensuring authentication', error);
    return res.status(500).json({ message: 'Failed to ensure authentication' });
  }
};
