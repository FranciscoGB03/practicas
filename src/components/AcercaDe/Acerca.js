import i18next from 'i18next';
import React from 'react';
import Template from '../Template/Template';

const Acerca =()=>{
    return(
        <Template>
            <div className="container mt-5 bg-primary text-white">
                <div className="">
                {i18next.t('acerca:prueba')}
                <span></span>
                </div>
            </div>
        </Template>
    );
}
export default Acerca;