const authService = require('../services/auth.service');
const {
    to,
    ReE,
    ReS,
    ReSendC
} = require('../services/util.service');


const userLogin = async function (req, res) {
    const body = req.body;
    let err, user;
    body.status = 1;
    [err, user] = await to(authService.authUser(body, res));
    if (err) {
        return ReE(res, err, 422);
    }else {
        const u = user.toWeb();
        return ReS(res, {
            success: true,
            message: 'Login successful redirecting..',
            user: u,
            token: user.getJWT()
        }, 201);
    }
}
module.exports.userLogin = userLogin;
