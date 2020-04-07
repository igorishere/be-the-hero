import axios from "axios";
 
const api = axios.create({
    //URL da api
    baseURL: 'http://localhost:3333'
})

export default api;