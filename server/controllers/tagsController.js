const Category = require('../models').category;

exports.getListOfAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({ raw: true });
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal Server Error ' });
  }
};
