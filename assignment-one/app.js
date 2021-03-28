const http = require( 'http' );

const routes = require( './src/routes/routes' );

http.createServer( routes ).listen( 3000 );