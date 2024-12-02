import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData";

export default function AddRepresentantsModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const [relatedData, setRelatedData] = useState({});
    const { fetchData } = useFetchData();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const data = await fetchData("{{RELATED_URL}}");
            setRelatedData(data);
        }
        fetchRelatedData();
    }, []);

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            setIsModalOpen(false);
            await saveData("representants", formData);
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
                <h2>Adicionar representants</h2>
                <form onSubmit={handleAddition}>
                    <label>id: <input type='text' name='id' onChange={handleChange} required /></label>
<label>name: <input type='text' name='name' onChange={handleChange} required /></label>
<label>company: <input type='text' name='company' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
