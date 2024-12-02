import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData";

export default function AddLoansModal({ setIsModalOpen }) {
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
            await saveData("loans", formData);
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
                <h2>Adicionar loans</h2>
                <form onSubmit={handleAddition}>
                    <label>loanedColaborator: <input type='text' name='loanedColaborator' onChange={handleChange} required /></label>
<label>loaningCompany: <input type='text' name='loaningCompany' onChange={handleChange} required /></label>
<label>loanerCompany: <input type='text' name='loanerCompany' onChange={handleChange} required /></label>
<label>loanJob: <input type='text' name='loanJob' onChange={handleChange} required /></label>
<label>startTime: <input type='text' name='startTime' onChange={handleChange} required /></label>
<label>endTime: <input type='text' name='endTime' onChange={handleChange} required /></label>
<label>agreedPayRate: <input type='text' name='agreedPayRate' onChange={handleChange} required /></label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
