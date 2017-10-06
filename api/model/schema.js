//Dependencies
let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

//Schemas
let userSchema = mongoose.Schema({
  "firstName": String,
  "lastName": String,
  "email": String,
  "password": String,
  "birthday": Date
})

let buddySchema = mongoose.Schema({
  "firstName": String,
  "lastName": String
})

//Schema methods to generate and comapare hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validatePassword = function(password, orignalPassword){
  return bcrypt.compareSync(password, orignalPassword)
}

//export schemas
module.exports = {
  userSchema,
  buddySchema
}