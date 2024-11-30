import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Loan({ data }) {
    const [loanedColaborator, setLoanedColaborator] = useState(data.loanedColaborator?.name || "");
    const [loaningCompany, setLoaningCompany] = useState(data.loaningCompany?.name || "");
    const [loanerCompany, setLoanerCompany] = useState(data.loanerCompany?.name || "");
    const [loanJob, setLoanJob] = useState(data.loanJob?.title || "");
    const [startTime, setStartTime] = useState(data.startTime || "");
    const [endTime, setEndTime] = useState(data.endTime || "");
    const [agreedPayRate, setAgreedPayRate] = useState(data.agreedPayRate || 0);
    const [loanStatus, setLoanStatus] = useState(data.loanStatus || "");
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLoanedColaborator(data.loanedColaborator?.name || "");
        setLoaningCompany(data.loaningCompany?.name || "");
        setLoanerCompany(data.loanerCompany?.name || "");
        setLoanJob(data.loanJob?.title || "");
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setAgreedPayRate(data.agreedPayRate || 0);
        setLoanStatus(data.loanStatus || "");
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!startTime) newErrors.startTime = "Hora de início é obrigatória.";
        if (!endTime) newErrors.endTime = "Hora de término é obrigatória.";
        if (agreedPayRate <= 0) newErrors.agreedPayRate = "Taxa de pagamento deve ser maior que zero.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newLoanData = {
            loanedColaborator,
            loaningCompany,
            loanerCompany,
            loanJob,
            startTime,
            endTime,
            agreedPayRate,
            loanStatus,
        };
        const option = "loans";
        await editData(option, tipo(), data.id, newLoanData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Empréstimo</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Colaborador Emprestado:
                    <input
                        type="text"
                        value={loanedColaborator}
                        onChange={(e) => setLoanedColaborator(e.target.value)}
                        disabled
                    />
                </label>

                <label>
                    Empresa Emprestadora:
                    <input
                        type="text"
                        value={loaningCompany}
                        onChange={(e) => setLoaningCompany(e.target.value)}
                        disabled
                    />
                </label>

                <label>
                    Empresa Recebedora:
                    <input
                        type="text"
                        value={loanerCompany}
                        onChange={(e) => setLoanerCompany(e.target.value)}
                        disabled
                    />
                </label>

                <label>
                    Cargo:
                    <input
                        type="text"
                        value={loanJob}
                        onChange={(e) => setLoanJob(e.target.value)}
                        disabled
                    />
                </label>

                <label>
                    Hora de Início:
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className={errors.startTime ? "input-error" : ""}
                    />
                    {errors.startTime && <p className="error-message">{errors.startTime}</p>}
                </label>

                <label>
                    Hora de Término:
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className={errors.endTime ? "input-error" : ""}
                    />
                    {errors.endTime && <p className="error-message">{errors.endTime}</p>}
                </label>

                <label>
                    Taxa de Pagamento:
                    <input
                        type="number"
                        value={agreedPayRate}
                        onChange={(e) => setAgreedPayRate(Number(e.target.value))}
                        className={errors.agreedPayRate ? "input-error" : ""}
                    />
                    {errors.agreedPayRate && <p className="error-message">{errors.agreedPayRate}</p>}
                </label>

                <label>
                    Status:
                    <select
                        value={loanStatus}
                        onChange={(e) => setLoanStatus(e.target.value)}
                    >
                        <option value="Active">Ativo</option>
                        <option value="Completed">Concluído</option>
                    </select>
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
