const User = require('../models').users;
const Event = require('../models').event;
const UserEvent = require('../models').user_event;
const Category = require('../models').category;
const UserCategory = require('../models').user_category;

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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
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
    res.status(500).json({ error: err.message ? err.message : err });
  }
};
