import axios from "axios";

import { addError } from "../store/errorSlice/errorSlice";

let store:any;

const injectStore = (_store:any) => store = _store;


const instance = axios.create({
    timeout: 1000,
    withCredentials: true,
    // baseURL: "https://soccer2021sf.herokuapp.com"
    baseURL: "http://localhost:8000"
    
})

instance.interceptors.response.use(response => response,
   function (error) {
        const { data, status } = error.response;
        const { message } = data;
        console.log(data, status, message, "ERROR CONSOLE")
        store.dispatch(addError({ message, status, active: true }))
        return Promise.reject(error);
})

export { injectStore };
export default instance;