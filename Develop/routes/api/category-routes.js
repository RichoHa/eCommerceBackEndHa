const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  try {
    const CatergoryData = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const CatergoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    if (!CatergoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const CatergoryData = await Category.create(req.body);
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const CatergoryData = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const CatergoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
