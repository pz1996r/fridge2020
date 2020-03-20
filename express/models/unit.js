const mongoose = require('mongoose');

const Unit = mongoose.model(
    'Unit',
    new mongoose.Schema({
        name: String,
        type: String,
        value: Number,
    }),
);

async function getUnits() {
    try {
        let units = await Unit.find();
        return units;
    } catch (error) {
        return error;
    }
}

async function getValue(unitName, amount) {
    let result;
    if (unitName.endsWith('s')) {
        result = await Unit.findOne({ name: unitName.slice(0, -1) });
        if (!result) {
            result = await Unit.findOne({ name: unitName });
        }
    } else {
        result = await Unit.findOne({ name: unitName });
    }
    return !!result ? result.value * amount : 0;
}

async function sumValues(products) {
    let sum = 0;
    let error = false;
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        value = await getValue(product.unit, product.amount);
        if (!value) {
            error = true;
        }
        sum += value;
    }
    return error ? { sum, error } : sum;
}

exports.Unit = Unit;
exports.getUnits = getUnits;
exports.getValue = getValue;
exports.sumValues = sumValues;
