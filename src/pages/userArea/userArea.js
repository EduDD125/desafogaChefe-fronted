import { useEffect, useState } from "react";
import UserNavbar from "../../components/navbars/userNavbar/userNavbar";
import ControlPainel from "../../components/painels/controlPainel";

// Novos componentes de tabela
import AddressTable from "../../components/tables/addressesTable";
import CollaboratorTable from "../../components/tables/collaboratorTable";
import CompanyTable from "../../components/tables/companyTable";
import FinancialReportTable from "../../components/tables/financialReportTable";
import JobTable from "../../components/tables/jobTable";
import LoanTable from "../../components/tables/loanTable";
import RepresentantTable from "../../components/tables/representantTable";
import UserTable from "../../components/tables/userTable";
import WorkScheduleTable from "../../components/tables/workScheduleTable";

// Novos componentes de painel
import Address from "../../components/painels/address";
import Collaborator from "../../components/painels/collaborator";
import Company from "../../components/painels/company";
import FinancialReport from "../../components/painels/financialReport";
import Job from "../../components/painels/job";
import Loan from "../../components/painels/loan";
import Representant from "../../components/painels/representant";
import User from "../../components/painels/user";
import WorkSchedule from "../../components/painels/workSchedule";

import { refreshTableContext } from "./../../contexts/appContext";
import useCrudOperations from "./../../hooks/useCrudOperations/useCrudOperations.js";

export default function UserArea() {
    const { performCrudOperation, loading, error } = useCrudOperations();
    const [option, setOption] = useState("");
    const [painel, setPainel] = useState("");
    const [item, setItem] = useState("");
    const [data, setData] = useState([]);
    const tipo = localStorage.getItem("role");
    const userId = localStorage.getItem("id");

    const [refreshTable, setRefreshTable] = useState(false);

    

    // Atualizar dados e definir o painel principal ao trocar de opção
    useEffect(() => {
        setData([]);
        async function fetchDataFromHook() {
            if (option) {
                try {
                    const response = await performCrudOperation(option, "get");
                    if (response.status == 200) 
                        setData(response)
                    console.log("data fetch:", response);
                } catch (error) {
                    console.log("error:", error)
                }
            }
        }

        fetchDataFromHook();

        setItem("");
        switch (option) {
            case "addresses":
                setPainel(<Address data={item} />);
                break;
            case "colaborators":
                setPainel(<Collaborator data={item} />);
                break;
            case "companies":
                setPainel(<Company data={item} />);
                break;
            case "financial-reports":
                setPainel(<FinancialReport data={item} />);
                break;
            case "jobs":
                setPainel(<Job data={item} />);
                break;
            case "loans":
                setPainel(<Loan data={item} />);
                break;
            case "representants":
                setPainel(<Representant data={item} />);
                break;
            case "users":
                setPainel(<User data={item} />);
                break;
            case "work-schedules":
                setPainel(<WorkSchedule data={item} />);
                break;
            default:
                setPainel("");
                break;
        }
    }, [option]);

    // Atualizar painel ao mudar o item selecionado
    useEffect(() => {
        switch (option) {
            case "address":
                setPainel(<Address data={item} />);
                break;
            case "colaborators":
                setPainel(<Collaborator data={item} />);
                break;
            case "companies":
                setPainel(<Company data={item} />);
                break;
            case "financial-reports":
                setPainel(<FinancialReport data={item} />);
                break;
            case "jobs":
                setPainel(<Job data={item} />);
                break;
            case "loans":
                setPainel(<Loan data={item} />);
                break;
            case "representants":
                setPainel(<Representant data={item} />);
                break;
            case "users":
                setPainel(<User data={item} />);
                break;
            case "work-schedules":
                setPainel(<WorkSchedule data={item} />);
                break;
            default:
                setPainel("");
                break;
        }
    }, [item]);

    // Atualizar dados ao refresh da tabela
    useEffect(() => {
        async function fetchDataFromHook() {
            if (option) {
                try {
                    const response = await performCrudOperation(option, "get");
                    console.log("data fetch:", response);
                    setData(response)
                } catch (error) {
                    console.log("error:", error)
                }
            }
        }

        fetchDataFromHook();
        setItem("");
    }, [option, refreshTable]);

    return (
        <div>
            <UserNavbar tipo={tipo} setOption={setOption} option={option} />
            <main>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <refreshTableContext.Provider value={{ refreshTable, setRefreshTable }}>
                        {!option ? (
                            <p>Escolha uma das opções na barra de navegação.</p>
                        ) : (
                            <>
                                <ControlPainel option={option} />

                                {/* Tabelas associadas a cada opção */}
                                {option === "address" && (
                                    <AddressTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "colaborators" && (
                                    <CollaboratorTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "companies" && (
                                    <CompanyTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "financial-reports" && (
                                    <FinancialReportTable
                                        data={data}
                                        option={option}
                                        setItem={setItem}
                                    />
                                )}
                                {option === "jobs" && (
                                    <JobTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "loans" && (
                                    <LoanTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "representants" && (
                                    <RepresentantTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "users" && (
                                    <UserTable data={data} option={option} setItem={setItem} />
                                )}
                                {option === "work-schedules" && (
                                    <WorkScheduleTable data={data} option={option} setItem={setItem} />
                                )}

                                {/* Painel */}
                                {Array.isArray(data) && data.length > 0 && painel}
                            </>
                        )}
                    </refreshTableContext.Provider>
                )}
            </main>
        </div>
    );
}
