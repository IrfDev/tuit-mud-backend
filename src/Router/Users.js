const express = require('express');
const user = require('../usecases/Users')

const router = express.Router()

router.get('/', async(req, res) => {
    try {
        const allUsers = await user.getAll()
        res.json({
            success: true,
            message: 'All users with text analytics',
            data: {
                users: allUsers,
            },
        });
    } catch (error) {
        res.json({
            success: false,
            message: 'Failed to fetch all users',
            error: error.message,
        });
    };
});


router.post('/', async(req, res) => {
    try {
        const newUserData = req.body
        const newUser = await user.create(newUserData)
        res.json({
            success: true,
            message: 'New user created',
            data: {
                user: {
                    newUser,
                },
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'Something went wrong while create a user',
            error: error.message
        })
    }
})

module.exports = router;