const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const Unit = require('./unit');

const shoppingListItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80,
        unique: true
    },
    units: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
    },
    quantity: {
        type: Number,
        required: true,
    },
})

const ShoppingListItem = mongoose.model('shoppingListItem', shoppingListItemSchema);

function validateItem(item) {
    const schema = {
        name: Joi.string().min(3).max(80).required(),
        units: Joi.required(),
        quantity: Joi.number().greater(0).required()
    }
    return Joi.validate(item, schema);
}

async function addShoppingListItem(req, res) {
    let amount = await ShoppingListItem.count({});
    const listItem = new ShoppingListItem({
        id: amount,
        name: req.name,
        units: req.units,
        quantity: req.quantity
    })
    const result = await listItem.save();
    res.send(_.pick(listItem, ['id', 'name', 'units', 'quantity']));
    return result;
}

exports.ShoppingListItem = ShoppingListItem;
exports.validateItem = validateItem;
exports.addShoppingListItem = addShoppingListItem;