//TODO replace

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

module.exports = homeController;