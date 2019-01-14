var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render('search', {title: 'Search the Library'});
});

router.get("../", function(req, res, next) {
  res.render('navigation', {title: 'navigation'});
});

module.exports = router;
