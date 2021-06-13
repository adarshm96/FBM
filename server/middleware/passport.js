const { ExtractJwt, Strategy } = require('passport-jwt');
const { User, Vendor }      = require('../models');
const CONFIG        = require('../config/config');
const {to}          = require('../services/util.service');

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, user, vendor;
        console.log(jwt_payload);
        [err, user] = await to(User.findByPk(jwt_payload.userId));

        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            [err, vendor] = await to(Vendor.findByPk(jwt_payload.vendorId));
            if (err) return done(err, false);
            if (vendor) {
                return done(null, vendor);
            }else {
                return done(null, false);
            }
        }
    }));
}
