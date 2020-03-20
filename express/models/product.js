const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const Unit = require('./unit');

const productSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 80,
    },
    units: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Unit'
        //dla trybu nie hybrydowego
        // type: String,
        // required: true,
        // minlength: 2,
        // maxlength: 10,
    }
})

const Product = mongoose.model('Product', productSchema)

function validateProduct(product) {
    const schema = {
        name: Joi.string().min(3).max(80).required(),
        type: Joi.string().min(3).max(80).required(),
        units: Joi.required(),
        // dla trybu nie hybrydowego
        // units: Joi.string().min(2).max(10).required()
    }
    console.log('walidacja');
    return Joi.validate(product, schema);
}

async function addProduct(req, res) {
    let amaunt = await Product.count({});
    const product = new Product({
        id: amaunt,
        name: req.name,
        type: req.type,
        units: req.units
    })
    const result = await product.save();
    res.send(_.pick(product, ['id', 'name', 'type', 'units']));
    return result;
}


exports.Product = Product;
exports.validateProduct = validateProduct;
exports.addProduct = addProduct;