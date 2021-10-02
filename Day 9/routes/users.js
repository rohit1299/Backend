var express = require('express');
var router = express.Router();
const path = require('path')

/* GET users listing. */
console.log(__dirname)
router.get('/file/:name', function(req, res, next) {
  res.sendFile(path.join(__dirname,"../public/images/image.jpg"))
});

module.exports = router;
