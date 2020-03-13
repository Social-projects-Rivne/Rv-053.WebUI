require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models').users;
const Token = require('../models').token;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRE_IN = process.env.JWT_REFRESH_EXPIRE_IN;
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const tokenService = require('../services/tokenService');
const { sendEmail } = require('../services/nodemailer');
const MAIL_TOKEN_SECRET = process.env.MAIL_TOKEN_SECRET;
const MAIL_TOKEN_EXPIRE_IN = process.env.MAIL_TOKEN_EXPIRE_IN;

const updateTokens = (user, oldRefreshTokenId) => {
  const accessToken = tokenService.generateAccessToken(user);
  const idPlusToken = tokenService.generateRefreshToken(user);
  const refreshToken = idPlusToken.token;
  const decoded_access = jwt.decode(accessToken);
  const decoded_refresh = jwt.decode(refreshToken);
  return tokenService
    .replaceDbRefreshToken(idPlusToken.id, user.id, decoded_refresh.exp * 1000, oldRefreshTokenId)
    .then(() => ({
      token: accessToken,
      refreshToken: refreshToken,
      expiresIn: decoded_access.exp * 1000
    }));
};

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({
      where: {
        email
      }
    });
    if (foundUser && foundUser.status_id != 3) {
      return res.status(200).json({ error: 'Email is already in use' });
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const userInDB = {
      email: email,
      password: hashPassword,
      sex: req.body.sex || 'Unknown',
      first_name: req.body.first_name || '',
      last_name: req.body.last_name || '',
      phone: req.body.phone || '',
      role: 'User',
      status_id: 3 //Status - Inactive
    };
    let payload;
    if (foundUser === null) {
      const result = await User.create(userInDB);
      payload = { userId: result.id };
    } else {
      await User.update(userInDB, { where: { id: foundUser.id } });
      payload = {
        userId: foundUser.id
      };
    }

    const mailToken = jwt.sign(payload, MAIL_TOKEN_SECRET, {
      expiresIn: MAIL_TOKEN_EXPIRE_IN
    });
    const mailURL = `${process.env.FRONT_HOST}/confirmemail`;
    const emailOptions = {
      email: email,
      subject: 'Confirm your email to join Eeeeevent',
      message: `<div style="max-width:600px; margin:0 auto">
      <h1>Confirm your email to join Eeeeevent</h1>
      <p>
      Almost done, <strong style="color:#24292e!important">${req.body.first_name} ${req.body.last_name}</strong>!
      To complete your Eeeeevent sign up,
    we just need to verify your email address: ${email}
    </p>
    <div style="padding:10px; margin:10px;">
    <a style="min-width:196px;border-top:13px solid;border-bottom:13px solid;
    border-right:24px solid;border-left:24px solid;border-color:#2ea664;
    border-radius:4px;background-color:#2ea664;color:#ffffff;font-size:18px;
    line-height:18px;"
     href="${mailURL}/${mailToken}" target="_blank" >Verify email address</a>
     </div>
     <p>The confirmation link will expire in 24 hours</p>
     </div>
  `
    };
    await sendEmail(emailOptions);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signIn = async (req, res) => {
  updateTokens(req.user).then(tokens => {
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(jwt.decode(tokens.refreshToken).exp * 1000)
    });
    res.status(200).json({
      token: tokens.token,
      expiresIn: tokens.expiresIn
    });
  });
};

exports.confirmPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await User.findOne({
      where: {
        email
      }
    });

    let payload;

    if (userEmail === null) {
      res.status(400).json({
        message: 'Email does not exist!'
      });
    } else {
      payload = { user_id: userEmail.id };
    }

    const user = {
      firstName: userEmail.first_name,
      lastName: userEmail.last_name
    };

    const mailToken = jwt.sign(payload, MAIL_TOKEN_SECRET, {
      expiresIn: MAIL_TOKEN_EXPIRE_IN
    });
    const mailURL = `${process.env.FRONT_HOST}/confirmemail`;
    const emailOptions = {
      email,
      subject: 'Confirm your email to reset password',
      message: `
      <div style="max-width:600px; margin:0 auto">
      <h1>Confirm your email to reset password</h1>
        <p>
        Almost done, <strong style="color:#24292e!important">${user.firstName} ${user.lastName}</strong>!
        To complete reset password,
      we just need to verify your email address: ${email}
      </p>
      <div style="padding:10px; margin:10px;">
      <a style="min-width:196px;border-top:13px solid;border-bottom:13px solid;
      border-right:24px solid;border-left:24px solid;border-color:#2ea664;
      border-radius:4px;background-color:#2ea664;color:#ffffff;font-size:18px;
      line-height:18px;"
       href="${mailURL}/${mailToken}" target="_blank" >Verify email address</a>
       </div>
       <p>The confirmation link will expire in 24 hours</p>
       </div>
       </div>
    `
    };
    await sendEmail(emailOptions);
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.refreshTokens = async (req, res) => {
  const { refreshToken } = req.cookies;
  let payload;
  try {
    payload = await jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({
        message: 'Token expired'
      });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({
        message: 'Invalid token'
      });
    }
    return;
  }

  await Token.findOne({
    where: {
      id: payload.id
    }
  })
    .then(async token => {
      if (token === null) {
        throw new Error('Invalid token!');
      }
      const user = await User.findOne({
        where: {
          id: token.user_id
        }
      });
      if (!user) {
        throw new Error("User dosn't exist");
      }
      return updateTokens(user, payload.id);
    })
    .then(tokens => {
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        expires: new Date(jwt.decode(tokens.refreshToken).exp * 1000)
      });
      res.status(200).json({
        token: tokens.token,
        expiresIn: tokens.expiresIn
      });
    })
    .catch(err =>
      res.status(400).json({
        message: err.message
      })
    );
};

exports.signOut = async (req, res) => {
  try {
    const payload = await jwt.verify(req.cookies.refreshToken, JWT_REFRESH_SECRET);
    await Token.findOne({
      where: {
        id: payload.id
      }
    }).then(token => {
      if (token !== null) {
        Token.destroy({
          where: {
            id: payload.id
          }
        });
      }
    });

    const token = jwt.sign(
      {
        sub: 'Logout',
        iat: new Date().getTime(),
        exp: new Date().getTime()
      },
      JWT_SECRET
    );
    res.clearCookie('refreshToken');
    res.status(200).json({
      success: true,
      token: token
    });
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
};

exports.confirmEmail = async (req, res) => {
  let payload;
  try {
    const { token } = req.body;
    payload = await jwt.verify(token, MAIL_TOKEN_SECRET);

    const foundUser = await User.findOne({ where: { id: payload.userId } });
    if (foundUser === null) {
      res.status(400).json({ message: "User wasn't found" });
    } else if (foundUser.status_id == 3) {
      await User.update({ status_id: 1 }, { where: { id: foundUser.id } });
      res.status(201).json({ success: true });
    } else if (foundUser.status_id == 1) {
      res.status(201).json({ success: true });
    } else if (foundUser.status_id == 2) {
      res.status(400).json({ message: 'User was banned' });
    }
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token' });
    } else {
      res.status(400).json({ err });
    }
    return;
  }
};
