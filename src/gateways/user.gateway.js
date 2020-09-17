const express = require('express');
const validate = require('validate.js');
const asyncHandler = require('../helpers/asyn-error-handler');
const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const constraints = {
        first_name: {
            presence: true,
            length: { maximum: 50 }
        },
        last_name: {
            presence: true,
            length: { maximum: 50 }
        },
        username: {
            presence: true,
            length: { minimum: 8, maximum: 20 }
        },
        password: {
            presence: true,
            length: { minimum: 8, maximum: 20 }
        },
        email: {
            presence: true,
            email: true
        }
    };

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const validation = validate({ first_name, last_name, username, email, password }, constraints);

    if (validation) return res.status(400).json({ Success: false, Results: null, ErrorMessage: validation })
}));

module.exports = router;