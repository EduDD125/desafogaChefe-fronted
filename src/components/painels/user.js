import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import { tipo } from "../../hooks/getUserType";

export default function User({ data }) {
    const [login, setLogin] = useState(data.login || "");
    const [password, setPassword] = useState(data.password || "");
    const [isAdmin, setIsAdmin] = useState(data.isAdmin || false);
    const { editData, loading, error, setError } = useEditData();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setLogin(data.login || "");
        setPassword(data.password || "");
        setIsAdmin(data.isAdmin || false);
        setError("");
        setErrors({});
    }, [data]);

    function validateFields() {
        let newErrors = {};
        if (!login) newErrors.login = "Login é obrigatório.";
        if (!password) newErrors.password = "Senha é obrigatória.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleEdition(event) {
        event.preventDefault();
        setError("");
        if (!validateFields()) return;

        const newUserData = { login, password, isAdmin };
        const option = "users";
        await editData(option, tipo(), data.id, newUserData);
    }

    return (
        <div className="item__container">
            <div className="item__title">
                <h3>Dados do Usuário</h3>
            </div>
            <form onSubmit={handleEdition}>
                <label>
                    Login:
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className={errors.login ? "input-error" : ""}
                    />
                    {errors.login && <p className="error-message">{errors.login}</p>}
                </label>

                <label>
                    Senha:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={errors.password ? "input-error" : ""}
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </label>

                <label>
                    Administrador:
                    <select
                        value={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.value === "true")}
                    >
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
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
