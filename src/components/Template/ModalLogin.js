import React from "react";
import {useState} from "react";
import {FaLock, FaUser} from 'react-icons/fa';
import {attemp, creaSesion, loginTrabajador} from "../../services/authService";
import {useTranslation} from "react-i18next";


export const ModalLogin = ({ver_modal, setVerModalCh, setPermisosOk}) => {
    //|------State------|//
    const [t] = useTranslation(['navbar'])
    const [username, setUsername] = useState('');
    const [username_input, setUsernameInput] = useState(null);
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [single_or_multi, setSingleOrMulti] = useState('');
    const [trabajadores, setTrabajadores] = useState([]);
    const [requiere_segundo_paso, setRequiereSegundoPaso] = useState(false);
    const [trabajador_login, setTrabajadorLogin] = useState({});

    //|-------Actions-------|//
    const attempLogin = () => {
        if (username && password) {
            attemp(username, password).then(data => {
                setSingleOrMulti(data.singleOrMulti);
                if (data.singleOrMulti === 'single') {
                    creaSesion(data.token);
                    // setPermisosOk(true);
                    //setPermisosOk(false);
                    //setVerModalCh(false);
                } else {
                    setTrabajadores(data.trabajadores);
                    setRequiereSegundoPaso(data.requiere_segundo_paso);
                }
            });
        }
    };
    const loginTrabajadorSeleccionado = () => {
        loginTrabajador(username, trabajador_login.id, password2).then(data => {
            creaSesion(data.token);
            // setPermisosOk(true);
            //setPermisosOk(false);
            //setVerModalCh(false);
        });
    };
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            attempLogin();
        }
    };
    const onEnteredHandle = () => {
        username_input.focus();
    };
    const setRef = (r) => setUsernameInput(r);

    //|------Render-------|//
    return (
        <div className="modal fade"
             id="modalLogin"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title text-center">
                            <FaLock/>
                            {t('iniciarSesion')}
                        </h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex flex-column py-1">
                            {single_or_multi != 'multi' &&
                            <Credenciales
                                t={t}
                                setUsername={setUsername}
                                setPassword={setPassword}
                                handleKeyUp={handleKeyUp}
                                setRef={setRef}
                            />}
                            {single_or_multi && single_or_multi == 'multi' &&
                            <SegundoPaso
                                t={t}
                                trabajadores={trabajadores}
                                setPassword2={setPassword2}
                                setTrabajadorLogin={setTrabajadorLogin}
                                requiere_segundo_paso={requiere_segundo_paso}/>}
                        </div>
                    </div>
                    <Footer
                        t={t}
                        attempLogin={attempLogin}
                        single_or_multi={single_or_multi}
                        loginTrabajadorSeleccionado={loginTrabajadorSeleccionado}/>
                </div>
            </div>
        </div>
    );
};

//|------SubCompoenntes------|//
const Credenciales = ({t, setUsername, setPassword, handleKeyUp, setRef}) => {
    return (
        <div>
            <div className="text-center">{t('insIniciarSesion')}</div>
            <div className="d-flex flex-column">
                <input className="form-control form-control-sm text-center mt-2"
                       id="username"
                       onKeyUp={handleKeyUp}
                       autoFocus={true}
                       ref={setRef}
                       onChange={(e) => setUsername(e.target.value)}
                       placeholder={t('username')}
                />
                <input type="password"
                       className="form-control form-control-sm text-center mt-2"
                       onKeyUp={handleKeyUp}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder={t('password')}
                />
            </div>
        </div>
    );
};


const SegundoPaso = ({t, trabajadores, requiere_segundo_paso, setTrabajadorLogin, setPassword2}) => {
    return (
        <div className="d-flex flex-column px-3">
            <div className="text-center text-success">{t('insIniciarSesionTrab')}</div>
            <select className="form-control form-control-sm text-center"
                    onChange={(e) => {
                        setTrabajadorLogin(trabajadores[e.target.value].trabajador)
                    }}
                    autoFocus={true}>
                <option value=""></option>
                {(trabajadores || []).map((rel, idx) =>
                    <option key={rel.id} value={idx}>{rel.trabajador.fullName}</option>
                )}
            </select>
            {requiere_segundo_paso &&
            <input type="password"
                   onChange={(e) => setPassword2(e.target.value)}
                   className="form-control form-control-sm text-center mt-2"
                   placeholder="{{ _t('navbar:password') }}"
            />}
        </div>
    );
};

const Footer = ({t, single_or_multi, attempLogin, loginTrabajadorSeleccionado}) => {
    return (
        <div className="modal-footer">
            {single_or_multi && single_or_multi == 'multi' ?
                <button type="button" className="btn btn-primary"
                        onClick={loginTrabajadorSeleccionado}>
                    <FaUser/> {t('iniciarSesion')}
                </button>
                :
                <button type="button" className="btn btn-primary"
                        onClick={attempLogin}>
                    <FaLock/> {t('iniciarSesion')}
                </button>
            }
        </div>
    );
};
