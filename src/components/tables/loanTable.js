import { useEffect, useState } from "react";
import "./table.css";
import DeleteButton from '../buttons/deleteButton.js'


export default function LoanTable({ data, setItem }) {
    const [tableItensList, setTableItensList] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setTableItensList(data);
        }
    }, [data]);

    if (Array.isArray(data) && data.length > 0) {
        return (
            <table className="table_style">
                <thead>
                    <tr>
                        <th></th>
                        <th>Loaned Collaborator</th>
                        <th>Loaning Company</th>
                        <th>Loaner Company</th>
                        <th>Job</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Pay Rate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} onClick={() => setItem(item)}>
                            <td><DeleteButton entityType={"loans"} id={item.id} /></td>
                            <td>{item?.colaborator?.colaboratorName}</td>
                            <td>{item?.loaningCompany?.name || "N/A"}</td>
                            <td>{item?.loanerCompany?.name}</td>
                            <td>{item?.job?.title}</td>
                            <td>{new Date(item?.startTime).toLocaleString()}</td>
                            <td>{new Date(item?.endTime).toLocaleString()}</td>
                            <td>{item?.agreedPayRate?.toFixed(2)}</td>
                            <td>{item?.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p>No loans available.</p>;
}
