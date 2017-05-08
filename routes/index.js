var express = require('express');
var router = express.Router();

var storage = require('./modal/storage');

/* GET home page. */
router.get('/', function (req, res, next) {

  var obj = {
    Email: "handsome@gmail.com",
    PassWord: "udontn",
    UserID: "handsome",
    UserName: "帥哥",
    id: 1016
  };

  req.session.UserData = obj;

  res.render('index', {
    nav: storage.Nav.home,
    session: req.session
  });
});

router.get('/map', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/home', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/building', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/art', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/admin', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/traffic', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/sport', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/account', function (req, res, next) {
  res.render('index', {

  });
});

router.get('/signup', function (req, res, next) {
  res.render('index', {

  });
});

module.exports = router;