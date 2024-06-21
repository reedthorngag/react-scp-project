import Route from '../../types/route';
import logger from '../../util/logger.js';


const exampleRoute:Route = ['/api/posts/create', 'GET', 'required', async (req:any,res:any)=>{
    

    
}];

//put all the routes in an array, and export that array.
const exampleRoutes:Array<Route> = [
    exampleRoute
]

export default exampleRoutes;
