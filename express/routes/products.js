//autoryzacja tokenów
const auth = require('../middelwears/auth');

const _ = require('lodash');
const { Product, validateProduct, addProduct } = require('../models/product');
const { Unit } = require('../models/unit');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(JSON.stringify(error.details[0].message));
    let product = await Product.findOne({ name: req.body.name });
    if (product) return res.status(400).send(JSON.stringify('that product already exist'));
    addProduct(req.body, res);
})

router.get('/:product', async (req, res) => {
    let product = !isNaN(parseInt(req.params.product)) ? await Product.findOne({ id: req.params.product }).populate('units', 'name -_id').select('id name type units -_id') : await Product.findOne({ name: req.params.product }).populate('units', 'name -_id').select('id name type units -_id');
    if (product) return res.send(JSON.stringify(product));
    return res.status(404).send(JSON.stringify(`That product doesn't exist`));
})

router.get('/', async (req, res) => {
    const products = await Product.find().populate('units', 'name -_id').select('id name type units _id');
    return res.send(JSON.stringify(products));
})
module.exports = router;