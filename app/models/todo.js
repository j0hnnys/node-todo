var mongoose = require('mongoose');
// first make a new schema for our model
// this is just the blueprint and how we tell mongoose to
// handle our data. Mongo doesn't care.
var TodoSchema =  new mongoose.Schema({
   
   // initially false
   completed: Boolean,
   
   // defines the snooze aspect
   snooze: Boolean,
   
   //we can ad validations too
   // just use an object literal here instead
   // just be sure to have a type property on that object
   // to tell mongoose what type this property will be
   text : {
      type : String, // will be a string 
      required: true
   }
});

/**
   No matter what we pass in as a name for the model,
   mongoose will lowercase it and pluralize it for the collection.
   so below the name for the model is 'Todo', mongoose will
   will convert that do 'todos' in the database.
**/

// TodoModel is the model we'll use in node to CRUD so
// it makes sense to epxport this.
var TodoModel = mongoose.model('Todo', TodoSchema);
module.exports = TodoModel
