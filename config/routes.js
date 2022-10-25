const authController = require("../controllers/authController");
const defaultController = require("../controllers/defaultController");
const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const tripController = require("../controllers/tripController");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/trip', tripController);
    app.use('/profile', profileController); 
    app.all('*', defaultController);
};