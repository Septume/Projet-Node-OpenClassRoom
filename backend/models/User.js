const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email:{ type:String, required:true, unique:true },
    password:{ type:String, required:true}
});


// npm i --save mongoose-unique-validator
// verifie que le le charctère unique de la selection
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

//killall node