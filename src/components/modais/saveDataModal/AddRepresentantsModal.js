import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddRepresentantsModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const [companies, setCompanies] = useState({});
    const { performCrudOperation, loading } = useCrudOperations();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const companiesRequest = await performCrudOperation("companies", "get");
            setCompanies(companiesRequest);
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
                    <label>Company:
                            {companies && companies.length > 0 ? (
                                <select name="address" onChange={handleChange} required>
                                    {companies.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.street}, {value.number}, {value.city}, {value.state}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add companies before adding representats</p>
                            )}
                        </label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
