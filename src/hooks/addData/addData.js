import { refreshTableContext } from "../../contexts/appContext";
import { useContext } from "react";
import useCrudOperations from "../useCrudOperations/useCrudOperations";

export default function useAddData() {
    const {refreshTable, setRefreshTable} = useContext(refreshTableContext)
    const { performCrudOperation, loading, error } = useCrudOperations();

    async function addData( itemType) {

        const endpoint = `${itemType}/`;
        
        console.log("endpoint: ", endpoint);

        try {
            const response = await performCrudOperation(endpoint, "post");
            console.log(response);
            if (response && response.status === 200) setRefreshTable(!refreshTable);
            return response.data;
        } catch (error) {
            console.log(`Erro ao add ${itemType}:`, error);
            if (error.response) {
                // A resposta do servidor veio com um código de status de erro
                console.log(`Erro ao adicionar ${itemType}: `, error.response.status, error.response.data);
              } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                console.log(`Erro ao adicionar ${itemType}:  Sem resposta do servidor`);
              } else {
                // Outro tipo de erro ocorreu
                console.log("Erro desconhecido: ", error.message);
              }
        }
              
    }
    
    return addData;

}
