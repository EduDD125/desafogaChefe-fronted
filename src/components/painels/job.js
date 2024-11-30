import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Job({ data }) {
    const [title, setTitle] = useState(data.title || "");
    const [bruteCostPerHour, setBruteCostPerHour] = useState(data.bruteCostPerHour || 0);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setTitle(data.title || "");
        setBruteCostPerHour(data.bruteCostPerHour || 0);
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!title) newErrors.title = "Título é obrigatório.";
        if (bruteCostPerHour <= 0) newErrors.bruteCostPerHour = "Custo por hora deve ser maior que zero.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newJobData = { title, bruteCostPerHour };
        const option = "jobs";
        await editData(option, tipo(), data.id, newJobData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Cargo</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={errors.title ? "input-error" : ""}
                    />
                    {errors.title && <p className="error-message">{errors.title}</p>}
                </label>

                <label>
                    Custo Bruto por Hora:
                    <input
                        type="number"
                        value={bruteCostPerHour}
                        onChange={(e) => setBruteCostPerHour(Number(e.target.value))}
                        className={errors.bruteCostPerHour ? "input-error" : ""}
                    />
                    {errors.bruteCostPerHour && (
                        <p className="error-message">{errors.bruteCostPerHour}</p>
                    )}
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
