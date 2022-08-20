const client = require(`../../app.js`);

module.exports = (req, res, next) => {
    const token = client.serverToken;
    const userToken = req.headers.authorization;

    if (token == userToken) return next();

    return res.status(401).send({
        status: 401,
        message: `You need a token for this endpoint!`,
    });
};