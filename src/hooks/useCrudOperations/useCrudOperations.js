import { useState } from "react";
import apiClient from "../../axios/apiClient";

export default function useCrudOperations() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Função genérica para realizar operações CRUD
    async function performCrudOperation(entity, method, data = null, id = null) {
        setLoading(true);
        setError(null);

        let endpoint = `/${entity}`;
        if (id) {
            endpoint += `/${id}`;
        }

        try {
            let response;

            // Verifica se é necessário enviar como application/x-www-form-urlencoded
            const isFormEncoded = entity === "auth/login" && method.toLowerCase() === "post";

            if (isFormEncoded) {
                const formData = new URLSearchParams();
                for (const key in data) {
                    formData.append(key, data[key]);
                }

                response = await apiClient.post(endpoint, formData, {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                });
            } else {
                switch (method.toLowerCase()) {
                    case "get":
                        response = await apiClient.get(endpoint);
                        break;
                    case "post":
                        response = await apiClient.post(endpoint, data);
                        break;
                    case "put":
                        response = await apiClient.put(endpoint, data);
                        break;
                    case "delete":
                        response = await apiClient.delete(endpoint);
                        break;
                    default:
                        throw new Error(`Método HTTP ${method} não suportado`);
                }
            }
            return response.data;
        } catch (err) {
            console.error(`Erro na operação ${method} em ${entity}:`, err);
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return { performCrudOperation, loading, error };
}
