import Acerca from "./components/AcercaDe/Acerca";
import Homepage from "./components/Homepage/Homepage";
import NotFound from "./components/Template/NotFound";

const ROUTES=[
    {exact:true, path:'/', component:Homepage},    
    {exact:true, path:'/acercaDe', component:Acerca},
    {component:NotFound}
];
export default ROUTES;
