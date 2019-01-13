var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render('add-user', {title: 'Add User'});
});

module.exports = router;
