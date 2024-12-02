# Diretório onde os componentes serão criados
$targetDir = "C:\Users\Dudud\OneDrive\Documentos\Projects\desafogachefe-frontend\src\components\modais\saveDataModal"

# Criar o diretório, caso não exista
if (!(Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir
}

# Entidades simples
$simpleEntities = @{
    addresses         = @("id", "street", "city", "state", "postalCode")
    companies         = @("id", "name", "CNPJ", "email", "address")
    jobs             = @("id", "title", "bruteCostPerHour")
    users            = @("id", "login", "password", "isAdmin")
    workSchedules    = @("id", "beginOfShift", "endOfShift", "workingDays")
}

# Entidades com relacionamento
$relatedEntities = @{
    colaborators         = @("name", "CPF", "job", "workSchedule", "isAvailableForLoan")
    colaboratorRequests  = @("userRecord", "colaboratorRecord")
    financialReports     = @("id", "loan", "hoursWorked", "totalCost", "basePay", "extraPay", "transportationCost")
    loans                = @("loanedColaborator", "loaningCompany", "loanerCompany", "loanJob", "startTime", "endTime", "agreedPayRate")
    representants        = @("id", "name", "company")
    representantRequests = @("userRecord", "representantRecord")
}

# Template para entidades simples
$simpleTemplate = @'
import "./saveDataModalStyle.css";
import { useState } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";

export default function Add{{ENTITY_NAME}}Modal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {DEFAULT_VALUES} );
    const saveData = useSaveData();

    function handleClose() {
        setIsModalOpen(false);
    }

    async function handleAddition(e) {
        e.preventDefault();
        try {
            console.log("Adicionando ", formData);
            setIsModalOpen(false);
            await saveData("{{ENTITY_URL}}", formData);
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
                <h2>Adicionar {{ENTITY_NAME}}</h2>
                <form onSubmit={handleAddition}>
                    {{FORM_FIELDS}}
                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
'@

# Template para entidades com relacionamento
$relatedTemplate = @'
import "./saveDataModalStyle.css";
import { useState, useEffect } from "react";
import useSaveData from "../../../hooks/saveData/saveData.js";
import useFetchData from "../../../hooks/entities/fetchData";

export default function Add{{ENTITY_NAME}}Modal({ setIsModalOpen }) {
    const [formData, setFormData] = useState( {DEFAULT_VALUES} );
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
            await saveData("{{ENTITY_URL}}", formData);
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
                <h2>Adicionar {{ENTITY_NAME}}</h2>
                <form onSubmit={handleAddition}>
                    {{FORM_FIELDS}}
                    <div className="button-area">
                        <button onClick={handleClose}>Cancelar</button>
                        <button type="submit">Adicionar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
'@

# Função para criar os arquivos
function Generate-Component {
    param (
        [string]$EntityName,
        [string]$EntityKey,
        [string]$Template,
        [array]$Attributes
    )

    # Gerar campos do formulário
    $formFields = ""
    $defaultValues = ""
    foreach ($attribute in $Attributes) {
        $formFields += "<label>${attribute}: <input type='text' name='${attribute}' onChange={handleChange} required /></label>`n"
        $defaultValues += "${attribute}: '', "
    }

    # Substituir placeholders no template
    $content = $Template -replace "{{ENTITY_NAME}}", $EntityName `
                          -replace "{{ENTITY_URL}}", $EntityKey `
                          -replace "{{FORM_FIELDS}}", $formFields `
                          -replace "{{DEFAULT_VALUES}}", "{ ${($defaultValues.TrimEnd(', '))} }"

    # Salvar no arquivo
    $fileName = "Add${EntityName}Modal.js"
    $filePath = Join-Path -Path $targetDir -ChildPath $fileName
    Set-Content -Path $filePath -Value $content -Force

    Write-Host "Componente criado: $fileName"
}

# Gerar componentes para entidades simples
foreach ($key in $simpleEntities.Keys) {
    Generate-Component -EntityName $key -EntityKey $key -Template $simpleTemplate -Attributes $simpleEntities[$key]
}

# Gerar componentes para entidades com relacionamento
foreach ($key in $relatedEntities.Keys) {
    Generate-Component -EntityName $key -EntityKey $key -Template $relatedTemplate -Attributes $relatedEntities[$key]
}
