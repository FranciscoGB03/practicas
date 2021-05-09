import Homepage from "./components/Homepage/Homepage";
import NotFound from "./components/Template/NotFound";

const ROUTES=[
    {exact:true, path:'/', component:Homepage},    
    {component:NotFound}
];
export default ROUTES;
