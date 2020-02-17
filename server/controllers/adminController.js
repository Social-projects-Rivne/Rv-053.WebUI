const User = require('../models').users;
const User_Status = require('../models').user_status;

const { Op } = require('sequelize');

exports.getAllUsersOrSearch = async (req, res) => {
  try {
    const limit = req.query.limit || null;
    const offset = req.query.offset || 0;
    let searchQuery = {};
    if (req.query.q) {
      const reqQ = req.query.q;
      let roleQuery = null;
      if (await User.rawAttributes.role.values.includes(reqQ)) {
        roleQuery = { role: reqQ };
      }
      searchQuery = {
        [Op.or]: [
          { email: { [Op.iLike]: `%${reqQ}%` } },
          { first_name: { [Op.iLike]: `%${reqQ}%` } },
          { last_name: { [Op.iLike]: `%${reqQ}%` } },
          { phone: { [Op.iLike]: `%${reqQ}%` } },
          roleQuery
        ]
      };
    }

    const users = await User.findAndCountAll({
      where: searchQuery,
      attributes: { exclude: ['password', 'status_id'] },
      include: { model: User_Status, attributes: ['status'] },
      offset,
      limit,
      order: [['id', 'DESC']]
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};