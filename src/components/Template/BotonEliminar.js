import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaTrash} from "react-icons/all";
import React from "react";

const BotonEliminar = ({onClick}) => {
    const [t] = useTranslation(['general']);
    return (
        <TooltipHover texto={t('general:eliminar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaTrash/>
                </span>
        </TooltipHover>
    );
}

export default BotonEliminar;
