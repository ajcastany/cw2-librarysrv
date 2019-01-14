var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render('add-user', {title: 'Add User'});
});
// router.get("../", function(req, res, next) {
//   res.render('navigation', {title: 'navigation'});
// });

module.exports = router;
