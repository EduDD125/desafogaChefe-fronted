import axios from "axios"

const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
});

apiClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token');
        console.log("config:", config)
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log("config.headers.Authorization:", config.headers.Authorization)
        return config;
    },
    function (error) {
        return Promise.reject(error)
    }
)

apiClient.interceptors.response.use(
    function (response) {
        console.log(response);
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 401) {
            console.log("error.response:", error.response);
            //window.location.href = "/";
        }
        return Promise.reject(error)
    }
)

export default apiClient;
