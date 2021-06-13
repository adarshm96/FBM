'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {
  TE,
  to
} = require('../services/util.service');
const CONFIG = require('../config/config');

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      require:true,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email is invalid."
        }
      }
    },
    mobile: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [7, 10],
          msg: "Phone number invalid, too short."
        },
        isNumeric: {
          msg: "Phone number invalid."
        }
      }
    },
    name: {
      type:DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  Model.associate = function (models) {
    // this.Addresses = this.belongsToMany(models.Address, {
    //   through: 'UserAddress'
    // });
  };

  Model.beforeSave(async (user, options) => {
    let err;
    console.log(user,"###################");
    if (user.changed('password')) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function (pw) {
    let err, pass
    if (!this.password) TE('password not set');

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE('Invalid password');

    return this;
  }

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return "Bearer " + jwt.sign({
      userId: this.userId
    }, CONFIG.jwt_encryption, {
      expiresIn: expiration_time
    });
  };

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
