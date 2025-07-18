import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized. Login Again.' });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ SAFELY assign userId to req.user
        req.user = { userId: token_decode.id };

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message });
    }
};

export default authUser;
