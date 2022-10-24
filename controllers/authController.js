const { register, verifyToken, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register', async (req, res) => {
    try {

        if(req.body.username == '' || req.body.password == '') {
            throw new Error ('All fields are required');
        }

        if(req.body.password !== req.body.rePassword) {
            throw new Error ('Passwords don\'t match');
        }
        const token = await register(req.body.email, req.body.username, req.body.password);

        //TODO check if register creates session 
        res.cookie('token', token);
        res.redirect('/');
    } catch(error) {
        const errors = parseError(error);
        
        // TODO error display and replace with actual template
        res.render('register', {
            title: 'Register Page',
            body: {
                username: req.body.username,
                email: req.body.email
            },
            errors
        })

    }
});

authController.get('/login', (req, res) => {
    // TODO error display and replace with actual template
    res.render('login', {
        title: 'Login Page'
    });
});

authController.post('/login', async (req, res) => {

    try {
        if(req.body.username == '' || req.body.password == '') {
            throw new Error ('All fields are required');
        }
        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');

    }catch(error) {

        const errors = parseError(error);
        res.render('login', {
            title: 'Login Page',
            username: req.body.username,
            errors
        }); 
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})


module.exports = authController;