const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token is missing"
        })
    };

    const tokenSecret = "Shhh"
    jwt.verify(token, tokenSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            });
        };

        req.user = decoded;
        next();
    })


}

module.exports = authenticateToken;