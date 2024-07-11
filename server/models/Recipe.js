const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({

    name:{
        type:String,
        required: 'This field is required'
    },
    description:{
        type:String,
        required: 'This field is required'
    },
    ingridients:{
        type:Array,
        required: 'This field is required'
    },
    category:{
        type:String,
        enum:['American','Indian','Chinese','Japenese','Russian'],
        required: 'This field is required'
    },
    image:{
        type:String,
        required: 'This field is required'
    },
});

recipeSchema.index({name : 'text',description : 'text'});

//WildCard Indexing

// recipeSchema.index({"$**" : 'text'});


module.exports = mongoose.model('Recipe',recipeSchema);
