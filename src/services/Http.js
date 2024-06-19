import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_API } from "../shared/constants/app";
import { store } from '../redux-setup/store'
import { loggedOut } from "../redux-setup/reducers/auth";
const Http = axios.create({
    baseURL: BASE_API,
});

Http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const Auth = store.getState().Auth
    const token = Auth.login.currentCustomer?.accessToken
    config.headers['token'] = `Bearer ${token}`
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp < new Date() / 1000) {
            store.dispatch(loggedOut())
        }
        // console.log("decoded:", decoded);
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
export default Http;