import i18next from 'i18next';
//|------Español------|//
import admin_es from './es/admin.json';
import catalogos_es from './es/catalogos.json';
import general_es from './es/general.json';
import navbar_es from './es/navbar.json';
//|------./Español------|//
//|------Ingles------|//
import general_en from './en/general.json';
//|------./Ingles------|//

const getLocale = () => {
    let idioma = navigator.language || navigator.userLanguage;
    let locale = localStorage.getItem("localeStorage") == null ?
        localStorage.setItem("localeStorage", idioma.substring(0, 2)) :
        localStorage.getItem("localeStorage");
    return locale;
}

i18next.init({
    interpolation: { escapeValue: false },
    lng: getLocale(),
    resources: {
        es: {
            admin:admin_es,
            catalogos: catalogos_es,
            general: general_es,
            navbar: navbar_es
            },
        en: {
            general: general_en,
        }
    }

});

export default i18next;
