import Route from "../../types/route";


const profile:Route = ['/profile','GET','required', async (req:any,res:any) => {

    const user = await prismaClient.user.findUnique({
        where: {
            UserID: req.auth.userID,
            IsDeleted:false
        },
        select: {
            UserID:true,
            Bio:true,
            CommentsScore:true,
            PostsScore:true,
            IsAdmin:true
        }
    });

    if (!user) {
        res.status(404).contentType('json').send('{"error":"user_not_created"}');
        return;
    }

    res.status(200).contentType("json").send(JSON.stringify(user))

}]

const routeList:Route[] = [
    profile
]

export default routeList;

