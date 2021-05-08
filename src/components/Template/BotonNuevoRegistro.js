import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaPlusCircle} from "react-icons/all";
import React from "react";
import {noop} from "../../services/generalService";

const BotonNuevoRegistro = ({onNuevoRegistro = noop()}) => {
    const [t] = useTranslation(['general']);
    return (
        <TooltipHover texto={t('general:nuevoRegistro')}>
            <span className='mx-2 link cursor' onClick={()=>onNuevoRegistro()}>
                <FaPlusCircle/>
            </span>
        </TooltipHover>
    );
}

export default BotonNuevoRegistro;