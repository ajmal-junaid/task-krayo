const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);
module.exports = {
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (typeof authHeader !== 'undefined') {
      const token = authHeader.split(' ')[1];
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.token = payload.email;
      next();
    } else {
      res.status(403).json({ message: 'token not found' });
    }
  },
};
