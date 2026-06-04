import axios from "axios";


const api=axios.create({

baseURL:"http://10.175.236.237:5000/api",

timeout:5000

});


export default api;