var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render('delete-book', {title: 'Delete Entry'});
});

module.exports = router;
