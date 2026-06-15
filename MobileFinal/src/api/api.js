import axios from 'axios';


const api = axios.create({

baseURL:
"https://monument-footprint-corporate.ngrok-free.dev/api"

});


export default api;