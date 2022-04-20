import axios from "axios";

const API_URL = `${process.env.VUE_APP_HOST_DOMAIN}`

const api = axios.create({
    baseURL: API_URL
})


export default api

