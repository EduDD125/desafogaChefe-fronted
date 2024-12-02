import React, { useState, useEffect } from "react";
import "./userNavbarStyle.css";
import NavButton from "../subcomponents/navButton";
import { getPacientData } from "../../../hooks/entities/getPacientData";
import { getDoctorData } from "../../../hooks/entities/getDoctorData";

export default function UserNavbar({ tipo, setOption }) {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    const [userName, setUserName] = useState("");
    const [userAvatarUrl, setUserAvatarUrl] = useState("");

    useEffect(() => {
        async function fetchUserName() {
            if (role === "medico") {
                const { name, userAvatarUrl } = await getDoctorData(id);
                setUserName(name);
                setUserAvatarUrl(userAvatarUrl);
            } else if (role === "paciente") {
                const { name, userAvatarUrl } = await getPacientData(id);
                setUserName(name);
                setUserAvatarUrl(userAvatarUrl);
            }
        }
        fetchUserName();
    }, [id, role]);

    function seeUserData() {
        alert("Mostrar dados do usuário logado!")
    }

    function seeColaborators() {
        setOption("colaborators");
    }
    
    function seeAddresses() {
        setOption("address");
    }
    
    function seeCompanies() {
        setOption("companies");
    }
  
    function seeFinancialReports() {
        setOption("financial-reports");
    }  
    function seeWorkSchedules() {
        setOption("work-schedules");
    }  
    function seeUsers() {
        setOption("users");
    }  
    function seeRepresentants() {
        setOption("representants");
    }  
    function seeLoans() {
        setOption("loans");
    }  
    function seeJobs() {
        setOption("jobs");
    }











    if (tipo === "paciente" || tipo === "medico")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Addresses" tipo="addresses" action={seeAddresses} />
                    
                                {/* 
                    <NavButton text="Colaborators" tipo="colaborators" action={seeColaborators} />
                    <NavButton text="Companies" tipo="companies" action={seeCompanies} />
                    <NavButton text="Jobs" tipo="jobs" action={seeJobs} />
                    <NavButton text="Loans" tipo="loans" action={seeLoans} />
                    <NavButton text="Representants" tipo="representants" action={seeRepresentants} />
                    <NavButton text="Users" tipo="users" action={seeUsers} />
                    <NavButton text="Financial Reports" tipo="financial-reports" action={seeFinancialReports} />
                    <NavButton text="Work Schedules" tipo="work-schedules" action={seeWorkSchedules} />
                    */}
                </div>
                <NavButton text={userName} tipo="user_section" action={seeUserData} userAvatarUrl={userAvatarUrl}/>
            </nav>
        );
    else if (tipo === "admin")
        return (
            <nav className="nav">
                <div className="nav__buttons-container">
                    <NavButton text="Addresses" tipo="addresses" action={seeAddresses} />
                    <NavButton text="Colaborators" tipo="colaborators" action={seeColaborators} />
                    <NavButton text="Companies" tipo="companies" action={seeCompanies} />
                    <NavButton text="Jobs" tipo="jobs" action={seeJobs} />
                    <NavButton text="Loans" tipo="loans" action={seeLoans} />
                    <NavButton text="Users" tipo="users" action={seeUsers} />
                    
                    <NavButton text="Financial Reports" tipo="financial-reports" action={seeFinancialReports} />
                    <NavButton text="Work Schedules" tipo="work-schedules" action={seeWorkSchedules} />
                </div>
            </nav>
        );
    return "Tipo de usuário indefinido";
}