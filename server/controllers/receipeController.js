require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

// GET /
// Home Page

exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).limit(limitNumber);

    const indian = await Recipe.find({'category' : 'Indian'}).limit(limitNumber);
    const japenese = await Recipe.find({'category' : 'Japenese'}).limit(limitNumber);
    const russian = await Recipe.find({'category' : 'Russian'}).limit(limitNumber);
    
    const food = {latest,indian,japenese,russian};
    res.render("index", { title: "Cooking Blog - Home", categories,food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



// GET / categories
// Categories

exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);

    {
      res.render("categories", {
        title: "Cooking Blog - Categories",
        categories,
      });
    }
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



// GET / recipe/:id
// Recipe

exports.exploreRecipe = async (req, res) => {
  try {
    
    let recipeId = req.params.id;

    const recipe = await Recipe.findById(recipeId);

    res.render('recipe',{title:'Cooking Blog - Recipe',recipe});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



// GET / categories/:id
// Categories

exports.exploreCategoriesById = async (req, res) => {
  try {
    
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({'category':categoryId }).limit(limitNumber);

    res.render('categories',{title:'Cooking Blog - Categories',categoryById});
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};



// POST / search
// Search

exports.searchRecipe = async(req,res)=>{
try{

  let searchTerm = req.body.searchTerm;
  
  let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive:true}});
  res.render('search',{title:'Cooking Blog - Search',recipe});

}catch(error){
    res.status(500).send({ message: error.message || "Error Occured" });
  }

}




// GET / explore-latest
// Explore Latest

exports.exploreLatest = async(req,res)=>{
  try{
  
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({_id : -1}).limit(limitNumber);
    res.render('explore-latest',{title:'Cooking Blog - Explore Latest',recipe});
  
  }catch(error){
      res.status(500).send({ message: error.message || "Error Occured" });
    }
  
  }






  // GET / explore-random
// Explore Random

exports.exploreRandom = async(req,res)=>{
  try{
  
    let count = await Recipe.find().countDocuments();
    let random = Math.floor(Math.random()* count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render('explore-random',{title : 'Cooking Blog - Explore Random',recipe});
    
  
  }catch(error){
      res.status(500).send({ message: error.message || "Error Occured" });
    }
  
  }





  
  // GET / submit-recipe
// Submit Recipe

exports.submitRecipe = async(req,res)=>{
  
  const infoErrorObj  = req.flash('infoErrors');
  const infoSubmitObj = req.flash('infoSubmit');

  res.render('submit-recipe',{title : 'Cooking Blog - Submit Recipe',infoErrorObj,infoSubmitObj});
  
}



 // POST / submit-recipe
// Submit Recipe

exports.submitRecipeOnPost = async(req,res)=>{
  try{

    let imageUploadFile;
    let uploadPath;
    let newImageName;
    if(!req.files || Object.keys(req.files).length === 0){
      console.log('No files are uploaded');
    }else{
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;

      uploadPath = require('path').resolve('./') + '/public/images/' + newImageName;
      imageUploadFile.mv(uploadPath,function(err){
        if(err) return res.status(500).send(err);
        console.log(err);
      })
    }

    const newRecipe = new Recipe({
      name: req.body.name,
      description :  req.body.description,
      email:  req.body.email,
      category :  req.body.category,
      ingridients:  req.body.ingridients,
      image: newImageName
    });

  await newRecipe.save();
  req.flash('infoSubmit','Recipe has been added.');
  res.redirect('/submit-recipe');

  }catch(error)
  {
    // req.json(error);
    req.flash('infoErrors',error);
    res.redirect('/submit-recipe');
    console.log(error);
  }

}





// Delete Recipe
// async function deleteRecipe(){
//   try{
//     const res = await Recipe.deleteOne({name:'ne recipe'});
//   }catch(error)
//   {
//     console.log(error);
//   }
// }

// deleteRecipe();


// Update Recipe
// async function updateRecipe(){
//   try{
//     const res = await Recipe.updateOne({name:'ne recipe'},{naem:'New updated'});
//     res.n; // nu of docu watch
//     res.nModified;

//   }catch(error)
//   {
//     console.log(error);
//   }
// }

// updateRecipe();




















// async function insertDummyCategoryData(){
//     try{
//         await Category.insertMany([
//             {
//                 "name" : "American",
//                 "image" : "american.jpg"
//             },
//             {
//                 "name" : "Mexican",
//                 "image" : "tasty.jpg"
//             },
//             {
//                 "name" : "Indian",
//                 "image" : "uk.jpg"
//             },
//             {
//                 "name" : "Chinese",
//                 "image" : "pe.jpg"
//             }
//         ]);
//     }
//     catch(err)
//     {
//         console.log('err' ,+error);
//     }
// }

// insertDummyCategoryData();

// async function insertDummyRecipeData() {
//   try {
//     await Recipe.insertMany([
//       {
//         name: "Hakka Noodles",
//         description: `Chinese noodles are a staple food made from wheat, rice, or mung bean starch, and come in various shapes and sizes. They can be stir-fried, boiled, or served in soups, with popular varieties including chow mein, lo mein, and rice noodles. They are often flavored with sauces, vegetables, and proteins.`,
//         email: "recipeemail@raddy.co.uk",
//         ingredients: [
//           "Noodles",
//           "1 level teaspoon all spices",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         category: "Chinese",
//         image: "chinese.jpg",
//       },
//       {
//         name: "Butter Paneer Masala",
//         description: `Indian butter paneer, also known as paneer makhani, is a rich and creamy dish made with paneer (Indian cottage cheese) cooked in a tomato-based sauce with butter, cream, and spices. It's typically enjoyed with naan or rice.`,
//         email: "hina@atmi.co.ind",
//         ingredients: [
//           "Raw paneer according to your need",
//           "Spices - ginger, bay leaf, Coriander,Turmeric,Chilly",
//           "cream",
//           "1 can of tomatoes",
//           "1 level teaspoon butter",
//         ],
//         category: "Indian",
//         image: "indP.jpg",
//       },
//       {
//         name: "Rich Burger",
//         description: `An American burger consists of a ground beef patty, typically grilled or fried, served in a bun with various toppings like lettuce, tomato, cheese, pickles, onions, and condiments such as ketchup, mustard, and mayonnaise. It's a classic fast-food item and a staple of American cuisine.`,
//         email: "ameri@atmi.co.usa",
//         ingredients: [
//           "Two slices of bun",
//           "Beef patty",
//           "lettuce,tomato,pickles,onions"
//         ],
//         category: "American",
//         image: "usa.jpg",
//       },
//       {
//         name: "Tomatny Sup",
//         description: `
// Russian tomato soup, known as "Tomatny Sup," is a hearty and flavorful soup made from tomatoes, onions, garlic, and various herbs. It often includes ingredients like bell peppers, carrots, and potatoes, and is sometimes enriched with sour cream. It’s enjoyed hot, typically with bread.`,
//         email: "russian@.co.russia",
//         ingredients: [
//           "Tomatoes,onion",
//           "Dil,parsley",
//           "Veggies"
//         ],
//         category: "Russian",
//         image: "russian.jpg",
//       },
//       {
//         name: "Ramen",
//         description: `Japanese ramen is a popular noodle soup consisting of Chinese-style wheat noodles served in a rich and flavorful broth. The broth can be made from pork, chicken, or seafood, and is often flavored with soy sauce or miso. Toppings typically include sliced pork (chashu), nori (seaweed), menma (bamboo shoots), and a soft-boiled egg. `,
//         email: "hiroshi@.co.jpn",
//         ingredients: [
//           "Chinese style wheat noodles ",
//           "pork,chicken sesafood",
//           "Soy sauce or miso",
//           "Boiled egg,green onions,garlic,ginger,Nori,"
//         ],
//         category: "Japanese",
//         image: "japenese.jpg",
//       },
      
//     ]);
//   } catch (error) {
//     console.log("error", + error);
//   }
// }

// insertDummyRecipeData();
