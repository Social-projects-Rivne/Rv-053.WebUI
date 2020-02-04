require('dotenv').config();
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const tokenModel = require('../models').token;
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
const replaceDbRefreshToken = async (tokenId, userId, expiredAt, oldRefreshTokenId) => {
  //console.log('token ' + tokenId + 'oldRefreshTokenId ' + oldRefreshTokenId);
  if (!oldRefreshTokenId) {
    await tokenModel.create({ id: tokenId, user_id: userId, expiredAt });
  } else {
    console.log('oldRefreshTokenId ' + oldRefreshTokenId);
    await tokenModel.findOne({ where: { id: oldRefreshTokenId } }).then(token => {
      if (token === null) {
        tokenModel.create({ id: tokenId, user_id: userId, expiredAt });
      } else {
        tokenModel.update(
          { id: tokenId, user_id: userId, expiredAt: expiredAt },
          { where: { id: oldRefreshTokenId } }
        );
      }
    });
  }
};

module.exports = {
  generateAccessToken,
  replaceDbRefreshToken,
  generateRefreshToken
};
