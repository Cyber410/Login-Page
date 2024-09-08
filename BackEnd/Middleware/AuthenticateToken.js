const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const AuthenticateToken = (req, res, next) => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid Token!" });
  }
};

module.exports = AuthenticateToken;
