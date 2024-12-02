import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData";

export default function AddWorkSchedulesModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState({
        beginOfShift: "",
        endOfShift: "",
        workingDays: [],
    });
    const saveData = useSaveData();

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            setIsModalOpen(false);
            await saveData("work-schedules", formData);
        } catch (err) {
            console.error(err);
        }
    }

    function handleCheckboxChange(e) {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const updatedDays = checked
                ? [...prevData.workingDays, value] // Adiciona o dia se marcado
                : prevData.workingDays.filter((day) => day !== value); // Remove o dia se desmarcado
            return { ...prevData, workingDays: updatedDays };
        });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="modal__background" onClick={() => handleClose()}>
            <div className="modal__container" onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar workSchedules</h2>
                <form onSubmit={handleAddition}>
                    <label>
                        beginOfShift:{" "}
                        <input type="time" name="beginOfShift" onChange={handleInputChange} required />
                    </label>
                    <label>
                        endOfShift:{" "}
                        <input type="time" name="endOfShift" onChange={handleInputChange} required />
                    </label>
                    <fieldset>
                        <legend>Working Days:</legend>
                        {daysOfWeek.map((day) => (
                            <label key={day}>
                                <input
                                    type="checkbox"
                                    value={day}
                                    onChange={handleCheckboxChange}
                                    checked={formData.workingDays.includes(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </fieldset>
                    <div className="button-area">
                        <button type="button" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
