var server = require('loglog-server');
var config = require('./config');

server.set( 'source', server.sources.mongodb({
  connection: config.mongoConnStr
, collection: config.mongoCollection
}));

server.listen( config.port );