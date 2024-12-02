import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddColaboratorsModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const [jobs, setjobs] = useState([]);
const [workSchedules, setWorkSchedules] = useState([]);
    const { performCrudOperation, loading, error } = useCrudOperations();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const jobRequest = await performCrudOperation("jobs", "get");;
            setjobs(jobRequest);
            
            const workSchedulesRequest = await performCrudOperation("work-schedules", "get");
            setWorkSchedules(workSchedulesRequest);
            console.log("jobRequest:", jobRequest)
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
            await saveData("colaborators", formData);
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
                <h2>Adicionar colaborators</h2>

                {(jobs && workSchedules) ? 
                    <form onSubmit={handleAddition}>
                        <label>name: <input type='text' name='name' onChange={handleChange} required /></label>
                        <label>CPF: <input type='text' name='CPF' onChange={handleChange} required /></label>
                        <label>job:
                            <select name="job">
                                {jobs && jobs.map((job) => (
                                    <option key={job.id} value={job.id} onChange={handleChange}>
                                        {job.title}
                                    </option>
                                ))}
                            </select>

                        </label>
                        <label>workSchedule:
                        <select name="workSchedule">
                                {workSchedules && workSchedules.map((workSchedule) => (
                                    <option key={workSchedule.id} value={workSchedule.id} onChange={handleChange}>
                                        {workSchedule.id}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>Is available for loan:
                            <select name="workSchedule">
                                    <option key={0} value={true} onChange={handleChange}>
                                        yes
                                    </option>
                                    <option key={1} value={false} onChange={handleChange}>
                                        no
                                    </option>
                            </select>
                        </label>

                        <div className="button-area">
                            <button onClick={handleClose}>Cancelar</button>
                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                    :
                    <>
                        {!jobs && <p>The aren´t jobs registered in the system. Add some before trying to add collaborators.</p>}
                        {!workSchedules && <p>The aren´t work schedules registered in the system. Add some before trying to add collaborators.</p>}
                    </>
                }
                
            </div>
        </div>
    );
}
