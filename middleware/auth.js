const jwt = require('jsonwebtoken');

const auth = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ errorMessage: "Unauthorized."})

        const validatedUser = await jwt.verify(token, process.env.SECRET_KEY)

        req.user = validatedUser.user_id;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ errorMessage: "Unauthorized." });
    }
}

module.exports = auth;