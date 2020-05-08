const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');
const Item = require('../../models/Item'); // Item model

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */
router.get('/', (req, res) => {
	Item.find()
		.sort({date: -1})
		.then(items => res.json(items))

});
 
router.post('/', (req, res) => {
	const newItem = new Item(
		{name: req.body.name
	});	
	newItem.save().then(item => res.json(item));
}); 

router.delete('/:id', (req, res) => {
	Item.findById(req.params.id)
		.then( item => item.remove().then( () => res.json({success: true})) )
		.catch( err => res.status(404).json({success: false}) )
}); 



 /*
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});*/

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */
/*router.post('/', async (req, res) => {
  try {
    const items = new Item({
		name: req.body.name
		});
    if (!items) throw Error('No items');
    newItem.save().then(item => res.json());

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});*/


/*router.post('/', auth, async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
 */

/*router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});*/
module.exports = router;

