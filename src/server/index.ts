import axios from "axios";

const instance = axios.create({
    timeout: 1000,
    withCredentials: true,
    baseURL: "http://localhost:8000"
})

export default instance;