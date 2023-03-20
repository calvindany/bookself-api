const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors : {
                origin: ['*'],
            }
        }
    })

    server.route();

    await server.start();

    console.log(`Server telah berjalan di ${server.info.uri}`);
}