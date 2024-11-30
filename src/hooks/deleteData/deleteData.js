import { refreshTableContext } from "../../contexts/appContext";
import apiClient from "../../axios/apiClient"
import { useContext } from "react";

export default function useDeleteData() {
    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)

    async function deleteData( itemType, itemId) {

        const endpoint = `${itemType}/${itemId}`;
        
        console.log("endpoint: ", endpoint);

        try {
            const response = await apiClient.delete(endpoint);
            console.log(response);
            if (response && response.status === 200) setRefreshTable(!refreshTable);
            return response.data;
        } catch (error) {
            console.log(`Erro ao delete ${itemType}:`, error);
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
        }
              
    }
    
    return deleteData;

}
