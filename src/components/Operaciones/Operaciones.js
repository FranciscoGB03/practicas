import React, {useEffect, useState} from 'react';
import Template from "../Template/Template";
import {isLogged} from "../../services/authService";
import Titulo from "../Template/Titulo";
import i18next from "i18next";
import {AiOutlineFileSearch} from "react-icons/ai";
import SinSesion from "../Template/SinSesion";
import DatePicker from 'react-datepicker';
import {getActivosGenerico} from "../../api/catalogosApi";
import {noop} from "../../services/generalService";
import {cerrarAlert} from "../../services/swalService";
import Boton from "../Template/Boton";
import {FaPlusCircle} from "react-icons/fa";
import EditarMuestra from "./EditarMuestra";
import moment from "moment";
import Listado from "./Listado";

const Operaciones = () => {
    //|------Hooks------|//
    const [tipos_pm, setTiposPm] = useState([]);
    const [tipos_muestra, setTiposMuestra] = useState([]);
    const [analisis,setAnalisis]=useState([]);
    const [pms, setPms] = useState([]);
    const [fecha,setFecha]=useState(moment().toDate());
    const [seleccionado,setSeleccionado]=useState({});
    //|------useEffect------|//
    useEffect(() => {
        cargarCatalogos();
    }, []);
    //|-----------------|//
    const cargarCatalogos=()=>{
        getActivosGenerico('tipo_pm').then(res => {
                cerrarAlert();
                setTiposPm(res);
            }
        ).catch(noop());
        getActivosGenerico('tipo_muestra').then(res => {
                cerrarAlert();
                setTiposMuestra(res);
            }
        ).catch(noop());
        getActivosGenerico('analisis',['area_ca']).then(res => {
                cerrarAlert();
                let arr=[];
                (res||[]).map((r,idx)=>{
                    r.seleccionado=false;
                    arr.push(r);
                });
                setAnalisis(arr);
            }
        ).catch(noop());
    }
    //|------operaciones------|//
    const agregarPm=()=>{
        setSeleccionado({id:'',fecha:moment(fecha).format('YYYY-MM-DD'),tipo_pm:{},tipo_muestra:{},nombre:'',pms_visible:[]});
    }

    return (
        <Template>
            {isLogged() ?
                <div className="container-fluid">
                    <div className="">
                        <Titulo titulo={i18next.t('operaciones:operaciones')} icono={AiOutlineFileSearch}/>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className=" d-flex justify-content-center flex-wrap">
                            <span className="mr-2"><strong>{i18next.t('operaciones:fecha')}: </strong></span>
                            <DatePicker className="form-control form-control-sm text-center"
                                        selected={moment(fecha).toDate()||''}
                                        dateFormat='dd/MM/yyyy'
                                        onChange={e=>setFecha(moment(e).format('YYYY-MM-DD'))}/>
                        </div>
                        <div>
                            <Boton className="btn btn-outline-primary" key_texto={i18next.t('general:agregar')}
                                   habilitado={true}
                                   ejecuta={()=>agregarPm()}>
                                <FaPlusCircle/>
                            </Boton>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around mt-5">
                        <div>
                            <Listado/>
                        </div>
                        <div>
                            {seleccionado.id!==undefined&&
                            <EditarMuestra tipos_pm={tipos_pm}
                                           tipos_muestra={tipos_muestra}
                                           seleccionado={seleccionado}
                                           setSeleccionado={setSeleccionado}
                                           analisis={analisis}/>}
                        </div>
                    </div>
                </div> : <SinSesion/>
            }
        </Template>
    );
}

export default Operaciones;