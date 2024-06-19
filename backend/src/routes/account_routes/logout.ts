import Route from '../../types/route';

const logout:Route = ['/logout','ALL','required',(req:any,res:any)=>{
    authenticator.invalidate(req.cookies.auth);
    res.redirect('/');
}];

const routeList:Route[] = [
    logout,
]

export default routeList;
