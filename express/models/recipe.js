const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const Unit = require('./unit');

const recipeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    photoSrc: {
        type: String,
        required: false,
    },
    shortDescription: {
        type: String,
        require: true,
    },
    preparationTime: {
        type: Number,
        require: true,
    },
    levelOfDifficulty: {
        type: Number,
        require: true,
    },
    portions: {
        type: Number,
        require: true,
    },
    caloriesPerPortion: {
        type: Number,
        require: true,
    },
    instructionsSet: {
        type: String,
        require: true
    },
    ingredients: {
         id: {
             type: Number,
             required: true,
        },
        name: {
             type: String,
             required: true,
         },
        units: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Unit'
        },
         quantity: {
            type: Number,
            required: true,
         },
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

function validateRecipe(recipe) {
    const schema = {
        id: Joi.number().required(),
        title: Joi.string().min(3).max(20).required(),
        shortDescription: Joi.string().min(3).max(100).required(),
        preparationTime: Joi.number().greater(0).required(),
        levelOfDifficulty: Joi.number().greater(0).less(5).required(),
        portions: Joi.number().greater(0).required(),
        caloriesPerPortion: Joi.number().greater(0).required(),
        instructionsSet: Joi.string().min(10).max(1000).required(),
        ingredients: name.Joi.string().min(3).max(20).required(),
        ingredients: units.Joi.required(),
        ingredients: quantity.Joi.greater(0).required()
    }
    console.log('walidacja');
    return Joi.validate(recipe, schema);
}

async function addRecipe(req, res) {
    const recipe = new Recipe({
        id: req.id,
        title: req.title,
        shortDescription: req.shortDescription,
        preparationTime: req.preparationTime,
        levelOfDifficulty: req.levelOfDifficulty,
        portions: req.portions,
        caloriesPerPortion: req.caloriesPerPortion,
        instructionsSet: req.instructionsSet,
        ingredients: req.id,
        ingredients: req.name,
        ingredients: req.units,
        ingredients: req.quantity
    })
    const result = await recipe.save();
    res.send(_.pick(recipe, ['id', 'title', 'shortDescription', 'preparationTime', 'levelOfDifficulty', 'portions', 'caloriesPerPortion', 
'instructionsSet', 'ingredients'['id', 'name', 'units', 'quantity']]));
    return result;
}

exports.Recipe = Recipe;
exports.validateRecipe = validateRecipe;
exports.addRecipe = addRecipe;