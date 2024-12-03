import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddColaboratorsModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState({
        userRecord: {
            login: "",
            password: "",
            isAdmin: false, // Valor fixo como false
        },
        colaboratorRecord: {
            name: "",
            CPF: "",
            job: "",
            workSchedule: "",
            isAvailableForLoan: true,
        },
    });

    const [jobs, setJobs] = useState([]);
    const [workSchedules, setWorkSchedules] = useState([]);
    const { performCrudOperation, loading } = useCrudOperations();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            try {
                const jobRequest = await performCrudOperation("jobs", "get");
                setJobs(jobRequest);

                const workSchedulesRequest = await performCrudOperation("work-schedules", "get");
                setWorkSchedules(workSchedulesRequest);
            } catch (error) {
                console.error("Error fetching related data:", error);
            }
        }
        fetchRelatedData();
    }, []);

    function handleClose() {
        setIsModalOpen(false);
    }

    function handleChange(e) {
        const { name, value } = e.target;

        if (["login", "password"].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                userRecord: {
                    ...prev.userRecord,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                colaboratorRecord: {
                    ...prev.colaboratorRecord,
                    [name]: name === "isAvailableForLoan" ? value === "true" : value,
                },
            }));
        }
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Enviando:", formData);
            await saveData("colaborators", formData);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Erro ao adicionar colaborador:", error);
        }
    }

    return (
        <div className="modal__background" onClick={handleClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Colaborador</h2>
                <form onSubmit={handleAddition}>
                    {/* Campos para ColaboratorRecord */}
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="name"
                            value={formData.colaboratorRecord.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="CPF"
                            value={formData.colaboratorRecord.CPF}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Cargo:
                        <select
                            name="job"
                            value={formData.colaboratorRecord.job}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um cargo...</option>
                            {jobs.map((job) => (
                                <option key={job.id} value={job.id}>
                                    {job.title}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Horário de Trabalho:
                        <select
                            name="workSchedule"
                            value={formData.colaboratorRecord.workSchedule}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione um horário...</option>
                            {workSchedules.map((schedule) => (
                                <option key={schedule.id} value={schedule.id}>
                                    {schedule.id}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Disponível para empréstimo:
                        <select
                            name="isAvailableForLoan"
                            value={formData.colaboratorRecord.isAvailableForLoan}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="true">Sim</option>
                            <option value="false">Não</option>
                        </select>
                    </label>

                    {/* Campos para UserRecord */}
                    <label>
                        Login:
                        <input
                            type="text"
                            name="login"
                            value={formData.userRecord.login}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Senha:
                        <input
                            type="password"
                            name="password"
                            value={formData.userRecord.password}
                            onChange={handleChange}
                            required
                        />
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
