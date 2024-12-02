import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";

export default function AddUsersModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const saveData = useSaveData();

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            setIsModalOpen(false);
            await saveData("users", formData);
        } catch (err) {
            console.error(err);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="modal__background" onClick={() => handleClose()}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar users</h2>
                <form onSubmit={handleAddition}>
                    <label>login: <input type='text' name='login' onChange={handleChange} required /></label>
                    <label>password: <input type='text' name='password' onChange={handleChange} required /></label>
                    <label>isAdmin: <input type='text' name='isAdmin' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
