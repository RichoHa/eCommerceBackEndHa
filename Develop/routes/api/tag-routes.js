const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint



router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const TagData = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const CatergoryData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });
    if (!CatergoryData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const CatergoryData = await Tag.create(req.body);
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const CatergoryData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(CatergoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const CatergoryData = await Tag.destroy({
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
