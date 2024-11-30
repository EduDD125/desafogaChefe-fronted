import { useEffect, useState } from "react";
import "./signUpModalStyle.css";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function SignInModal({ setIsModalSignInOpen }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmsenha, setConfirmsenha] = useState("");

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const { performCrudOperation, loading, error } = useCrudOperations();

    function handleClose() {
        setIsModalSignInOpen(false);
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateFields() {
        let newErrors = {};

        if (!email) {
            newErrors.email = "Email é obrigatório.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Formato de email inválido.";
        }

        if (!senha) newErrors.senha = "Senha é obrigatória.";
        if (senha !== confirmsenha) newErrors.confirmsenha = "Senhas não coincidem.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        if (!validateFields()) return;

        let userData = {login: email, password: senha, isAdmin: false};

        try {
            const response = await performCrudOperation("users", "post", userData);
            if (response && response.status === 200) {
                handleClose();
            }
        } catch (err) {
            console.log("err:", err);
            handleErrors(err)
        }
    }

    function handleErrors(error) {
        switch (error.code) {
            case "EMAIL_IN_USE":
                setErrors((prevErrors) => ({ ...prevErrors, email: "Este email já está em uso." }));
                break;
            case "EMPTY_FIELDS":
                setGeneralError("Todos os campos são obrigatórios.");
                break;
            case "SERVER_ERROR":
                setGeneralError("Erro no servidor. Tente novamente mais tarde.");
            default:
                setGeneralError("Erro no servidor. Tente novamente mais tarde.");
        }
    }

    function handleInputChange(setValue, fieldName) {
        return (event) => {
            const value = event.target.value;
            setValue(value);
            if (value) {
                setGeneralError("");
                setErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors[fieldName];
                    return newErrors;
                });
            }
        };
    }

    return (
        <div className="signup-modal__background" onClick={() => handleClose()}>
            <div className="signup-modal__container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)} className="signup-modal__form">

                    <label>email:
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange(setEmail, "email")}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </label>

                    <label>senha:
                        <input
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={handleInputChange(setSenha, "senha")}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <p className="error-message">{errors.senha}</p>}
                    </label>

                    <label>confirme a senha:
                        <input
                            type="password"
                            name="confirm_senha"
                            value={confirmsenha}
                            onChange={handleInputChange(setConfirmsenha, "confirmsenha")}
                            className={errors.confirmsenha ? "input-error" : ""}
                        />
                        {errors.confirmsenha && <p className="error-message">{errors.confirmsenha}</p>}
                    </label>

                    {generalError && <p className="error-message">{generalError}</p>}

                    <div className="button-area">
                        <button type="button" onClick={handleClose}>cancel</button>
                        {!loading ?
                            <button type="submit">Sign Up</button>
                        :
                            <button type="submit" readOnly>Submitting</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
