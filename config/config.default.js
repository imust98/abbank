'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {
    mysql: {
      client: {
        host: 'localhost',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '1qaz@WSX',
        // database
        database: 'abbank'
      },
      app: true,
      agent: false
    }
  };
  config.keys = appInfo.name + '_1489393729180_4559';
  // add your config here
  config.middleware = ['errorHandler'];
  config.errorHandler = {
    match: '/api'
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    }
  };
  // 模板路径及配置
  config.view = {
    root: path.join(appInfo.baseDir, '/app/views'),
    mapping: {
      '.ejs': 'ejs'
    },
    defaultViewEngine: 'ejs',
    defaultExtension: '.ejs'
  }
  config.static = {
    prefix: "/public/",
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    buffer: true,
    maxFiles: 1000,
    maxAge: 31536000,
  };
  config.multipart = {
    // will append to whilelist
    fileExtensions: [
      '.txt'
    ]
  };
  // // 日志打印
  // config.logger = {
  //   dir: '/home/admin/logs/yzs2'
  // }
  return config;
};
