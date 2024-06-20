import { PrismaClient } from '@prisma/client/extension';
import Route from '../../types/route';
import logger from '../../util/logger.js';
import V from 'validator';


const exampleRoute:Route = ['/posts/:postID/delete', 'GET', 'required', async (req:any,res:any)=>{
    if (!req.params.postID || !V.isUUID(req.params.postID,'4')) {
        res.status(404).contentType("json").send('{"error":"invalid_post_id"}');
        return;
    }

    const post = await prismaClient.post.delete({
        where: {
            PostID: req.params.postID,
            AuthorID: req.auth.userID
        }
    });

    if (!post) {
        res.status(404).contentType('json').send('{"error":"post_not_found"}');
        return;
    }

    res.status(201).send();
}];

//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
