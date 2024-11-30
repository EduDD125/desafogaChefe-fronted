import axios from 'axios'

const pexelClient = axios.create({
    baseURL: 'https://api.pexels.com/v1/collections/3l0htmr?per_page=20&sort=desc',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

pexelClient.interceptors.request.use(
    function (config) {
        if(process.env.REACT_APP_YOUR_API_KEY_PEXELS) {
            config.headers.Authorization = process.env.REACT_APP_YOUR_API_KEY_PEXELS;      
            return config;
        }
        throw new Error('Pexels API key not setted! Please, set the key in the env file.')        
    },
    function (error) {
        return Promise.reject(error);
    }
);

pexelClient.interceptors.response.use(
    function (response) {
        console.log(response);
        return response;
    }, function (error) {
        console.log(error);
        return Promise.reject(error);
    }
);

export default pexelClient;