import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaEdit, FaPlusCircle} from "react-icons/all";
import React from "react";

const EsNuevoEdit = ({es_nuevo}) => {
    const [t] = useTranslation(['catalogos']);
    const texto = es_nuevo ? t('catalogos:nuevoRegistro') : t('catalogos:editandoRegistro');
    return (
        <TooltipHover texto={texto}>
            {es_nuevo ?
                <div className='alert py-0 px-1 bg-subtitulos flex-nowrap'><FaPlusCircle/></div> :
                <div className='alert py-0 px-1 bg-subtitulos flex-nowrap'><FaEdit/></div>
            }
        </TooltipHover>
    );
}

export default EsNuevoEdit;
