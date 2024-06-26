import './preinitilization.js';
import app from './server.js';
import Logger from './util/logger.js';
import router from './router.js';
import mock_data from './mock_data.js';
import https from 'https';
import http from 'http';
import fs from 'fs';
import express from 'express';
import local_router from './local_routes.js';
import path from 'path';

if (process.env.ENV == 'DEV') mock_data();

// NOTE: prismaClient and authenticator are global variables, be careful not to overwrite them (declared in preinitilization.ts)

const port: number = 443;

app.use('/api',router);

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    res.sendFile(path.resolve('./src/public/index.html'));
});

const local_app = express().use('/',local_router);

if (process.env.ENV === 'DEV')
    http.createServer(app).listen(port,()=>{
        Logger.info("listening on port "+port);
        http.createServer(local_app).listen(80);
    });
else {
    var privateKey = fs.readFileSync('./privatekey.key' );
    var certificate = fs.readFileSync('./certificate.crt' );
    https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(port,()=>{
        http.createServer(local_app).listen(80);
        Logger.info(`listening on port ${port}`);

    });
}
