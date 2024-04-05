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

app.get('/hi/*.log',(req:any,res:any) => {res.send('hi')});//express.static('/app/logs'));


export default app;
