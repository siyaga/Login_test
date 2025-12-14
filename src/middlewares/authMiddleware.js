const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided. Login required.' });
    }

    // Expect format: "Bearer <token>"
    const bearer = token.split(' ');
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
        }
        req.userId = decoded.id; // Save user ID for next steps
        next();
    });
};