var express = require('express');
var router = express.Router();
var registerChecks = require('../middlewares/registerChecks')
var register = require('../contollers/register')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',registerChecks)

module.exports = router;
