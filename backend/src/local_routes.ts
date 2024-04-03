import express, { Request, Response, Router } from 'express';
import fs from 'fs';

const router:Router = express.Router(); 


// save it in a variable so it is static for the lifetime of the program (otherwise its kinda pointless)
const version:string = fs.readFileSync('./version/version.txt')!.toString('utf-8');
router.get('/version',(req:Request,res:Response) => res.contentType('text').send(version));

router.get('/ping',(req:Request,res:Response) => res.contentType('text').send('Pong!'));


export default router;
