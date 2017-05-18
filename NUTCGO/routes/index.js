var express = require('express');
var router = express.Router();

var storage = require('../db/storage');

var obj = {
  Email: "handsome@gmail.com",
  PassWord: "udontn",
  UserID: "handsome",
  UserName: "張OO",
  id: 1016
};



/* GET home page. */
router.get('/', function (req, res, next) {

  /*
  req.session.UserData = obj;
  req.session.IsLogin = true;
  */

  res.render('index', {
    nav: storage.Nav.home,
    session: req.session,
  });
});

router.get('/home', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.home,
    session: req.home,
  });
});

router.get('/map', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.map,
    session: req.session,
  });
});


router.get('/building', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.building,
    session: req.session,
  });
});

router.get('/art', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.art,
    session: req.session,
  });
});

router.get('/admin', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.admin,
    session: req.session,
  });
});

router.get('/traffic', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.traffic,
    session: req.session,
  });
});

router.get('/sport', function (req, res, next) {
  res.render('index', {
    nav: storage.Nav.sport,
    session: req.session,
  });
});

router.get('/logout', function (req, res, next) {

  delete req.session.IsLogin;
  delete req.session.UserData;

  res.redirect('/');
});

module.exports = router;