require('dotenv').config();
const jwt = require('jsonwebtoken');
//!!!!!!!!!
//Model User:
const User = require('../models').users;
const Token = require('../models').token;
//get value from config/default.json
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
  //console.log(idPlusToken.id, user.id, decoded_refresh.exp);
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
    const foundUser = await User.findOne({ where: { email } });
    //if user exist return res
    if (foundUser && foundUser.status_id != 3) {
      return res.status(200).json({ error: 'Email is already in use' });
    }
    //else create new user into DB and generate token
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword);

    //Add user in DB
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
    console.log('foundUser.id  ' + payload.userId);
    //TODO: send email

    const mailToken = jwt.sign(payload, MAIL_TOKEN_SECRET, {
      expiresIn: MAIL_TOKEN_EXPIRE_IN
    });
    const mailURL = 'http://localhost:3001/confirmemail';
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
    <div>
    <a style="min-width:196px;border-top:13px solid;border-bottom:13px solid;
    border-right:24px solid;border-left:24px solid;border-color:#2ea664;
    border-radius:4px;background-color:#2ea664;color:#ffffff;font-size:18px;
    line-height:18px;/*! word-break:break-word; */display:inline-block;text-align:
    center;font-weight:900;/*! text-decoration:none!important; */"
     href="${mailURL}/${mailToken}" target="_blank" >Verify email address</a>
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

exports.signIn = async (req, res) => {
  //Generate token
  //console.log("start authController.signIn ");

  updateTokens(req.user).then(tokens => {
    //console.log(tokens);
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

exports.refreshTokens = async (req, res) => {
  //const { refreshToken } = req.body;
  const { refreshToken } = req.cookies;
  let payload;
  try {
    payload = await jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired' });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token' });
    }
    return;
  }

  await Token.findOne({ where: { id: payload.id } })
    .then(async token => {
      if (token === null) {
        throw new Error('Invalid token!');
      }
      const user = await User.findOne({ where: { id: token.user_id } });
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
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.signOut = async (req, res) => {
  //Delete refresh token from DB
  try {
    const payload = await jwt.verify(req.cookies.refreshToken, JWT_REFRESH_SECRET);
    await Token.findOne({ where: { id: payload.id } }).then(token => {
      if (token !== null) {
        Token.destroy({ where: { id: payload.id } });
      }
    });
    //create expiration access token
    const token = jwt.sign(
      {
        sub: 'Logout',
        iat: new Date().getTime(), //current time
        exp: new Date().getTime() //current time
      },
      JWT_SECRET
    );
    //Clear httpOnly cookie 'refreshToken'
    res.clearCookie('refreshToken');
    //pass expired token to front-end
    res.status(200).json({ success: true, token: token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// exports.checkAuth = async (req, res) => {
//   //console.log("start authController.checkAuth");
//   const { token } = req.body;
//   try {
//     jwt.verify(token, JWT_SECRET);
//     res.status(200).send();
//   } catch (err) {
//     return res.status(401).json({ error: err });
//   }
// };

exports.confirmEmail = async (req, res) => {
  //Confirm email
  let payload;
  try {
    const { token } = req.body;
    payload = await jwt.verify(token, MAIL_TOKEN_SECRET);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired' });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid token' });
    }
    return;
  }

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
};
