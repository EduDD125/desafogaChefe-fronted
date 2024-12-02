import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";

export default function AddJobsModal({ setIsModalOpen }) {
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
            await saveData("jobs", formData);
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
                <h2>Adicionar jobs</h2>
                <form onSubmit={handleAddition}>
                    <label>title: <input type='text' name='title' onChange={handleChange} required /></label>
                    <label>bruteCostPerHour: <input type='text' name='bruteCostPerHour' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
