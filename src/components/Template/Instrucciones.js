import React from 'react';
import i18next from "i18next";
import logo from '../../img/logo.png';

const Instrucciones = ({children,clase=''}) => {
    return (
        <div className={`d-flex flex-column rounded p-3 z-depth-2 ${clase}`}>
            <div className='text-center'>
                <img src={logo} style={{maxWidth: '200px'}}/>
            </div>
            <h4 className='text-center unique-color-text mt-3'>{i18next.t('general:instrucciones')}</h4>
            <div className="alert alert-warning">
                {children}
            </div>
        </div>
    );
};

export default Instrucciones;
