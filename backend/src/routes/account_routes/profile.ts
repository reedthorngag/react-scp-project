import Route from "../../types/route";


const profile:Route = ['/profile','GET','optional', async (req:any,res:any) => {

    console.log(req.auth);
    console.log(req.cookies)

    const user = await prismaClient.user.findUnique({
        where: {
            UserID:req.auth.UserID,
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
        res.redirect("/createUserId");
        return;
    }

    res.status(200).contentType("json").send(JSON.stringify(user))

}]

const routeList:Route[] = [
    profile
]

export default routeList;

