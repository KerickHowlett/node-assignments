const requestHandler = ( request, response ) => {

    const root = '/';

    const url = request.url;
    const method = request.method;
    const template = { title: `NodeJS Exercises`, body: `` };

    if ( url === `/create-user` && method === 'POST' ) {

        const stream = [];

        request.on( 'data', ( chunk ) => stream.push( chunk ) )
               .on( 'end', () => {
                   const parsedBody = Buffer.concat( stream ).toString();
                   const user = parsedBody.split( '=' )[ 1 ];
                   console.log( user );
                   response.statusCode = 302;
                   response.setHeader( 'Location', root );
                   response.end();
               } );

    } else {

        if ( url === root ) template.body = `<h1>Assignment One</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>`;
        if ( url === '/users' ) template.body = `<ul><li>User 1</li></ul>`;
        
        const htmlHead = `<head><title>${ template.title }</title></head>`;
        const htmlBody = `<body>${ template.body }</body>`;
        response.write( `<html>${ htmlHead + htmlBody }</html>` );
        template.body = ``;
        response.end();

    }

};

module.exports = requestHandler;