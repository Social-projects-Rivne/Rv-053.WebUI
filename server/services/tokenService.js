require("dotenv").config();
const jwt = require("jsonwebtoken");
const uuid = require("uuid/v4");
const userModel = require("../models").users;
const tokenModel = require("../models").token;
//get value from config/default.json
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRE_IN = process.env.JWT_REFRESH_EXPIRE_IN;

const generateAccessToken = user => {
  const payload = {
    userId: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    status_id: user.status_id,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
};

const generateRefreshToken = user => {
  const payload = {
    id: uuid()
  };
  return {
    id: payload.id,
    token: jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRE_IN
    })
  };
};

//Replace refreshToken in DB token
const replaceDbRefreshToken = async (tokenId, userId, expiredAt) => {
  await tokenModel.findOne({ where: { id: tokenId } }).then(token => {
    if (token === null) {
      tokenModel.create({ id: tokenId, user_id: userId, expiredAt });
    } else {
      tokenModel.update({ id: tokenId, user_id: userId, expiredAt });
    }
  });
};

//   //   async verify(token) {
//   //     try {
//   //       const decode = jwt.verify(token, this.secret);
//   //       const dbToken = await tokenModel.findOne({ where: { user_id: decode.userId } });
//   //       if (token !== dbToken.dataValues.access_token) throw 'Token dose not match';
//   //       return decode.userId;
//   //     } catch (e) {
//   //       return Promise.reject(e);
//   //     }
//   //   }

//   //   async logOut(token) {
//   //     try {
//   //       const { userId } = jwt.verify(token, this.secret);
//   //       if (!userId) throw 'invalid token';

//   //       await tokenModel.destroy({ where: { user_id: userId } });
//   //     } catch (e) {
//   //       return Promise.reject(e);
//   //     }
//   //   }
// }

module.exports = {
  generateAccessToken,
  replaceDbRefreshToken,
  generateRefreshToken
};
