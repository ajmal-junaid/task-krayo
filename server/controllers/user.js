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
    const user = await User.findOne({ email: payload.email });
    if (user) return user._id;
    const result = await User.create({ name: payload.name, email: payload.email });
    return result._id;
  },
  addFile: async (data) => {
    try {
      await User.updateOne({ email: data.user }, { $push: { data } });
      return data;
    } catch (error) {
      return error;
    }
  },
  getAllFiles: async (id) => {
    try {
      const result = await User.findOne({ email: id }).select('data');
      return result.data;
    } catch (error) {
      return error;
    }
  },
};
