import { useState } from 'react';
import apiClient from "../../axios/apiClient"

export const useCreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData, tipo) => {

    console.log("tipo: ", tipo);
    let endpoint;

    if (tipo === "paciente") endpoint = "/pacientes";
    else if (tipo === "medico") endpoint =  "/medicos";
    else console.log("Tipo de usuário desconhecido");

    console.log(endpoint)

    setLoading(true);
    try {
      console.log("endpoint: ", endpoint, " \n", "userdata: ", userData);
      const response = await apiClient.post(endpoint, userData);
      console.log("response: ", response)
      setLoading(false);
      return response;
    } catch (err) {
      console.log(err)
      setError(err.response ? err.response.data : 'Erro ao criar usuário');
      setLoading(false);
    }
  };

  return { createUser, loading, error, setError };
};

export const useCreateAddress = () => {
  const [addLoading, setLoading] = useState(false);
  const [addError, addSetError] = useState(null);
  const [addData, setData] = useState(null);

  const createAddress = async (addressData, userId, tipoUsuario) => {
    let endpoint = `endereco/${tipoUsuario}/${userId}`;
    console.log(endpoint);

    setLoading(true);
    try {
      console.log("endpoint: ", endpoint, " \n", "addressdata: ", addressData);
      const response = await apiClient.post(endpoint, addressData);
      setData(response.data);
      console.log("data: ", response.data)
      setLoading(false);
      return response;
    } catch (err) {
      console.log(err)
      addSetError(err.response ? err.response.data : 'Erro ao criar paciente');
      setLoading(false);
    }
  };

  return { createAddress, addData, addLoading, addError, addSetError};
};