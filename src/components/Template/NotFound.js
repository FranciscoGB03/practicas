import React from 'react';
import {useTranslation} from "react-i18next";
import {Link} from 'react-router-dom';

const NotFound =()=>{
    const [t]=useTranslation('general');
    return(
        <div>
            <span>{t('sitio')}</span>
            <Link to="/">Home</Link>
        </div>
    );
}
export default NotFound;