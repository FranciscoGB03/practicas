import React from 'react';
import {FaBan} from "react-icons/fa";
import accessDenied from "../../img/access-denied.jpg";
import {useTranslation} from "react-i18next";


function SinSesion() {
    const [t] = useTranslation(['general']);
    return (
        <div className="container d-flex justify-content-center pt-5">
            <div className="d-flex flex-column">
                <h3 className="text-danger">
                    <FaBan/>
                    {t('general:sinPermiso')}
                    <FaBan/>
                </h3>
                <br/>
                <div className="text-center">
                    <img src={accessDenied} className="img-"/>
                </div>
            </div>
        </div>

    );
}

export default SinSesion;
