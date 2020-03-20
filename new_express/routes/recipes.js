const _ = require('lodash');
const { Recipe, validateRecipe, addRecipe } = require('../models/recipe');
const { Unit } = require('../models/unit');
const api = require('../routes.js')
const router = api.router;

router.post('/recipes', async (req, res) => {
    const { error } = validateRecipe(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let recipe = await Recipe.findOne({ title: req.body.title });
    if (recipe) return res.status(400).send('that product already exist');
    addRecipe(req.body, res);
})