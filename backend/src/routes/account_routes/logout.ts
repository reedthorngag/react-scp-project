import Route from '../../types/route';

const logout:Route = ['/logout','ALL','none',(req:any,res:any)=>{
    if (req.cookies.auth)
        authenticator.invalidate(req.cookies.auth);
    res.send(`
        <script>
            document.cookie = "auth=;max-age=-99999999;path=/; Samesite=Strict; Secure;"
            window.location.href = '/';
        </script>
        `);
}];

const routeList:Route[] = [
    logout,
]

export default routeList;
