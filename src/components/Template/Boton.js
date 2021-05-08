import React from 'react';
import { GoAlert } from 'react-icons/go';
import TooltipHover from "./TooltipHover";
import {useTranslation} from "react-i18next";

const Boton = ({ className, ejecuta=()=>{}, key_texto, children, habilitado,posicion='top',classNoHabilitado='w-100'}) => {
    const [t]=useTranslation(['general']);
    return (
        <button className={`btn z-depth-1  ${!habilitado ? `btn-danger ${classNoHabilitado}` : className}`}
                onClick={() => ejecuta()}
                disabled={!habilitado}>
            {!habilitado ?
                <TooltipHover
                            posicion={posicion}
                            texto={t('general:sinPermisoBoton')}>
                    <span className="pl-1"> <GoAlert /> {key_texto}</span>
                </TooltipHover>
                : <div>
                    {children} {key_texto}
                </div>
            }
        </button>
    );
};

export default Boton;
