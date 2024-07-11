const express = require('express');
const router =  express.Router();
const receipeController= require('../controllers/receipeController');


// App routes
router.get('/',receipeController.homepage);
router.get('/categories',receipeController.exploreCategories);
router.get('/recipe/:id',receipeController.exploreRecipe);
router.get('/categories/:id',receipeController.exploreCategoriesById);
router.post('/search',receipeController.searchRecipe);
router.get('/explore-latest',receipeController.exploreLatest);
router.get('/explore-random',receipeController.exploreRandom);
router.get('/submit-recipe',receipeController.submitRecipe);
router.post('/submit-recipe',receipeController.submitRecipeOnPost);



module.exports = router;
