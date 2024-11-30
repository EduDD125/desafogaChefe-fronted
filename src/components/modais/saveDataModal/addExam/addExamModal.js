import useFetchData from "../../../../hooks/entities/fetchData";
import useSaveData from "../../../../hooks/entities/saveData";
import { userId } from "../../../../hooks/getUserId";
import { tipo } from "../../../../hooks/getUserType";
import "../saveDataModalStyle.css"
import { useEffect, useState } from "react";

export default function AddExamModal({setIsExamModalOpen}) {

    const [idMedico, setMedico] = useState("");
    const [idPaciente, setPaciente] = useState("");
    const [medicosDisponiveis, setMedicoDisponiveis] = useState([]);
    const [pacienteDisponiveis, setPacienteDisponiveis] = useState([]);
    const [dataNaoFormatada, setData] = useState("");
    const [nomeExame, setNomeExame] = useState("");
    const {fetchData, loading} = useFetchData();
    const saveData = useSaveData();

    useEffect(() => {
        async function fetchDataFromHook(){
            const requestForDoctorResponse = await fetchData("medicos", tipo(), userId())
            setMedicoDisponiveis(requestForDoctorResponse);
    
            const requestForPacientResponse = await fetchData("pacientes", tipo(), userId())
            setPacienteDisponiveis(requestForPacientResponse);
        }

        fetchDataFromHook();
        console.log("foi");
    },[])

    function handleClose() {
        setIsExamModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault()

        const dataHorario =  dataNaoFormatada.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        let novoExame = {idMedico, idPaciente, dataHorario, nomeExame};

        try {
            console.log("adicionando ", novoExame);
            setIsExamModalOpen(false);
            await saveData("exames", novoExame);
        } catch (err) {
            console.log( err); // Captura e exibe erros
        }
    }

    return (
        <div className="modal__background" onClick={() => {handleClose()}}>
            <div className="modal__container" onClick={e => e.stopPropagation()}>
            <div className="modal-title">
                    <h2>Exame</h2>
                </div>
                <form onSubmit={(e) => handleAddition(e)}>
                    <label>nome do exame:
                        <input type="text" name="nomeExame" onChange={(e) => setNomeExame(e.target.value)} required />
                    </label>
                    <label> paciente:
                        <select name="paciente" onChange={(e) => setPaciente(e.target.value)} required>
                            <option value="">Selecione...</option>
                            {pacienteDisponiveis.map((paciente) => (
                                <option value={paciente.id}>{paciente.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label> médico:
                        <select name="medico" onChange={(e) => setMedico(e.target.value)} required>
                            <option value="">Selecione...</option>
                            {medicosDisponiveis.map((medico) => (
                                <option value={medico.id}>{medico.nome}</option>
                            ))}
                        </select>
                    </label>
                    <label> data:
                        <input type="date" name="dataHorario" onChange={(e) => setData(e.target.value)} required />
                    </label>
                    <div className="button-area">
                        <button onClick={handleClose}>cancel</button>
                        <button type="submit">adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}