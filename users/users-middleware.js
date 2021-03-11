const jwt = require('jsonwebtoken');

function restrict() {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid credentials!' });
        }
        req.decoded = decoded;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  restrict,
};
