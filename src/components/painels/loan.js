import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";
import useCrudOperations from "../../hooks/useCrudOperations/useCrudOperations.js";

export default function Loan({ data }) {
    const [loanedColaborator, setLoanedColaborator] = useState(data.loanedColaborator?.name || "");
    const [loaningCompany, setLoaningCompany] = useState(data.loaningCompany?.name || "");
    const [loanerCompany, setLoanerCompany] = useState(data.loanerCompany?.id || "");
    const [loanJob, setLoanJob] = useState(data.loanJob?.title || "");
    const [startTime, setStartTime] = useState(data.startTime || "");
    const [endTime, setEndTime] = useState(data.endTime || "");
    const [agreedPayRate, setAgreedPayRate] = useState(data.agreedPayRate || 0);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});
    const [companies, setCompanies] = useState([]);
    const { performCrudOperation } = useCrudOperations();

    useEffect(() => {
        setLoanedColaborator(data.colaborator?.colaboratorName || "");
        setLoaningCompany(data.loaningCompany?.name || "");
        setLoanerCompany(data.loanerCompany?.id || "");
        setLoanJob(data.job?.title || "");
        setStartTime(data.startTime || "");
        setEndTime(data.endTime || "");
        setAgreedPayRate(data.agreedPayRate || 0);
        setError("");
        setErrors({});

        async function fetchCompanies() {
            try {
                const companiesRequest = await performCrudOperation("companies", "get");
                setCompanies(companiesRequest);
            } catch (fetchError) {
                console.error("Error fetching companies:", fetchError);
            }
        }
        fetchCompanies();
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!loanerCompany) newErrors.loanerCompany = "Empresa recebedora é obrigatória.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const updatedLoanData = loanerCompany;

        try {
            await editData("loans", tipo(), data.id, updatedLoanData);
        } catch (editError) {
            console.error("Error editing loan:", editError);
        }
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Editar Empresa Recebedora</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Colaborador Emprestado:
                    <input
                        type="text"
                        value={loanedColaborator}
                        disabled
                    />
                </label>

                <label>
                    Empresa Emprestadora:
                    <input
                        type="text"
                        value={loaningCompany}
                        disabled
                    />
                </label>

                <label>
                    Empresa Recebedora:
                    <select
                        name="loanerCompany"
                        value={loanerCompany}
                        onChange={(e) => setLoanerCompany(e.target.value)}
                        className={errors.loanerCompany ? "input-error" : ""}
                        required
                    >
                        <option value="">Selecione uma empresa...</option>
                        {companies.map((company) => (
                            <option key={company.id} value={company.id}>
                                {company.name}
                            </option>
                        ))}
                    </select>
                    {errors.loanerCompany && <p className="error-message">{errors.loanerCompany}</p>}
                </label>

                <label>
                    Cargo:
                    <input
                        type="text"
                        value={loanJob}
                        disabled
                    />
                </label>

                <label>
                    Hora de Início:
                    <input
                        type="datetime-local"
                        value={startTime}
                        disabled
                    />
                </label>

                <label>
                    Hora de Término:
                    <input
                        type="datetime-local"
                        value={endTime}
                        disabled
                    />
                </label>

                <label>
                    Taxa de Pagamento:
                    <input
                        type="number"
                        value={agreedPayRate}
                        disabled
                    />
                </label>

                {error && <p className="error-message">{error.response?.data?.message || "Erro ao editar empréstimo."}</p>}

                <div className="button-area">
                    {loading ? (
                        <button disabled>Editando...</button>
                    ) : (
                        <button type="submit">Salvar Alteração</button>
                    )}
                </div>
            </form>
        </div>
    );
}
