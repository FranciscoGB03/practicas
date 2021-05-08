import {useTranslation} from "react-i18next";
import TooltipHover from "./TooltipHover";
import {FaCopy} from "react-icons/all";
import React from "react";
import {copiarPortapapeles} from "../../services/generalService";

const BotonCopiarPortapapeles = ({div_tabla = "divTabla"}) => {
    const [t] = useTranslation(['general']);
    const handleClick = () => {
        copiarPortapapeles(div_tabla);
    };
    return (
        <TooltipHover texto={t('general:copiarPortapapeles')}>
                <span className='mx-2 link cursor'
                      onClick={() => handleClick()}>
                    <FaCopy/>
                </span>
        </TooltipHover>
    );
}

export default BotonCopiarPortapapeles;
