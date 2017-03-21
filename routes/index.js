var express = require('express');
var router = express.Router();

var navItem = require('../db/navItem.json');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '首頁',
    key: 'home',
    navItem: navItem
  });
});

router.get('/map', function (req, res, next) {
  res.render('index', {
    title: '地圖定位',
    key: 'map',
    navItem: navItem
  });
});

router.get('/home', function (req, res, next) {
  res.render('index', {
    title: '首頁',
    key: 'home',
    navItem: navItem
  });
});

router.get('/building', function (req, res, next) {
  res.render('index', {
    title: '建物資訊',
    key: 'building',
    navItem: navItem
  });
});

router.get('/art', function (req, res, next) {
  res.render('index', {
    title: '藝術雕像',
    key: 'art',
    navItem: navItem
  });
});

router.get('/admin', function (req, res, next) {
  res.render('index', {
    title: '行政單位',
    key: 'admin',
    navItem: navItem
  });
});

router.get('/traffic', function (req, res, next) {
  res.render('index', {
    title: '交通規劃',
    key: 'traffic',
    navItem: navItem
  });
});

router.get('/sport', function (req, res, next) {
  res.render('index', {
    title: '運動休憩',
    key: 'sport',
    navItem: navItem
  });
});

router.get('/account', function (req, res, next) {
  res.render('index', {
    title: '會員中心',
    key: 'account',
    navItem: navItem
  });
});

router.get('/signup', function (req, res, next) {
  res.render('index', {
    title: '註冊會員',
    key: 'signup',
    navItem: navItem
  });
});

module.exports = router;