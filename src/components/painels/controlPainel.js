import { useState } from "react";
import AddAddressesModal from "../modais/saveDataModal/addAdressesModal";
import AddCollaboratorsModal from "../modais/saveDataModal/AddColaboratorsModal";
import AddCompaniesModal from "../modais/saveDataModal/AddCompaniesModal";
import AddJobsModal from "../modais/saveDataModal/AddJobsModal";
import AddLoansModal from "../modais/saveDataModal/AddLoansModal";
import AddRepresentantsModal from "../modais/saveDataModal/AddRepresentantsModal";
import AddUsersModal from "../modais/saveDataModal/AddUsersModal";
import AddFinancialReportsModal from "../modais/saveDataModal/AddFinancialReportsModal";
import AddWorkSchedulesModal from "../modais/saveDataModal/AddWorkSchedulesModal";
import "./painel.css";

export default function ControlPainel({ option }) {
    const [openModal, setOpenModal] = useState(false);

    function openAdditionModal() {
        console.log(`Adicionando ${option}`);
        setOpenModal(true);
    }

    return (
        <>
            <button className="add_button" onClick={openAdditionModal}>
                Adicionar {option}
            </button>
            {openModal && (
                <>
                    {option === "address" && (
                        <AddAddressesModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "colaborators" && (
                        <AddCollaboratorsModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "companies" && (
                        <AddCompaniesModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "jobs" && (
                        <AddJobsModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "loans" && (
                        <AddLoansModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "representants" && (
                        <AddRepresentantsModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "users" && (
                        <AddUsersModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "financial-reports" && (
                        <AddFinancialReportsModal setIsModalOpen={setOpenModal} />
                    )}
                    {option === "work-schedules" && (
                        <AddWorkSchedulesModal setIsModalOpen={setOpenModal} />
                    )}
                </>
            )}
        </>
    );
}
