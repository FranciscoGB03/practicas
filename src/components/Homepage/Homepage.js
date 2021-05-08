import React from 'react';
import Template from "../Template/Template";
import { isLogged} from "../../services/authService";
import SinSesion from "../Template/SinSesion";

const Homepage = () => {
    return (
        <Template>
            {isLogged() ?
                <div>

                </div>
                : <SinSesion/>
            }
        </Template>
    );
}
export default Homepage;