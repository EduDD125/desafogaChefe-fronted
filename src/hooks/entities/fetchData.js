import { useState } from "react";
import apiClient from "../../axios/apiClient"

export default function useFetchData() {
    const [loading, setIfLoading] = useState()

    async function fetchData(option, tipo, userId) {

      let endpoint = "";


      if (tipo === "admin") endpoint = `/${option}`;
      else if (option === "dadosPessoais") endpoint = `${tipo}s/${userId}`;
      else if (option === "exames" || option === "consultas") endpoint = `${option}/${tipo}s/${userId}`;
      else endpoint = `${tipo}s/${userId}/${option}`;

      console.log(endpoint);
      console.log(option, tipo, userId)

        try {
            setIfLoading(true);
            const response = await apiClient.get(endpoint);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(`Erro ao buscar ${option}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log("Erro ao buscar exames: ", error.response.status);
                console.log(error.response.data)
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log("Erro ao buscar exames: Sem resposta do servidor");
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
              }
        } finally {
          setIfLoading(false)
        }
              
    }
    
    return {fetchData, loading};

}
