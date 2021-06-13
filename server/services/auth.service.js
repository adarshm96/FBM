const { User } = require('../models');
const validator = require('validator');
const {
  to, //use for await,for promise
  TE, //throw error
  ReS, //response send
  ReSendC
} = require('./util.service');


const getUniqueKeyFromBody = function (body) {// this is so they can send in 3 options unique_key, email, or phone and it will work
  let unique_key = body.unique_key;
  if (typeof unique_key === 'undefined') {
    if (typeof body.email != 'undefined') {
      unique_key = body.email
    }else {
      unique_key = null;
    }
  }
  return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const signupUser = async (res) => {
  let unique_key, auth_info, err, user, userInfo,Euser,Eerr;
  [Eerr, Euser] = await to(User.findOne({ where: { email: 'adarsh@gmail.com' } }));
  userInfo = [{
    email:"adarsh@gmail.com",
    mobile:"7057256386",
    name:"Adarsh Mhatre",
    password:"adarsh@123",
  },
  {
    email:"admin@gmail.com",
    mobile:"8089876785",
    name:"New Admin",
    password:"admin@123",
  },
  {
    email:"test@gmail.com",
    mobile:"4768564567",
    name:"New Test",
    password:"test@123",
  }];
  
 

  if(!Euser){
    for (var key in userInfo) {
      [err, user] = await to(User.create(userInfo[key]));
      if (err) ReS(res, {
        success: false,
        message: err.message,
        error: err
      }, 422);
    }
  }else{
  }
}
module.exports.signupUser = signupUser;

const authUser = async function (userInfo, res) {//returns token
  let unique_key;
  let auth_info = {};
  auth_info.status = 'login';
  unique_key = getUniqueKeyFromBody(userInfo);

  if (!unique_key) TE('Please enter an email to login');

  if (!userInfo.password) TE('Please enter a password to login');

  let user;
  [err, user] = await to(User.findOne({ where: { email: unique_key } }));

  if (!user) TE('User is not registered');
    [err, user] = await to(user.comparePassword(userInfo.password));
    if (err) TE(err.message);
    return user;
}
module.exports.authUser = authUser;