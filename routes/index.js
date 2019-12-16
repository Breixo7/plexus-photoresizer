var express = require('express');
var router = express.Router();
var photoResizer = require('../tools/photo-resizer');
var sanitizer = require('sanitizer');

/* GET home page. */
router.post('/task', function(req, res, next) {
  photoResizer.resizer(res, sanitizer.escape(req.body.url));
});

router.get('/task', function(req, res, next) {
  var task = sanitizer.escape(req.query.taskId)
  photoResizer.taskInfo(res, task);
});

module.exports = router;
