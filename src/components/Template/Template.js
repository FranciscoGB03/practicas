import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import ModalLogin from './ModalLogin';

function Template(props) {
    return (
        <div>
            <Navbar/>
            {props.children}
            <Footer/>
            <ModalLogin/>
        </div>
    );
}

export default Template;