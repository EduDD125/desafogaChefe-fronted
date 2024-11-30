import apiClient from "../../axios/apiClient"

export async function getDoctorData(userId) {
    const endpoint = `medicos/${userId}`;
    try {
        const response = await apiClient.get(endpoint);
        console.log("response: ", response);
        const data = { name: response.data.nome, userAvatarUrl: response.data.imagem?.url};
        console.log("user data")
        return data;
    } catch (error) {
        console.log(`Erro ao buscar nome do medico:`, error);
        if (error.response) {
            // A resposta do servidor veio com um código de status de erro
            console.log("Erro ao buscar nome do medico: ", error.response.status, error.response.data);
          } else if (error.request) {
            // A requisição foi feita mas não houve resposta
            console.log("Erro ao buscar nome do medico: Sem resposta do servidor");
          } else {
            // Outro tipo de erro ocorreu
            console.log("Erro desconhecido: ", error.message);
          }
    }
}