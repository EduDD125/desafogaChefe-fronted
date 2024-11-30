import { useState } from "react";
import AddAppointmentModal from "../modais/saveDataModal/addAppointment/addAppointmentModal";
import AddExamModal from "../modais/saveDataModal/addExam/addExamModal";
import "./painel.css"

export default function ControlPainel({option}) {

    const [openModal, setOpenModal] = useState(false);

    function openAdditionModal() {
        console.log(`adcionado ${option}`);
        setOpenModal(true);
    }

    return(
        <>
            <button className="add_button" onClick={openAdditionModal}>adicionar {option}</button>
            {openModal && 
            <>
                {option === "exames" ? 
                    <AddExamModal setIsExamModalOpen={setOpenModal}/> 
                    : 
                    <AddAppointmentModal setIsAppoitmentModalOpen={setOpenModal}/>
                }
            </>
            }
        </>
    );
}