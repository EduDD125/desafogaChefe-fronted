import { useState } from "react";
import apiClient from "../../axios/apiClient"
import useCrudOperations from "../useCrudOperations/useCrudOperations";

export default function useFetchData() {

    const { performCrudOperation, loading, error } = useCrudOperations();

    async function fetchData(option, optionId = null) {

      let endpoint = `${option}s/${optionId}`;
      console.log(endpoint)

      console.log(endpoint);

        try {
            const response = await performCrudOperation(endpoint, "get");
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(`Erro ao buscar ${option}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log(`Erro ao buscar ${option} ${optionId}: `, error.response.status);
                console.log(error.response.data)
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log(`Erro ao buscar ${option} ${optionId}: Sem resposta do servidor`);
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
              }
        }
              
    }
    
    return {fetchData, loading};

}
