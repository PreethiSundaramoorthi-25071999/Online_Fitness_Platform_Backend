
//new
const express = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/users-controllers')
const { signup } = require("../controllers/users-controllers")
const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);

router.post(
  '/signup',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check('password').isLength({ min: 2 })
  ],
  signup
);

router.post('/login', login);

module.exports = router;
