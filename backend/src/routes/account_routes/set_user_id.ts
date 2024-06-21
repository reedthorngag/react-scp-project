import Route from "../../types/route";


const profile:Route = ['/setUserId','POST','required', async (req:any,res:any) => {

    if (!req.body.UserID || !req.body.UserID.length || req.body.UserID.length > 32) {
        res.status(422).contentType("json").send('{"error":"invalid_user_id"}');
    }

    let user = await prismaClient.user.findUnique({
        where: {
            UserID: req.body.UserID
        },
        select: {
            UserID: true
        }
    });

    if (user) {
        req.status(403).contentType('json').send('{"error":"user_id_taken"}');
        return;
    }

    user = await prismaClient.user.update({
        data: {
            UserID: req.body.UserID
        },
        where: {
            UserID:req.auth.userID,
            IsDeleted:false
        }
    });

    if (!user) {
        await prismaClient.user.create({
            data: {
                UserID: req.body.UserID,
                Bio: ''
            }
        });
    }

    await prismaClient.post.updateMany({
        data: {
            AuthorID: req.body.UserID
        },
        where: {
            AuthorID: req.auth.userID
        }
    });

    await prismaClient.comment.updateMany({
        data: {
            AuthorID: req.body.UserID
        },
        where: {
            AuthorID: req.auth.userID
        }
    });

    await prismaClient.loginInfo.update({
        data: {
            UserID: req.body.UserID
        },
        where: {
            UserID: req.auth.userID
        }
    });

    authenticator.invalidate(req.cookies.auth);


    res.status(200).contentType('json').send(JSON.stringify({new_auth:authenticator.createToken(req.body.UserID,req.auth.isAdmin)}));

}];

const routeList:Route[] = [
    profile
]

export default routeList;

