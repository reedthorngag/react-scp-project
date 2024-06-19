import Route from "../../types/route";


const profile:Route = ['/setUserId','POST','required', async (req:any,res:any) => {

    if (!req.body.UserID || !req.body.UserID.length || req.body.UserID.length > 32) {
        res.status(422).contentType("json").send('{"error":"invalid_user_id"}');
    }

    const user = await prismaClient.user.findUnique({
        where: {
            UserID:req.auth.UserID,
            IsDeleted:false
        },
        select: {
            UserID:true
        }
    });

    if (user) {
        res.redirect("/");
        return;
    }

    await prismaClient.user.create({
        data: {
            UserID: req.body.UserID,
            Bio: ''
        }
    });

    res.status(201);

}]

const routeList:Route[] = [
    profile
]

export default routeList;

