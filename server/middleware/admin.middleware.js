const User = require('../models').User;
const { to, ReE, ReS } = require('../services/util.service');
const authService = require('../services/auth.service');

let user = async function (req, res, next) {
    let err, user;   
    [err, user] = await to(authService.signupUser(res));
    if (err) {
        return ReE(res, err, 422);
    } else {
        return next();
    }
}
module.exports = user;
