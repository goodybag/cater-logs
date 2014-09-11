var fs = require('fs');

var local = {};

if ( fs.existsSync('./local-config.json') ){
  local = require('./local-config.json');
}

var config = {
  dev: {
    mongoConnStr:     local.mongoConnStr
  , mongoCollection:  'logs'
  , port:             local.port || 3001
  , numWorkers:       2
  }

, staging: {
    mongoConnStr:     process.env['MONGOHQ_URL']
  , mongoCollection:  'logs'
  , port:             process.env['PORT']
  , numWorkers:       2
  }

, prod: {
    mongoConnStr:     process.env['MONGOHQ_URL']
  , mongoCollection:  'logs'
  , port:             process.env['PORT']
  , numWorkers:       2
  }
};

module.exports = config[ process.env['NODE_ENV'] || 'dev' ];