import Route from '../../types/route';

const logout:Route = ['/logout','ALL','none',(req:any,res:any)=>{
    if (req.cookies.auth)
        authenticator.invalidate(req.cookies.auth);
    res.redirect('/');
}];

const routeList:Route[] = [
    logout,
]

export default routeList;
