import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from "helmet";
import cookieParser from 'cookie-parser';
import { glob } from 'glob';
import Logger from './util/logger.js';
import fs from 'fs';

const app = express();

app.use(cors());
//app.use(helmet()); temporarily disabled cos it needs configuring, this should be enabled in prod
app.use(cookieParser());
app.use(express.static(path.resolve('./src/public'),{ extensions: ['html'], redirect: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('etag', false);

// add admin protected log directory
app.get('/logs/*.log',global.authenticator.resolve('admin', (req:any,res:any) => {
    res.setHeader('Cache-Control','no-store, no-cache');
    res.setHeader('Pragma','no-cache');

    const file = `/app/logs/${req.params[0]}.log`; // potential for directory traversal (low risk) or other malicous input
    if (fs.existsSync(file))
        res.sendFile(file);
    else
        res.status(404).send('Log doesn\'t exist!');
    
}));


export default app;
