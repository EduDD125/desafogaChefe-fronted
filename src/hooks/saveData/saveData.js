import { refreshTableContext } from "../../contexts/appContext";
import { useContext } from "react";
import useCrudOperations from "../useCrudOperations/useCrudOperations";

export default function useSaveData() {
    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)
    const { performCrudOperation, loading, error } = useCrudOperations();

    async function saveData( itemType, data) {

        try {
            const response = await performCrudOperation(itemType, "post", data, null);
            console.log(response);
            if (response && response.status === 200) setRefreshTable(!refreshTable);
            return response.data;
        } catch (error) {
            console.log(`Erro ao save ${itemType}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log(`Erro ao editar ${itemType}: `, error.response.status, error.response.data);
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log(`Erro ao editar ${itemType}:  Sem resposta do servidor`);
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
              }
        }
              
    }
    
    return saveData;

}
