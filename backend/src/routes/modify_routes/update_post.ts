import Route from '../../types/route';
import logger from '../../util/logger.js';
import V from 'validator';

const exampleRoute:Route = ['/posts/:postID/update', 'POST', 'required', async (req:any,res:any)=>{
    
    if (!req.params.postID || !V.isUUID(req.params.postID,'4')) {
        res.status(404).contentType("json").send('{"error":"invalid_post_id"}');
        return;
    }

    const fields = ['Title','Class','Description','Body'];
    const maxLengths = [128, 32, 4096, 16384]

    let data:any = {};

    for (let i = 0; i < fields.length; i++) {
        if (req.body[fields[i]]) {
            if (req.body[fields[i]].length > maxLengths[i]) {
                res.status(422).contentType('json').send('{"error":"'+fields[i]+'_field_too_large"}');
                return;
            }
            data[fields[i]] = req.body[fields[i]];
        }
    }

    let post;
    try {
        post = await prismaClient.post.update({
            data: data,
            where: {
                PostID: req.params.postID,
                AuthorID: req.auth.userID
            }
        });
    } catch (e) {}

    if (!post) {
        res.status(404).contentType('json').send('{"error":"no_post_by_user_with_post_id"}');
        return;
    }

    res.status(201).send();
}];

//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
