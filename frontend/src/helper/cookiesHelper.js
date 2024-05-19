import moment from 'moment-timezone';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
    cookies.set(name, value, { path: '/', expires: new Date(moment().add(15, 'days').format()) });
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name) => {
    cookies.remove(name);
}