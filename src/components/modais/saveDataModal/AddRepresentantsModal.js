import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddRepresentantsModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState({
        userRecord: {
            id: null,
            login: "",
            password: "",
            isAdmin: false, // Valor fixo
        },
        representantRecord: {
            name: "",
            company: "", // ID da empresa
        },
    });

    const [companies, setCompanies] = useState([]);
    const [users, setUsers] = useState([]);
    const { performCrudOperation } = useCrudOperations();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const companiesRequest = await performCrudOperation("companies", "get");
            setCompanies(companiesRequest);

            const usersRequest = await performCrudOperation("users", "get");
            setUsers(usersRequest);
        }
        fetchRelatedData();
    }, []);

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            await saveData("representants", formData);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Erro ao adicionar representante:", err);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (name === "userId") {
            // Busca o usuário selecionado pela ID
            const selectedUser = users.find((user) => user.id.toString() === value);
            if (selectedUser) {
                setFormData((prev) => ({
                    ...prev,
                    userRecord: {
                        id: selectedUser.id,
                        login: selectedUser.login,
                        password: selectedUser.password,
                        isAdmin: selectedUser.isAdmin,
                    },
                }));
            }
        } else if (name === "company") {
            setFormData((prev) => ({
                ...prev,
                representantRecord: {
                    ...prev.representantRecord,
                    company: value, // Atualiza o ID da empresa
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                representantRecord: {
                    ...prev.representantRecord,
                    [name]: value,
                },
            }));
        }
    }

    return (
        <div className="modal__background" onClick={handleClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Representante</h2>
                <form onSubmit={handleAddition}>
                    <label>
                        Nome do Representante:
                        <input
                            type="text"
                            name="name"
                            value={formData.representantRecord.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Usuários:
                        {users.length > 0 ? (
                            <select
                                name="userId"
                                value={formData.userRecord.id || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione um usuário...</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.login}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione usuários antes de cadastrar representantes.</p>
                        )}
                    </label>
                    <label>
                        Empresas:
                        {companies.length > 0 ? (
                            <select
                                name="company"
                                value={formData.representantRecord.company}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma empresa...</option>
                                {companies.map((company) => (
                                    <option key={company.id} value={company.id}>
                                        {company.name}, {company.cnpj}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione empresas antes de cadastrar representantes.</p>
                        )}
                    </label>

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
