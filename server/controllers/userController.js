const User = require('../models').users;
const Event = require('../models').event;
const UserEvent = require('../models').user_event;
const Category = require('../models').category;
const UserCategory = require('../models').user_category;

const ROLE_USER = 'User';
const ROLE_MODERATOR = 'Moderator';
const USER_BAN = 2;
const USER_UNBAN = 1;

exports.getCurrent = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.userId },
      attributes: { exclude: ['password', 'status_id', 'role'] }
    });
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: ['first_name', 'last_name', 'avatar']
    });
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const event = await Event.findAll({
      where: { owner_id: req.userId },
      raw: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const category = await Category.findAll({
      where: { parent_id: req.userId },
      raw: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        category
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getFollowedEvents = async (req, res) => {
  try {
    const followedEvent = await UserEvent.findAll({
      where: { user_id: req.userId },
      raw: true,
      attributes: [],
      include: [{ model: Event }]
    });
    res.status(200).json({
      status: 'success',
      data: {
        followedEvent
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.unfollowFromEvent = async (req, res) => {
  try {
    const event = await UserEvent.findOne({
      where: { user_id: req.userId },
      include: [{ model: Event, where: { id: req.params.id } }]
    });
    await event.destroy();
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getFollowedCategories = async (req, res) => {
  try {
    const followedCategory = await UserCategory.findAll({
      where: { user_id: req.userId },
      raw: true,
      attributes: [],
      include: [Category]
    });
    res.status(200).json({
      status: 'success',
      data: {
        followedCategory
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, phone, avatar, birthday, sex } = req.body;
  const newData = { first_name, last_name, phone, avatar, birthday, sex };
  try {
    await User.update(newData, { where: { id: req.userId } });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.setRoleToModerator = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user.role === ROLE_USER) {
      await user.update({ role: ROLE_MODERATOR });
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(400).json({
        message: "You can't set a Moderator if you are a Moderator!"
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.setRoleToUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (user.role === ROLE_MODERATOR) {
      await user.update({ role: ROLE_USER });
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(400).json({
        message: "You can't set a User if you are a User!"
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.ban = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    await user.update({ status_id: USER_BAN });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.unban = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    await user.update({ status_id: USER_UNBAN });
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
