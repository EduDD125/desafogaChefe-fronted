import { refreshTableContext } from "../../contexts/appContext";
import { useContext } from "react";
import useCrudOperations from "../useCrudOperations/useCrudOperations";

export default function useDeleteData() {
    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)
    const { performCrudOperation, loading, error } = useCrudOperations();

    async function deleteData( itemType, itemId) {

        try {
            const response = await performCrudOperation(itemType, "delete", null, itemId);
            console.log(response);
            if (response && response.status === 200) setRefreshTable(!refreshTable);
            return response.data;
        } catch (error) {
            console.log(`Erro ao delete ${itemType}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log(`Erro ao deletar ${itemType}: `, error.response.status, error.response.data);
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log(`Erro ao deletar ${itemType}:  Sem resposta do servidor`);
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
              }
        }
              
    }
    
    return deleteData;

}
