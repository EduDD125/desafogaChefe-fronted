import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Representant({ data }) {
    const [name, setName] = useState(data.name || "");
    const [company, setCompany] = useState(data.company?.name || "");
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(data.name || "");
        setCompany(data.company?.name || "");
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!name) newErrors.name = "Nome é obrigatório.";
        if (!company) newErrors.company = "Empresa é obrigatória.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newRepresentantData = { name, company };
        const option = "representants";
        await editData(option, tipo(), data.id, newRepresentantData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Representante</h3>
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
                    Empresa:
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={errors.company ? "input-error" : ""}
                    />
                    {errors.company && <p className="error-message">{errors.company}</p>}
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

