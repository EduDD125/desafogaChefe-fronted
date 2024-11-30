import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Company({ data }) {
    const [name, setName] = useState(data.name || "");
    const [CNPJ, setCNPJ] = useState(data.CNPJ || "");
    const [email, setEmail] = useState(data.email || "");
    const [address, setAddress] = useState(data.address?.street || "");
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(data.name || "");
        setCNPJ(data.CNPJ || "");
        setEmail(data.email || "");
        setAddress(data.address?.street || "");
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!name) newErrors.name = "Nome é obrigatório.";
        if (!CNPJ) newErrors.CNPJ = "CNPJ é obrigatório.";
        if (!email) newErrors.email = "Email é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newCompanyData = { name, CNPJ, email, address };
        const option = "companies";
        await editData(option, tipo(), data.id, newCompanyData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados da Empresa</h3>
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
                    CNPJ:
                    <input
                        type="text"
                        value={CNPJ}
                        onChange={(e) => setCNPJ(e.target.value)}
                        className={errors.CNPJ ? "input-error" : ""}
                    />
                    {errors.CNPJ && <p className="error-message">{errors.CNPJ}</p>}
                </label>

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </label>

                <label>
                    Endereço:
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
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
