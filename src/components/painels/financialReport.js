import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function FinancialReport({ data }) {
    const [loan, setLoan] = useState(data.loan?.name || "");
    const [hoursWorked, setHoursWorked] = useState(data.hoursWorked || 0);
    const [totalCost, setTotalCost] = useState(data.totalCost || 0);
    const [basePay, setBasePay] = useState(data.basePay || 0);
    const [extraPay, setExtraPay] = useState(data.extraPay || 0);
    const [transportationCost, setTransportationCost] = useState(data.transportationCost || 0);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLoan(data.loan?.name || "");
        setHoursWorked(data.hoursWorked || 0);
        setTotalCost(data.totalCost || 0);
        setBasePay(data.basePay || 0);
        setExtraPay(data.extraPay || 0);
        setTransportationCost(data.transportationCost || 0);
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (hoursWorked <= 0) newErrors.hoursWorked = "Horas trabalhadas devem ser maiores que zero.";
        if (totalCost <= 0) newErrors.totalCost = "Custo total deve ser maior que zero.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newFinancialReportData = {
            loan,
            hoursWorked,
            totalCost,
            basePay,
            extraPay,
            transportationCost,
        };
        const option = "financial-reports";
        await editData(option, tipo(), data.id, newFinancialReportData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Relatório Financeiro</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Empréstimo:
                    <input
                        type="text"
                        value={loan}
                        onChange={(e) => setLoan(e.target.value)}
                        disabled
                    />
                </label>

                <label>
                    Horas Trabalhadas:
                    <input
                        type="number"
                        value={hoursWorked}
                        onChange={(e) => setHoursWorked(Number(e.target.value))}
                        className={errors.hoursWorked ? "input-error" : ""}
                    />
                    {errors.hoursWorked && <p className="error-message">{errors.hoursWorked}</p>}
                </label>

                <label>
                    Custo Total:
                    <input
                        type="number"
                        value={totalCost}
                        onChange={(e) => setTotalCost(Number(e.target.value))}
                        className={errors.totalCost ? "input-error" : ""}
                    />
                    {errors.totalCost && <p className="error-message">{errors.totalCost}</p>}
                </label>

                <label>
                    Salário Base:
                    <input
                        type="number"
                        value={basePay}
                        onChange={(e) => setBasePay(Number(e.target.value))}
                    />
                </label>

                <label>
                    Pagamento Extra:
                    <input
                        type="number"
                        value={extraPay}
                        onChange={(e) => setExtraPay(Number(e.target.value))}
                    />
                </label>

                <label>
                    Custo de Transporte:
                    <input
                        type="number"
                        value={transportationCost}
                        onChange={(e) => setTransportationCost(Number(e.target.value))}
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
