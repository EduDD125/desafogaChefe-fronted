import apiClient from "../../axios/apiClient";

export default function useSaveData() {

    async function saveData(option, newItem) {

        const endpoint = `${option}`;

        console.log(endpoint)
        console.log("newItem: ", newItem);
        try {
            const response = await apiClient.post(endpoint, newItem)
            console.log(response);
        } catch (error) {
            console.log(`Erro ao buscar ${option}:`, error);
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
    
    return saveData;
}