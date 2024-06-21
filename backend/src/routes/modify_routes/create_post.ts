import Route from '../../types/route';
import logger from '../../util/logger.js';


const exampleRoute:Route = ['/posts/create', 'POST', 'required', async (req:any,res:any)=>{
    
    const requiredFields = ['Title','Class','Description','Body'];
    const maxLengths = [128, 32, 4096, 16384]

    for (let i = 0; i < requiredFields.length; i++) {
        if (!req.body[requiredFields[i]]) {
            res.status(422).contentType('json').send('{"error":"missing_required_field_'+requiredFields[i]+'"}');
            return;
        }
        if (req.body[requiredFields[i]].length > maxLengths[i]) {
            res.status(422).contentType('json').send('{"error":"'+requiredFields[i]+'_field_too_large"}');
            return;
        }
    }


    const communityID = (await prismaClient.community.findFirst({select: {CommunityID: true}}))?.CommunityID;

    await prismaClient.post.create({
        data: {
            Title: req.body.Title,
            Class: req.body.Class,
            Description: req.body.Description,
            Body: req.body.Body,
            AuthorID: req.auth.userID,
            CommunityID: communityID!
        }
    });

    res.status(201).send();
}];

//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
