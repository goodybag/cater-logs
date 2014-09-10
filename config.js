var fs = require('fs');

var local = {};

if ( fs.existsSync('./local-config.json') ){
  local = require('./local-config.json');
}

module.exports = {
  dev: {
    mongoConnStr:     local.mongoConnStr
  , mongoCollection:  'logs'
  , port:             local.port || 3001
  }

, staging: {
    mongoConnStr:     process.env['MONGOHQ_URL']
  , mongoCollection:  'logs'
  , port:             process.env['PORT']
  }

, prod: {
    mongoConnStr:     process.env['MONGOHQ_URL']
  , mongoCollection:  'logs'
  , port:             process.env['PORT']
  }
};