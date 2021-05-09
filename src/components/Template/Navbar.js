import React from 'react';
import {NavLink} from 'react-router-dom';
import {FaHome} from "react-icons/fa";
import Avatar from "./Avatar";
import $ from 'jquery';
import {ITEMS_IZQUIERDA, ITEMS_DERECHA} from "./Navbar.data";
import {isLogged, getN, getTId, cerrarSesion} from "../../services/authService";
import i18next from "i18next";
import {can} from '../../services/seguridadService';

function Navbar() {

    //|------Hooks------|//
    return (
        <nav className="navbar navbar-background sticky-top navbar-expand-lg navbar-dark py-0 text-small">
            <NavLink to="/" className="nav-link navbar-brand" href="#">
                <span><FaHome/>{` ${process.env.REACT_APP_APP_NAME}`}<Env env={process.env.REACT_APP_ENV}/></span>
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Izquierda/>
                <Derecha/>
            </div>
           
        </nav>
    );
};

const Izquierda = () => {
    return (<ul className="navbar-nav mr-auto">
        {(ITEMS_IZQUIERDA.menus || []).map((menu, key) => <Menu menu={menu} key={key}/>)}
    </ul>);
}
const Derecha = () => {
    return (<ul className="navbar-nav navbar-right">
        {(ITEMS_DERECHA.menus || []).map((menu, key) => <Menu menu={menu} key={key}/>)}
        <SesionNav/>
    </ul>);
}

const Menu = ({menu}) => <React.Fragment>
    {menu.tipo == 'navlink' && (can(menu.permiso) || menu.publico) && <NavLinkMenu menu={menu}/>}
    {menu.tipo == 'simple' && (can(menu.permiso) || menu.publico) && <SimpleMenu menu={menu}/>}
    {menu.tipo == 'dropdown' && (can(menu.permiso) || menu.publico) && <DropdownMenu menu={menu}/>}
</React.Fragment>


const SimpleMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item">
        <a className="nav-link" href="#" onClick={() => menu.onClick()}>
            {Icono && <Icono/>} {i18next.t(menu.keyLang || '')}
        </a>
    </li>)
};
const NavLinkMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item">
        <NavLink className="nav-link" href="#link" to={((menu || {}).nlOptions || {}).to || ''}>
            {Icono && <Icono/>} <span className="py-1">  {i18next.t(menu.keyLang || '')}  </span>
        </NavLink>
    </li>)
};
const DropdownMenu = ({menu}) => {
    const Icono = menu.icono;
    return (<li className="nav-item dropdown ">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {Icono && <Icono/>} <span className="py-1">  {i18next.t(menu.keyLang || '')}  </span>
        </a>
        <div className="dropdown-menu dropdown-menu-right text-small" aria-labelledby="navbarDropdown">
            {(menu.navlinks || []).map((nl, key) =>
                (can(nl.permiso) || nl.publico) &&
                < DropdownNl nl={nl} key={key}/>)}
        </div>
    </li>)
};
const DropdownNl = ({nl}) => {
    const Icono = nl.icono;
    return (
        <>
            <NavLink className="dropdown-item" to={nl.to}>
                {Icono && <Icono/>} <span className="ml-2">{i18next.t(nl.keyLang)}</span>
            </NavLink>
            {nl.separador ? <hr className={"mt-2 pb-0 mb-0"}/> : null}
        </>
    );
}

const SesionNav = () => {
    const handleCerrarSesion = () => {
        cerrarSesion();
        window.location.replace('')
    }
    const handleModalIniciar = () => {
        $('#modalLogin').modal('show');
        $('#modalLogin').on('shown.bs.modal', () => $('#username').focus());
    }
    return (<React.Fragment>
        {!isLogged() ?
            <li className="nav-item"
                onClick={() => handleModalIniciar()}>
                <a className="nav-link" href="#">{i18next.t('navbar:iniciarSesion')}</a>
            </li> :
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Avatar texto={getTId()} width={'1.5rem'}/> {getN()}
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#" onClick={() => handleCerrarSesion()}>
                        {i18next.t('navbar:cerrarSesion')}
                    </a>
                </div>
            </li>}
    </React.Fragment>)
}


const Env = ({env}) => {
    if (env != 'prod') {
        const tipo_badge = env === 'dev' ? 'warning' : 'danger';
        return (<span className={`p-1 ml-1 badge badge-${tipo_badge}`}>{env}</span>);
    }
    return ('');
};

export default Navbar;