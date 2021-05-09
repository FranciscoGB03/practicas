import i18next from 'i18next';
import React from 'react';
import Template from '../Template/Template';

const Acerca =()=>{
    return(
        <Template>
            <div>
                {i18next.t('acerca:prueba')}
                <span></span>
            </div>
        </Template>
    );
}
export default Acerca;