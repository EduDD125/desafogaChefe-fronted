import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData.js";
import { GiConsoleController } from "react-icons/gi";

export default function AddCompaniesModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const saveData = useSaveData();
    const {fetchData, loading} = useFetchData();
    const [addresses, setAddresses] = useState();

    useFetchData( () => {
        try {
            const response = fetchData("/address/");
            if (response.status == 200) setAddresses(response);
            console.log(response);
        } catch(error) {
            console.log(error);
        }
    },[] )

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            setIsModalOpen(false);
            await saveData("companies", formData);
        } catch (error) {
            console.error(error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="modal__background" onClick={() => handleClose()}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar companies</h2>
                <form onSubmit={handleAddition}>
                    <label>name: <input type='text' name='name' onChange={handleChange} required /></label>
                    <label>CNPJ: <input type='text' name='CNPJ' onChange={handleChange} required /></label>
                    <label>email: <input type='text' name='email' onChange={handleChange} required /></label>
                    <label>address: 
                        {addresses ?
                                <select name='address'>
                                {addresses.map((value, index) => (
                                    <option key={index} value={value.toLowerCase().replace(/\s+/g, '-')}>
                                    {value}
                                    </option>
                                ))}
                                </select>
                        :
                            <p>Add addresses before adding companies</p>
                        }                        
                    </label>

                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        {addresses != undefined && <button type="submit" disabled>Adicionar</button> }
                    </div>
                </form>
            </div>
        </div>
    );
}
