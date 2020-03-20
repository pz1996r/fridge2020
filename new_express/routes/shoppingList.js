const _ = require('lodash');
const auth = require('../middelwears/auth');
const api = require('../routes.js')
const router = api.router;
const { ShoppingListItem, validateItem, addShoppingListItem } = require('../models/shoppingListItem');
const { Unit } = require('../models/unit');

router.post('shoppingList/', auth, async (req, res) => {
    const { error } = validateItem(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let item = await ShoppingListItem.findOne({ name: req.body.name });
    if (item) return res.status(400).send('that product already exist');
    addShoppingListItem(req.body, res);
})

router.get('/shoppingList/:shoppingListItem', auth, async (req, res) => {
    let item = !isNaN(parseInt(req.params.shoppingListItem))
        ? await ShoppingListItem.findOne({ id: req.params.shoppingListItem })
            .populate('units', 'name -_id').select('id name quantity units -_id')
        : await ShoppingListItem.findOne({ name: req.params.shoppingListItem })
            .populate('units', 'name -_id').select('id name quantity units -_id');
    if (item) return res.send(item);
    return res.status(404).send(`That product doesn't exist`);
})

router.get('/shoppingList/', auth, async (req, res) => {
    const items = await ShoppingListItem.find().populate('units', 'name -_id').select('id name quantity units -_id');
    return res.send(items);
})

router.put('/shoppingList/:shoppingListItem', auth, async (req, res) => {
    let item = !isNaN(parseInt(req.params.shoppingListItem))
        ? await ShoppingListItem.findOne({ id: req.params.shoppingListItem })
        : await ShoppingListItem.findOne({ name: req.params.shoppingListItem });

    item = !isNaN(parseInt(req.params.shoppingListItem))
        ? await ShoppingListItem.findOneAndUpdate({ id: req.params.shoppingListItem }, {
            $set: {
                id: (!!req.body.id) ? req.body.id : item.id,
                name: (!!req.body.name) ? req.body.name : item.name,
                units: (!!req.body.units) ? req.body.units : item.units,
                quantity: (!!req.body.quantity) ? req.body.quantity : item.quantity
            }
        }, { returnNewDocument: true, upsert: true, new: true })
        : await ShoppingListItem.findOneAndUpdate({ name: req.params.shoppingListItem }, {
            $set: {
                id: (!!req.body.id) ? req.body.id : item.id,
                name: (!!req.body.name) ? req.body.name : item.name,
                units: (!!req.body.units) ? req.body.units : item.units,
                quantity: (!!req.body.quantity) ? req.body.quantity : item.quantity
            }
        }, { returnNewDocument: true, upsert: true, new: true });
    return res.send(item);
})

router.delete('/shoppingList/:shoppingListItem', auth, async (req, res) => {
    return res.send(!isNaN(parseInt(req.params.shoppingListItem))
        ? await ShoppingListItem.deleteOne({ id: req.params.shoppingListItem })
        : await ShoppingListItem.deleteOne({ name: req.params.shoppingListItem }));
})

module.exports = router;