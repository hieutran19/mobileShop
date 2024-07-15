import axios from "axios";
// import {jwtDecode} from "jwt-decode";
import { BASE_API } from "../shared/constants/app";
import {store} from "../redux-setup/store";
// import { loggedOut } from "../redux-setup/reducers/auth";
import { refreshToken } from "./Api";
import { updateCustomerToken } from "../redux-setup/reducers/auth";
const Http = axios.create({
    withCredentials:true,
    baseURL: BASE_API,
});
Http.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const token = store.getState().Auth.login.currentCustomer?.customer?.accsessToken
    // if(token) {
    //     const decoded = jwtDecode(token)
    //     if(decoded.exp * 1000 < Date.now()){
    //         store.dispatch(loggedOut())
    //         if(config.url.indexOf("/customer/refreshtoken")>=0) return config;
    //         const data=(await refreshToken()).data;
    //         const newAccessToken=data.accsessToken;
    //         const newRefreshToken=data.refreshToken;
    //         console.log(`newAccessToken::${newAccessToken}`);
    //         store.dispatch(updateCustomerToken({newAccessToken,newRefreshToken}));
    //           config.headers["token"] = `Bearer ${ newAccessToken}`
    //     }
    // }
   config.headers["token"] = `Bearer ${token}`
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
Http.interceptors.response.use(
    async(response)=>{
        if(response.data.message==="Token Expired"){
            if(response.config.url.indexOf("/customer/refreshtoken")>=0) return response;
            const data=(await refreshToken()).data;
            const newAccessToken=data.accsessToken;
            const newRefreshToken=data.refreshToken;
            console.log(`newAccessToken::${newAccessToken}`);
            store.dispatch(updateCustomerToken({newAccessToken,newRefreshToken}));
            response.config.headers["token"] = `Bearer ${newAccessToken}`;
            return Http(response.config);
        }
        return response;

    },
    async (error)=>{
        return Promise.reject(error);
    }
);
export default Http;