import {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ROUTES from "./routes";
import {useStore} from './index';

function App() {
   const {permisos,obtenerPermisos}=useStore();
    useEffect(()=>{
        obtenerPermisos();
    },[])
    return (
        <div className="App">
            <Router  basename={process.env.REACT_APP_BASE_NAME}>
                <Switch>
                    {ROUTES.map((route, idx) =>
                        <Route key={idx}
                               exact={route.exact}
                               path={route.path}
                               component={route.component}/>
                    )}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
