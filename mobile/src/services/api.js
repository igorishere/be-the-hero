import axios from 'axios'


export default api = axios.create(
    {
        baseURL: 'http://192.168.0.103:3333'
    })