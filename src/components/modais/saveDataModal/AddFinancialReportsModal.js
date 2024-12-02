import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData";

export default function AddFinancialReportsModal({ setIsModalOpen }) {
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
            await saveData("financialReports", formData);
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
                <h2>Adicionar financialReports</h2>
                <form onSubmit={handleAddition}>
                    <label>id: <input type='text' name='id' onChange={handleChange} required /></label>
<label>loan: <input type='text' name='loan' onChange={handleChange} required /></label>
<label>hoursWorked: <input type='text' name='hoursWorked' onChange={handleChange} required /></label>
<label>totalCost: <input type='text' name='totalCost' onChange={handleChange} required /></label>
<label>basePay: <input type='text' name='basePay' onChange={handleChange} required /></label>
<label>extraPay: <input type='text' name='extraPay' onChange={handleChange} required /></label>
<label>transportationCost: <input type='text' name='transportationCost' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
