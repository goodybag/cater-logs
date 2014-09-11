var cluster = require('cluster');
var config  = require('./config');

if ( cluster.isMaster ){
  for ( var i = 0; i < config.numWorkers; i++ ){
    cluster.fork();
  }

  cluster.on( 'exit', function( worker, code, signal ){
    console.log( 'worker %d died. Forking a new one', worker.process.pid );
    cluster.fork();
  });
} else {
  var server = require('loglog-server');

  server.set( 'source', server.sources.mongodb({
    connection: config.mongoConnStr
  , collection: config.mongoCollection
  }));

  server.use( function( error, req, res, next ){
    console.log('Server error. Shutting down worker');
    res.send(500);
    cluster.worker.disconnect();
  });

  server.listen( config.port, function(){
    console.log( 'Server listening on port %d', config.port );
  });
}
