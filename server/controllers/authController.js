require("dotenv").config();
const jwt = require("jsonwebtoken");
//!!!!!!!!!
//Model User:
const User = require("../models").users;
const Token = require("../models").token;
//get value from config/default.json
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE_IN = process.env.JWT_EXPIRE_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRE_IN = process.env.JWT_REFRESH_EXPIRE_IN;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const tokenService = require("../services/tokenService");

const updateTokens = user => {
  const accessToken = tokenService.generateAccessToken(user);
  const idPlusToken = tokenService.generateRefreshToken(user);
  const refreshToken = idPlusToken.token;
  const decoded_access = jwt.decode(accessToken);
  const decoded_refresh = jwt.decode(refreshToken);
  //console.log(idPlusToken.id, user.id, decoded_refresh.exp);
  return tokenService
    .replaceDbRefreshToken(idPlusToken.id, user.id, decoded_refresh.exp)
    .then(() => ({
      token: accessToken,
      refreshToken: refreshToken,
      expiresIn: decoded_access.exp
    }));

};
// const tokenService = new TokenService();

// singToken = user => {
//   return JWT.sign(
//     {
//       sub: user.id,
//       iat: new Date().getTime(), //current time
//       exp: new Date().getTime() + JWT_EXPIRE_IN //current time + JWT_EXPIRE_IN
//     },
//     JWT_SECRET
//   );
// };

exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    //if user exist return res
    if (foundUser) {
      return res.status(200).json({ error: "Email is already in use" });

    }
    //else create new user into DB and generate token
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword);
    await User.create({
      email: email,
      password: hashPassword,
      sex: req.body.sex || "Unknown",
      first_name: req.body.firstname || "",
      last_name: req.body.lastname || "",
      phone: req.body.phone || "",
      role: "User",
      status_id: 1

    });

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
    res.status(200).json({
      token: tokens.token,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn
    });
  });
};

exports.refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = await jwt.verify(refreshToken, JWT_REFRESH_SECRET);
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: "Token expired" });
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: "Invalid token" });
    }
    return;
  }
  //console.log(payload);

  await Token.findOne({ where: { id: payload.id } })
    .then(token => {
      if (token === null) {
        throw new Error("Invalid token!");
      }
      const user = User.findOne({ where: { id: token.user_id } });
      if (!user) {
        throw new Error("User dosn't exist");
      }
      return updateTokens(user);
    })
    .then(tokens => res.json(tokens))
    .catch(err => res.status(400).json({ message: err.message }));
};

exports.signOut = async (req, res) => {
  //Delete refresh token from DB, create expiration access token and pass to front-end
  try {
    const payload = await jwt.verify(req.body.refreshToken, JWT_REFRESH_SECRET);

    await Token.findOne({ where: { id: payload.id } }).then(token => {
      if (token !== null) {
        Token.destroy({ where: { id: payload.id } });
      }
    });
    const token = jwt.sign(
      {
        sub: "Logout",
        iat: new Date().getTime(), //current time
        exp: new Date().getTime() //current time
      },
      JWT_SECRET
    );
    res.status(200).json({ success: true, token: token });
  } catch (e) {
    res.status(400).json();
  }
};

exports.checkAuth = async (req, res) => {
  //console.log("start authController.checkAuth");
  const { token } = req.body;
  try {
    jwt.verify(token, JWT_SECRET);
    res.status(200).send();
  } catch (err) {
    return res.status(401).json({ error: err });
  }

};
