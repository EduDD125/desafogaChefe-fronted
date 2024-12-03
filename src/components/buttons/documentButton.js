import React from "react";
import { AiFillFile } from "react-icons/ai"; // Ícone de documento da biblioteca react-icons
import apiClient from "../../axios/apiClient.js";

export default function DocumentButton({ entityType, id }) {

    async function handleDownload(event) {
        event.stopPropagation(); // Impede propagação de eventos para elementos superiores

        try {
            const endpoint = `${entityType}/${id}/pdf`;
    
            // Adicione a configuração do tipo de resposta
            const response = await apiClient.get(endpoint, { responseType: "blob" });
    
            // Converta a resposta em um Blob e baixe
            const url = window.URL.createObjectURL(response.data); // Use response.data
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `financial-report-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Erro ao baixar o documento:", error);
        }
    }

    return (
        <AiFillFile className="document-button" onClick={handleDownload} />
    );
}
