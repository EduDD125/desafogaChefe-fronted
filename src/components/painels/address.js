import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function Address({ data }) {
    const [street, setStreet] = useState(data.street || "");
    const [city, setCity] = useState(data.city || "");
    const [state, setState] = useState(data.state || "");
    const [postalCode, setPostalCode] = useState(data.postalCode || "");
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setStreet(data.street || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPostalCode(data.postalCode || "");
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!street) newErrors.street = "Rua é obrigatória.";
        if (!city) newErrors.city = "Cidade é obrigatória.";
        if (!state) newErrors.state = "Estado é obrigatório.";
        if (!postalCode) newErrors.postalCode = "CEP é obrigatório.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newAddressData = { street, city, state, postalCode };
        const option = "addresses";
        await editData(option, tipo(), data.id, newAddressData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Endereço</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Rua:
                    <input
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className={errors.street ? "input-error" : ""}
                    />
                    {errors.street && <p className="error-message">{errors.street}</p>}
                </label>

                <label>
                    Cidade:
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={errors.city ? "input-error" : ""}
                    />
                    {errors.city && <p className="error-message">{errors.city}</p>}
                </label>

                <label>
                    Estado:
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className={errors.state ? "input-error" : ""}
                    />
                    {errors.state && <p className="error-message">{errors.state}</p>}
                </label>

                <label>
                    CEP:
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={errors.postalCode ? "input-error" : ""}
                    />
                    {errors.postalCode && <p className="error-message">{errors.postalCode}</p>}
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