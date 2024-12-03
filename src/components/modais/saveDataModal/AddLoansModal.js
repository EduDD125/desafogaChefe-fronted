import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddLoansModal({ setIsModalOpen }) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const initialStartTime = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-00`;
    const initialEndTime = `${tomorrow.getFullYear()}/${String(tomorrow.getMonth() + 1).padStart(2, "0")}/${String(tomorrow.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-00`;

    const [formData, setFormData] = useState({
        loanedColaborator: "",
        loaningCompany: "",
        loanerCompany: "",
        loanJob: "",
        startTime: initialStartTime,
        endTime: initialEndTime,
        agreedPayRate: "",
    });

    const [collaborators, setCollaborators] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);
    const { performCrudOperation } = useCrudOperations();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const companiesRequest = await performCrudOperation("companies", "get");
            setCompanies(companiesRequest);

            const collaboratorsRequest = await performCrudOperation("colaborators", "get");
            setCollaborators(collaboratorsRequest);

            const jobsRequest = await performCrudOperation("jobs", "get");
            setJobs(jobsRequest);
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
            await saveData("loans", formData);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Erro ao adicionar empréstimo:", err);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="modal__background" onClick={handleClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Empréstimo</h2>
                <form onSubmit={handleAddition}>
                    <label>
                        Colaborador Emprestado:
                        {collaborators.length > 0 ? (
                            <select
                                name="loanedColaborator"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione um colaborador...</option>
                                {collaborators.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.colaboratorName}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione colaboradores antes de criar empréstimos.</p>
                        )}
                    </label>
                    <label>
                        Empresa Emprestadora:
                        {companies.length > 0 ? (
                            <select
                                name="loanerCompany"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma empresa...</option>
                                {companies.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione empresas antes de criar empréstimos.</p>
                        )}
                    </label>
                    <label>
                        Empresa Contratante:
                        {companies.length > 0 ? (
                            <select
                                name="loaningCompany"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecione uma empresa...</option>
                                {companies.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione empresas antes de criar empréstimos.</p>
                        )}
                    </label>
                    <label>
                        Tarefa do Empréstimo:
                        {jobs.length > 0 ? (
                            <select name="loanJob" onChange={handleChange} required>
                                <option value="">Selecione uma tarefa...</option>
                                {jobs.map((value) => (
                                    <option key={value.id} value={value.id}>
                                        {value.title}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Adicione tarefas antes de criar empréstimos.</p>
                        )}
                    </label>
                    <label>Hora de Início: <input type="text" name="startTime" value={formData.startTime} onChange={handleChange} required /></label>
                    <label>Hora de Término: <input type="text" name="endTime" value={formData.endTime} onChange={handleChange} required /></label>
                    <label>Taxa Acordada: <input type="number" name="agreedPayRate" onChange={handleChange} required /></label>

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
