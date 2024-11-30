import { useEffect, useState } from "react";
import useEditData from "../../hooks/entities/editData";
import {tipo} from "../../hooks/getUserType"
import EditUserAvatar from "../userAvatar/editUserAvatar";

function formatDateToInput(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}

export default function UserData({data}) {


    const [nome, setNome] = useState(data.nome);
    const [email, setEmail] = useState(data.email);
    const [sexo, setSexo] = useState(data.sexo);
    const [dataNascimento, setDataNascimento] = useState(data.dataNascimento);
    const [CPF, setCpf] = useState(data.CPF);
    const [CRI, setCRI] = useState(data.CRI);
    const [estadoCivil, setEstadoCivil] = useState(data.estadoCivil);
    const [especialidade, setEspecialidade] = useState(data.especialidade);
    const [userImagemUrl, setUserImagemUrl] = useState(data?.imagem?.url);


    const [cep, setCep] = useState(data?.endereco?.cep);
    const [bairro, setBairro] = useState(data?.endereco?.bairro);
    const [logradouro, setLogradouro] = useState(data?.endereco?.logradouro);
    const [estado, setEstado] = useState(data?.endereco?.estado);

    const {editData, loading, error, setError} = useEditData();
    
    useEffect( () => {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(formatDateToInput(data.dataNascimento))
        setCpf(data.CPF);
        setCRI(data.CRI);
        setEstadoCivil(data.estadoCivil);
        setEspecialidade(data.especialidade);
        setUserImagemUrl(data?.imagem?.url);
        setCep(data?.endereco?.cep)
        setBairro(data?.endereco?.bairro)
        setLogradouro(data?.endereco?.logradouro)
        setEstado(data?.endereco?.estado)
    },[data] )
    

    function handleRestore() {
        setNome(data.nome);
        setEmail(data.email);
        setSexo(data.sexo);
        setDataNascimento(new Date(data.dataNascimento))
        setCpf(data.CPF);
        setCRI(data.CRI);
        setEstadoCivil(data.estadoCivil);
        setEspecialidade(data.especialidade);
        setUserImagemUrl(data?.imagem?.url);
        setCep(data?.endereco?.cep)
        setBairro(data?.endereco?.bairro)
        setLogradouro(data?.endereco?.logradouro)
        setEstado(data?.endereco?.estado)
    }

    async function handleEdition(event) {
        event.preventDefault();

        setError("");

        console.log(data.dataNascimento)
        console.log(dataNascimento)

        let newUserData = {};
        if (tipo() == "paciente") newUserData = {nome, email, sexo, dataNascimento, CPF, estadoCivil, endereco:{cep,bairro,logradouro,estado}};
        if (tipo() == "medico") newUserData = {nome, email, sexo, dataNascimento, CRI, especialidade, endereco:{cep,bairro,logradouro,estado}};

        const option = `dadosPessoais`;

        const response = await editData(option, tipo(), data.id, newUserData);
        console.log(response);
    }

    console.log("data: ", data);

    if (data)
        return(
            <div className="item__container">
                <div className="item__title">
                    <h3>Dados Pessoais</h3>
                </div>
                <form onSubmit={(e) => handleEdition(e)}>
                    <label>Nome:
                        <input type="text" name="nome" required value={nome} onChange={(e) => setNome(e.target.value)} />
                    </label>

                    <label>Email:
                        <input type="email" name="email" required value={email} readOnly />
                    </label>

                    <label>Sexo:
                        <select name="sexo" id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                            <option value="">Selecione...</option>
                            <option value="feminino">feminino</option>
                            <option value="masculino">masculino</option>
                        </select>
                    </label>

                    <label>Data de Nascimento:
                        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
                    </label>
                    {tipo() == "medico" && 
                        <>
                            <label>CRI:
                                <input type="text" name="CRI" value={CRI} readOnly required />
                            </label>

                            <label>Especialidade:
                                <input type="text" name="especialidade" value={especialidade} onChange={(e) => setEstadoCivil(e.target.value)} required />
                            </label>
                        </>
                    }
                    {tipo() == "paciente" && 
                        <>
                            <label>CPF:
                                <input type="text" name="cpf" value={CPF} readOnly required />
                            </label>

                            <label>Estado Civil:
                                <input type="text" name="estado-civil" value={estadoCivil} onChange={(e) => setEstadoCivil(e.target.value)} required />
                            </label>
                        </>
                    }   
                    <label>CEP:
                        <input type="text" name="cep" value={cep} onChange={(e) => setCep(e.target.value)} required />
                    </label>

                    <label>Bairro:
                        <input type="text" name="cep" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                    </label>

                    <label>Logradouro:
                        <input type="text" name="cep" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} required />
                    </label>

                    <label>Estado:
                        <input type="text" name="cep" value={estado} onChange={(e) => setLogradouro(e.target.value)} required />
                    </label>
                    
                    <EditUserAvatar userAvatarUrl={userImagemUrl}/>

                    {error && <p className="error-message">Não foi possível editar os dados</p>}
                            
                    <div className="button-area">
                        <button type="button" onClick={handleRestore}>restaurar</button>
                        {!loading ?
                                <button type="submit" >salvar edição</button>
                            :
                                <button type="submit" readOnly>Carregando...</button>
                            }
                    </div>
                </form>
            </div>
        );
    return (
        <p>carregando...</p>
    );
}