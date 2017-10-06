//Some Database Code
//Dependencies
let Schema = require('./schema')
let mongoose = require('mongoose')

//Models
var User = mongoose.model('User', Schema.userSchema);
var Buddy = mongoose.model('Buddy', Schema.buddySchema);

//To add new user
var createUser = (user, callback) => {
  User.findOne({email: user.email})
    .exec((err, doc) => {
      if(err)
        return callback("An Error Occured", null)
      if(doc)
        return callback("E-mail already Registered! Please Log in", null)
      else{
        var u = new User()
        u.firstName = user.firstName,
        u.lastName = user.lastName,
        u.email = user.email
        u.password = u.generateHash(user.password)
        console.log("DONE")
        u.birthday = user.birthday,
        
        u.save((err, success) => {
          return callback(err, success)
        })
      }
    })
}

//To authenticate user
var authenticateUser = (user, callback) => {
  User.findOne({ email: user.email })
    .exec((err, doc) => {
      if(err)
        return callback("An Error Occured", null)

      if(doc){
        var valid = doc.validatePassword(user.password, doc.password)
        if(valid)
          return callback(null, doc)
        else
          return callback("Oops! You entered the wrong password", null)
      }

      else
        return callback("User not found! Please Sign up first", null)
    })
}

//Get user data
var getUser = (id, callback) => {
  User.findOne({ _id: id })
    .exec((err, user) => {
      callback(err, user)
    })
}

//Get buddy List
var getBuddyList = (callback) => {
  Buddy.find({}, (err, doc) => {
    callback(err, doc)
  })
}

//Add new Buddy
var addBuddy = (data, callback) => {
  var buddy = new Buddy(data);

  buddy.save((err, success) =>{
    callback(err, success)
  })
}

//Delete Buddy
var deleteBuddy = (data, callback) => {
  Buddy.remove({_id: data.id}, (err, success) => {
    callback(err, success)
  })
}

module.exports = {
                   createUser,
                   authenticateUser,
                   getUser,
                   getBuddyList,
                   addBuddy,
                   deleteBuddy
                 }
