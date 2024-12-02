import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";

export default function AddAddressesModal({ setIsModalOpen }) {
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
            await saveData("addresses", formData);
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
                <h2>Adicionar addresses</h2>
                <form onSubmit={handleAddition}>
                    <label>number: <input type='text' name='number' onChange={handleChange} required /></label>
                    <label>street: <input type='text' name='street' onChange={handleChange} required /></label>
                    <label>city: <input type='text' name='city' onChange={handleChange} required /></label>
                    <label>state: <input type='text' name='state' onChange={handleChange} required /></label>
                    <label>postalCode: <input type='text' name='postalCode' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
