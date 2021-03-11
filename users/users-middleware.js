const jwt = require('jsonwebtoken');

const roles = ['basic', 'admin'];

// basic
function restrict(role) {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Invalid credentials!' });
        }
        // 0 < 1 => true
        console.log(decoded);
        if (role && roles.indexOf(decoded.userRole) < roles.indexOf(role)) {
          return res.status(403).json({
            message: 'Nu esti binevenit',
          });
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
