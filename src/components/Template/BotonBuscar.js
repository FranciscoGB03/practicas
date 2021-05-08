import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaSearchPlus, FaSearchMinus} from "react-icons/all";
import React from "react";

const BotonBuscar = ({ver_buscadores, setVerBuscadores}) => {
    const [t] = useTranslation(['general']);
    return (ver_buscadores ?
            <TooltipHover texto={t('general:ocultarBuscadores')}>
                <span className='mx-2 link cursor'
                      onClick={() => setVerBuscadores(false)}>
                    <FaSearchMinus/>
                </span>
            </TooltipHover> :
            <TooltipHover texto={t('general:mostrarBuscadores')}>
                <span className='mx-2 link cursor'
                      onClick={() => setVerBuscadores(true)}>
                    <FaSearchPlus/>
                </span>
            </TooltipHover>
    );
}

export default BotonBuscar;
