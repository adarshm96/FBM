const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const AuthCont = require('../controllers/auth.controller');
const adminMiddleware = require('../middleware/admin.middleware');
require('../middleware/passport')(passport)

//user//
router.post('/users/login',adminMiddleware,AuthCont.userLogin);

module.exports = router;
