const router = require('express').Router();
const route_post = require('./route_post');
const route_auth = require('./route_auth');




router.use('/auth', route_auth);
router.use('/post', route_post);


module.exports = router;