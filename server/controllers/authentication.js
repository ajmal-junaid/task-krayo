const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');

const client = new OAuth2Client(process.env.CLIENT_ID);
module.exports = {
  verify: async (credential, clientId) => {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    const user = await User.findOne({ email: payload.email });
    if (user) return user._id;
    const result = await User.create({ name: payload.name, email: payload.email });
    // const userid = payload.sub;
    return result._id;
  },
};
