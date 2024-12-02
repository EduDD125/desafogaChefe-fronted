import "./saveDataModalStyle.css";
import { useEffect, useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddCompaniesModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState({});
    const saveData = useSaveData();
    const { performCrudOperation, loading } = useCrudOperations();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        async function fetchRelatedData() {
            try {
                const response = await performCrudOperation("address", "get");
                setAddresses(response); // Extraindo 'data'
                console.log(response)
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
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
            const response = await performCrudOperation("companies", "get", formData);
            console.log(response)
            setIsModalOpen(false);
            } catch (error) {
            console.error("Error saving data:", error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="modal__background" onClick={handleClose}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Companies</h2>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <form onSubmit={handleAddition}>
                        <label>
                            Name:
                            <input type="text" name="name" onChange={handleChange} required />
                        </label>
                        <label>
                            CNPJ:
                            <input type="text" name="CNPJ" onChange={handleChange} required />
                        </label>
                        <label>
                            Email:
                            <input type="text" name="email" onChange={handleChange} required />
                        </label>
                        <label>
                            Address:
                            {addresses && addresses.length > 0 ? (
                                <select name="address" onChange={handleChange} required>
                                    <option key={0} value={""}>
                                            choose a address....
                                        </option>
                                    {addresses.map((value) => (
                                        <option key={value.id+1} value={value.id}>
                                            {value.street}, {value.number}, {value.city}, {value.state}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add addresses before adding companies</p>
                            )}
                        </label>
                        <div className="button-area">
                            <button type="button" onClick={handleClose}>
                                Cancelar
                            </button>
                            <button type="submit" disabled={!addresses || addresses.length === 0}>
                                Adicionar
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
