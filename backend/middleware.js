// middleware/auth.js (your auth middleware file)
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config"); // Adjust the path as necessary

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if (decodedToken.userId) {
            req.userId = decodedToken.userId;
            next();
        } else {
            return res.status(403).json({ message: "Invalid token: userId missing" });
        }
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;
