var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render('update-user', {title: 'Update Users'});
});
// router.get("../", function(req, res, next) {
//   res.render('navigation', {title: 'navigation'});
// });

module.exports = router;
