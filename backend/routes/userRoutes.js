const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/userController");

const router = express.Router();

// User signup
router.post(
    '/signup',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[\W_]/).withMessage('Password must contain at least one special character')
    ],
    signup
);

// User login
router.post(
    '/login',
    [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
        body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
            .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
            .matches(/[\W_]/).withMessage('Password must contain at least one special character')
    ],
    login
);


module.exports = router;