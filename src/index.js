import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
//|------Estilos de bootstrap------|//
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'popper.js'
import "react-datepicker/dist/react-datepicker.css";
import 'react-bootstrap-typeahead/css/Typeahead.css';
//|------./Estilos de bootstrap------|//
//|------Estilos propios------|//
import './styles/animate.css'
import './styles/estilos.css';
import './styles/mdb.css';
import './styles/colores.css';
import './styles/gelita.css';
import './styles/base.css';
import './styles/theme.css';
//|------./Estilos propios------|//
//|------TooltipHover------|//
import 'react-tippy/dist/tippy.css';
//|------TooltipHover------|//
//|------Lenguaje------|//
import { I18nextProvider } from 'react-i18next'
import i18next from './lang/i18n';
//|------./Lenguaje------|//
//|------zustand------|//
import create from 'zustand'
import {cargarPermisos} from "./services/seguridadService";

export const useStore = create(set => ({
    permiso:"",
    permisos:[],
    obtenerPermisos:()=>{
       cargarPermisos().then(res=>set({permisos:res}))
    },
    limpiarPermisos:()=>{
        set({permisos: []})
    }
}));
//|------./zustand------|//
ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <App />
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
