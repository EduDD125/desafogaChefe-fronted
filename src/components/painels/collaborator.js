import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";
import useCrudOperations from "../../hooks/useCrudOperations/useCrudOperations.js";

export default function Collaborator({ data }) {
    const [name, setName] = useState(data.colaboratorName || "");
    const [CPF, setCPF] = useState(data.cpf || "");
    const [job, setJob] = useState(data.job?.id || "");
    const [workSchedule, setWorkSchedule] = useState(data.workSchedule?.id || "");
    const { editData, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    const { performCrudOperation, loading } = useCrudOperations();
    const [workSchedules, setWorkSchedules] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setName(data.colaboratorName || "");
        setCPF(data.cpf || "");
        setJob(data.job?.id || "");
        setWorkSchedule(data.workSchedule?.id || "");
        setError("");
        setErrors({});

        async function fetchRelatedData() {
            try {
                const workSchedulesRequest = await performCrudOperation("work-schedules", "get");
                setWorkSchedules(workSchedulesRequest);

                const jobsRequest = await performCrudOperation("jobs", "get");
                setJobs(jobsRequest);
            } catch (error) {
                console.error("Error fetching related data:", error);
            }
        }
        fetchRelatedData();
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!name) newErrors.colaboratorName = "Nome é obrigatório.";
        if (!CPF) newErrors.cpf = "CPF é obrigatório.";
        if (!job) newErrors.job = "Cargo é obrigatório.";
        if (!workSchedule) newErrors.workSchedule = "Horário de Trabalho é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newCollaboratorData = {
            name,
            CPF,
            job: Number(job), // Converte para número, caso necessário
            workSchedule: Number(workSchedule), // Converte para número
        };

        const option = "colaborators";
        try {
            await editData(option, tipo(), data.id, newCollaboratorData);
        } catch (editError) {
            console.error("Error editing collaborator:", editError);
        }
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Colaborador</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? "input-error" : ""}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </label>

                <label>
                    CPF:
                    <input
                        type="text"
                        value={CPF}
                        onChange={(e) => setCPF(e.target.value)}
                        className={errors.CPF ? "input-error" : ""}
                    />
                    {errors.CPF && <p className="error-message">{errors.CPF}</p>}
                </label>

                <label>
                    Cargo:
                    <select
                        name="job"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className={errors.job ? "input-error" : ""}
                        required
                    >
                        <option value="">Selecione um cargo...</option>
                        {jobs.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.title}
                            </option>
                        ))}
                    </select>
                    {errors.job && <p className="error-message">{errors.job}</p>}
                </label>

                <label>
                    Horário de Trabalho:
                    <select
                        name="workSchedule"
                        value={workSchedule}
                        onChange={(e) => setWorkSchedule(e.target.value)}
                        className={errors.workSchedule ? "input-error" : ""}
                        required
                    >
                        <option value="">Selecione um horário...</option>
                        {workSchedules.map((schedule) => (
                            <option key={schedule.id} value={schedule.id}>
                                {`${schedule.beginOfShift} - ${schedule.endOfShift}`}
                            </option>
                        ))}
                    </select>
                    {errors.workSchedule && <p className="error-message">{errors.workSchedule}</p>}
                </label>

                {error && <p className="error-message">{error.response?.data?.message || "Erro ao editar colaborador."}</p>}

                <div className="button-area">
                    {loading ? (
                        <button disabled>Editando...</button>
                    ) : (
                        <button type="submit">Salvar Edição</button>
                    )}
                </div>
            </form>
        </div>
    );
}
