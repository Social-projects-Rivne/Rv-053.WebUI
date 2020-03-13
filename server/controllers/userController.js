require('dotenv').config();
const fs = require('fs');
const { Op } = require('sequelize');
const User = require('../models').users;
const Event = require('../models').event;
const UserEvent = require('../models').user_event;
const Category = require('../models').category;
const UserCategory = require('../models').user_category;

const ROLE_USER = 'User';
const ROLE_MODERATOR = 'Moderator';
const ROLE_ADMIN = 'Admin';
const EVENT_ACTIVE = 'Active';
const EVENT_DELETED = 'Deleted';
const USER_BAN = 2;
const USER_UNBAN = 1;

const findUser = async userId =>
  User.findOne({
    where: { id: userId }
    // raw: true
  });

const findCategory = async categoryId =>
  Category.findOne({
    where: { id: categoryId },
    raw: true
  });

const findUserCategory = async (userId, categoryId) =>
  UserCategory.findOne({
    where: { user_id: userId, category_id: categoryId },
    raw: true
  });

const updateUserStatus = async (user, status_id) =>
  user.update({
    status_id
  });

const changeUserStatus = async (req, res, statusId) => {
  try {
    const user = await findUser(req.params.id);
    if (req.userRole === 'Admin' && req.userId !== user.dataValues.id) {
      await updateUserStatus(user, statusId);
      res.status(200).json({
        status: 'success'
      });
    } else if (req.userRole === 'Moderator' && user.dataValues.role === 'User') {
      await updateUserStatus(user, statusId);
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(403).json({
        status: 'No access'
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const isCurrentUserRole = (user, newRole) => {
  if (user.role !== newRole) {
    return false;
  }
  return true;
};

const isCategoryNotExist = (category, res) => {
  if (!category) {
    return res.status(400).json({ err: 'The category does not exist' });
  }
};

const updateUserRole = async (user, role) => user.update({ role });

const changeUserRole = async (req, res, newRole) => {
  try {
    const user = await findUser(req.params.id);
    const isCurrentUserRole1 = isCurrentUserRole(user, newRole);
    if (!isCurrentUserRole1) {
      await updateUserRole(user, newRole);
      res.status(200).json({
        status: 'success'
      });
    } else {
      res.status(400).json({
        message: `You can't set a ${newRole} if you are a ${newRole}!`
      });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

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
    const events = await Event.findAll({
      where: { owner_id: req.params.id },
      attributes: ['id', 'name', 'datetime']
    });
    res.status(200).json({
      status: 'success',
      data: {
        user,
        events
      }
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const event = await Event.findAll({
      where: { owner_id: req.userId, status: { [Op.ne]: EVENT_DELETED } },
      include: [
        {
          model: Category
        }
      ]
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
      attributes: [],
      include: [
        { 
          model: Event, where: { status: EVENT_ACTIVE },
          include: [{model: Category}]
        },
          
      ]
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

exports.followEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const userEvent = await UserEvent.findOne({
      where: { user_id: req.userId, event_id: eventId },
      raw: true
    });
    const event = await Event.findOne({ where: { id: eventId }, raw: true });
    if (!event) {
      return res.status(400).json({ err: 'The event does not exist' });
    }
    if (event.status !== EVENT_ACTIVE) {
      return res.status(400).json({ err: "The event isn't active" });
    }
    if (parseInt(event.datetime, 10) + parseInt(event.duration, 10) * 60 * 1000 < Date.now()) {
      return res.status(400).json({ err: 'The event ended' });
    }
    if (!userEvent) {
      await UserEvent.create({ user_id: req.userId, event_id: eventId });
    }
    res.status(201).json({
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

exports.followCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { userId } = req;

  try {
    const userCategory = await findUserCategory(userId, categoryId);
    const category = await findCategory(categoryId);

    await isCategoryNotExist(category);

    if (!userCategory) {
      await UserCategory.create({ user_id: userId, category_id: categoryId });
    } else {
      return res.status(400).json({ err: 'The category exist' });
    }

    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.updateAvatar = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    let oldAvatar = user.avatar.slice(process.env.BACK_HOST.length);
    await user.update({ avatar: process.env.BACK_HOST + '/' + req.file.path });
    if (oldAvatar) {
      fs.unlink('.' + oldAvatar, err => {
        if (err) {
          console.log('failed to delete local image:' + err);
        } else {
          console.log('successfully deleted local image');
        }
      });
    }
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
exports.deleteAvatar = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.userId } });
    let oldAvatar = user.avatar.slice(process.env.BACK_HOST.length);
    await user.update({ avatar: '' });
    if (oldAvatar) {
      fs.unlink('.' + oldAvatar, err => {
        if (err) {
          console.log('failed to delete local image:' + err);
        } else {
          console.log('successfully deleted local image');
        }
      });
    }
    res.status(200).json({
      status: 'success'
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.unfollowCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { userId } = req;

  try {
    const userCategory = await findUserCategory(userId, categoryId);
    const category = await findCategory(categoryId);

    isCategoryNotExist(category);

    if (userCategory) {
      await UserCategory.destroy({
        where: { user_id: userId, category_id: categoryId }
      });
    } else {
      return res.status(400).json({ err: 'The category not exist' });
    }

    res.status(200).json({
      status: 'success'
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

// exports.setRoleToModerator = async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { id: req.params.id } });
//     if (user.role === ROLE_USER) {
//       await user.update({ role: ROLE_MODERATOR });
//       res.status(200).json({
//         status: 'success'
//       });
//     } else {
//       res.status(400).json({
//         message: "You can't set a Moderator if you are a Moderator!"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({ err: err.message });
//   }
// };

exports.setRoleToUser = async (req, res) => changeUserRole(req, res, ROLE_USER);
exports.setRoleToModerator = async (req, res) => changeUserRole(req, res, ROLE_MODERATOR);
exports.setRoleToAdmin = async (req, res) => changeUserRole(req, res, ROLE_ADMIN);

exports.ban = async (req, res) => changeUserStatus(req, res, USER_BAN);
exports.unban = async (req, res) => changeUserStatus(req, res, USER_UNBAN);
