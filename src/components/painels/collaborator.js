import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Collaborator({ data }) {
    const [name, setName] = useState(data.name || "");
    const [CPF, setCPF] = useState(data.CPF || "");
    const [job, setJob] = useState(data.job?.title || "");
    const [workSchedule, setWorkSchedule] = useState(data.workSchedule || "");
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(data.name || "");
        setCPF(data.CPF || "");
        setJob(data.job?.title || "");
        setWorkSchedule(data.workSchedule || "");
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!name) newErrors.name = "Nome é obrigatório.";
        if (!CPF) newErrors.CPF = "CPF é obrigatório.";
        if (!job) newErrors.job = "Cargo é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newCollaboratorData = { name, CPF, job, workSchedule };
        const option = "colaborators";
        await editData(option, tipo(), data.id, newCollaboratorData);
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
                    <input
                        type="text"
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        className={errors.job ? "input-error" : ""}
                    />
                    {errors.job && <p className="error-message">{errors.job}</p>}
                </label>

                <label>
                    Horário de Trabalho:
                    <input
                        type="text"
                        value={workSchedule}
                        onChange={(e) => setWorkSchedule(e.target.value)}
                    />
                </label>

                {error && <p className="error-message">{error.response?.data?.message}</p>}

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
