import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaEdit} from "react-icons/all";
import React from "react";

const BotonEditar = ({onClick}) => {
    const [t] = useTranslation(['general']);
    return (
        <TooltipHover texto={t('general:editar')}>
                <span className='cursor hvr-grow mx-2'
                      onClick={onClick}>
                    <FaEdit/>
                </span>
        </TooltipHover>
    );
}

export default BotonEditar;
