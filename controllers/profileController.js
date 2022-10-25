const { getUserById } = require("../services/userService");

module.exports = async (req, res) => {
    const user = await getUserById(req.user?._id);
    console.log(user);

    res.render('profile', {
        title: 'Profile Page',
        user
    });
};