import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function WorkSchedule({ data }) {
    const [beginOfShift, setBeginOfShift] = useState(data.beginOfShift || "");
    const [endOfShift, setEndOfShift] = useState(data.endOfShift || "");
    const [workingDays, setWorkingDays] = useState(data.workingDays || []);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setBeginOfShift(data.beginOfShift || "");
        setEndOfShift(data.endOfShift || "");
        setWorkingDays(data.workingDays || []);
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!beginOfShift) newErrors.beginOfShift = "Início do turno é obrigatório.";
        if (!endOfShift) newErrors.endOfShift = "Fim do turno é obrigatório.";
        if (workingDays.length === 0) newErrors.workingDays = "É necessário selecionar ao menos um dia de trabalho.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newWorkScheduleData = { beginOfShift, endOfShift, workingDays };
        const option = "work-schedules";
        await editData(option, tipo(), data.id, newWorkScheduleData);
    }

    function toggleWorkingDay(day) {
        setWorkingDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Horário de Trabalho</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Início do Turno:
                    <input
                        type="time"
                        value={beginOfShift}
                        onChange={(e) => setBeginOfShift(e.target.value)}
                        className={errors.beginOfShift ? "input-error" : ""}
                    />
                    {errors.beginOfShift && <p className="error-message">{errors.beginOfShift}</p>}
                </label>

                <label>
                    Fim do Turno:
                    <input
                        type="time"
                        value={endOfShift}
                        onChange={(e) => setEndOfShift(e.target.value)}
                        className={errors.endOfShift ? "input-error" : ""}
                    />
                    {errors.endOfShift && <p className="error-message">{errors.endOfShift}</p>}
                </label>

                <label>
                    Dias de Trabalho:
                    <div>
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <label key={day}>
                                <input
                                    type="checkbox"
                                    checked={workingDays.includes(day)}
                                    onChange={() => toggleWorkingDay(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                    {errors.workingDays && <p className="error-message">{errors.workingDays}</p>}
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
