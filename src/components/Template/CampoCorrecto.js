import React from 'react';
import {IoIosCheckmarkCircle, IoIosCloseCircle} from 'react-icons/io'

const CampoCorrecto = ({correcto}) => {
    return (
        <div className="mx-1">
            <div className={` ${correcto
                ? 'text-primary' : 'text-danger'}`}>
                {correcto ?
                    <IoIosCheckmarkCircle/> :
                    <IoIosCloseCircle/>}
            </div>
        </div>
    )
};

export default CampoCorrecto;