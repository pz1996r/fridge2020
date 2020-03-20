const mongoose = require('mongoose');
const Joi = require('joi');
const _ = require('lodash');
const Product = require('./product');
const Unit = require('./unit');
const User = require('./user.js');

// Fridge content Schema
const fridgeItemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // type: String,
        // required: true
    },
    units: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Unit'
        type: String,
        required: true
    },
    avaliableQuantity: {
        type: Number,
        required: true
    }
});

const FridgeItem = mongoose.model('FridgeItem', fridgeItemSchema);
// Walidacja produktu
function validateItem(item) {
    const schema = {
        product: Joi.required(),
        owner: Joi.required(),
        units: Joi.required(),
        avaliableQuantity: Joi.number().required()
    }
    return Joi.validate(item, schema);
}

// Dodawanie produktu do lodówki manualnie
async function addToFridge(req, res) {
    const item = new FridgeItem({
        id: 0,
        owner: req.owner,
        product: req.product,
        units: req.units,
        avaliableQuantity: req.avaliableQuantity
    })
    const result = await item.save();
    res.send(_.pick(item, ['id', 'product', 'units', 'avaliableQuantity']));
    return result
};

exports.FridgeItem = FridgeItem;
exports.addToFridge = addToFridge;
exports.validateItem = validateItem;