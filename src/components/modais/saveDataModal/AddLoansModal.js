import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData";
import useCrudOperations from "../../../hooks/useCrudOperations/useCrudOperations.js";

export default function AddLoansModal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {} );
    const [collaborators, setCollaborators] = useState({});
    const { performCrudOperation, loading, error } = useCrudOperations();
    const [companies, setCompanies] = useState({});
    const [jobs, setJobs] = useState({});

    const { fetchData } = useFetchData();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchRelatedData() {
            const companiesRequest = await performCrudOperation("companies", "get");
            setCompanies(companiesRequest);

            const collaboratorsrequest = await performCrudOperation("colaborators", "get");
            setCollaborators(collaboratorsrequest);

            const jobsRequest = await performCrudOperation("jobs", "get");
            setJobs(jobsRequest);
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
                {loading ? <p>Loading data</p>
                    :
                    <form onSubmit={handleAddition}>
                    <label>Loaned collaborator:
                            {collaborators && collaborators.length > 0 ? (
                                <select name="collaborator" onChange={handleChange} required>
                                    {collaborators.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add collaborator before adding loans</p>
                            )}
                        </label>
                        <label>Loaning Company:
                            {companies && companies.length > 0 ? (
                                <select name="loaningCompany" onChange={handleChange} required>
                                    {companies.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add companies before adding loans</p>
                            )}
                        </label>
                        <label>Loaner Company:
                            {companies && companies.length > 0 ? (
                                <select name="loanerCompany" onChange={handleChange} required>
                                    {companies.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add companies before adding loans</p>
                            )}
                        </label>
                        <label>Loan Job:
                            {jobs && jobs.length > 0 ? (
                                <select name="loanJob" onChange={handleChange} required>
                                    {jobs.map((value) => (
                                        <option key={value.id} value={value.id}>
                                            {value.title}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>Add jobs before adding loans</p>
                            )}
                        </label>
                        <label>startTime: <input type='time' name='startTime' onChange={handleChange} required /></label>
                        <label>endTime: <input type='time' name='endTime' onChange={handleChange} required /></label>
                        <label>agreedPayRate: <input type='number' name='agreedPayRate' onChange={handleChange} required /></label>
    
                        <div className="button-area">
                            <button onClick={handleClose}>Cancelar</button>
                            <button type="submit">Adicionar</button>
                        </div>
                    </form>
                }
                
            </div>
        </div>
    );
}
