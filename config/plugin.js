'use strict';

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs'
}
exports.static = true;

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportLocal = {
  enable: true,
  package: 'egg-passport-local',
  usernameField: 'username',
  passwordField: 'password',
};
