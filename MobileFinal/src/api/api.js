import axios from "axios";


const api = axios.create({

baseURL:"http://10.124.129.237:5000/api"

});


export default api;