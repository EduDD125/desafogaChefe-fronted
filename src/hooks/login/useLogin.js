import { useState } from 'react';
import apiClient from "../../axios/apiClient";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login (userData) {
        let endpoint = `/auth/login`;
        setLoading(true);

        try {
            const response = await apiClient.post(endpoint, userData);
            console.log("response:", response)
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("id", response.data.id);
            setLoading(false)          
            return response; // Retorna dados diretamente para o modal*/
        } catch (err) {
            console.log("err:", err)
            setError(err.response ? err.response : "Erro no servidor. Tente novamente mais tarde.");
            setLoading(false);
            return err;
        }
    };

    return { login, loading, error, setError };
};
