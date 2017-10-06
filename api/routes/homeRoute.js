//Dependencies
let express = require('express')
let router = express.Router()
let db = require('./../model/db');
let path = require('path')

//Enable cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use('/', express.static(path.resolve('client/build/static')));

//Set routes for different path
//Home Route
router.get('/', (req, res, next) => {
  res.sendFile(path.resolve('client/build/index.html'));
})

//router to render signup page
router.get('/signup', (req, res, next) => {
  //res.render('signup.ejs', {loggedIn: false, data: null})
})

//router to handle post request for user signup
router.post('/signup', (req, res, next) => {
  console.log("Logged")
  db.createUser(req.body, (err, user) => {
    if(err)
      res.send(err)
    else {
      res.send("Account Created Successfully")
    }
    next()
  })
})

//router to get buddy lists
router.get('/buddy-list', (req, res, next) => {
  db.getBuddyList((err, buddies) => {
    if(err)
      res.send(err)
    else
      res.send(buddies)
  })
})

//router to add buddy
router.post('/buddy-list', (req, res, next) => {
  db.addBuddy(req.body, (err, buddy) => {
    if(err)
      res.send(err)
    else
      res.send(buddy)
  })
})

//router to delete buddy
router.post('/delete-buddy', (req, res, next) => {
  db.deleteBuddy(req.body, (err, success) => {
    if(err)
      res.send(err)
    else
      res.send(success)
  })
})

module.exports = router;