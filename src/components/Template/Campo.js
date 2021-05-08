import React from 'react';
import {noop} from "../../services/generalService";

const Campo = ({
                   mostrarEtiqueta = true,
                   modoTexto = false,
                   etiqueta,
                   data,
                   value,
                   onChange = noop(),
                   type = 'text',
                   placeholder = '',
                   step = 0,
                   containerClass = '',
                   labelClass = '',
                   inputClass = '',
                   maxLength = '',
                   minLength = '',
                   onKeyUp = noop(),
                   required = false,
                   autoFocus = false,
                   as = '',
                   size = ""
               }) => {
    return (
        <div className={containerClass !== '' ? containerClass : "col-md-4"}>
            {mostrarEtiqueta ?
                <label htmlFor={data}
                       className={labelClass !== '' ? labelClass : "form-label"}>{etiqueta}</label> : null}
            {modoTexto ? <span>{value}</span> :
                <input type={type}
                       name={data}
                       value={value}
                       onChange={onChange}
                       className={inputClass !== '' ? inputClass : "form-control"}
                       placeholder={placeholder}
                       maxLength={maxLength}
                       minLength={minLength}
                       step={step}
                       onKeyUp={onKeyUp}
                       required={required}
                       as={as}
                       autoFocus={autoFocus}/>}
        </div>
    );
}

export default Campo;