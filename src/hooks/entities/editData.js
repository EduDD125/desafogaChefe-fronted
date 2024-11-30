import { refreshTableContext } from "../../contexts/appContext";
import { useState, useContext } from "react";
import apiClient from "../../axios/apiClient";

export default function useEditData() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)


  const editData = async  (option, tipo, itemId, newItem) => {

        let endpoint = "";

        console.log("option: ", option, "tipo: ", tipo, "itemId: ", itemId, "newItem: ", newItem)
        if (tipo === "admin") endpoint = `${option}/${itemId}`;
        else if (option === "dadosPessoais") endpoint = `${tipo}s/${itemId}`;
        else if (option === "exames" || option === "consultas") endpoint = `${option}/${itemId}`;
        else console.log("caso indefinido!!");

        console.log(endpoint)

        setLoading(true);
        try {
            const response = await apiClient.put(endpoint, newItem)
            console.log(response);        
            if (response && response.status === 200) setRefreshTable(!refreshTable);
            return response;

        } catch (error) {
            console.log(`Erro ao buscar ${option}:`, error);
            setError(error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log("Erro ao buscar exames: ", error.response.status, error.response.data);
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log("Erro ao buscar exames: Sem resposta do servidor");
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
            }
        } finally {
          setLoading(false);
        }
    }
    
    return {editData, loading, error, setError };
}