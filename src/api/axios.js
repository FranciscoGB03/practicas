import axios from 'axios';
import {getLS} from '../services/localstorage';

export default axios.create(
    {
        baseURL: `${process.env.REACT_APP_URL_API}/`,
        headers: {
            common: {
                Authorization: `Bearer ${getLS('token')}`
            }
        }
    }
);